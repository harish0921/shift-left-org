import { ExpressAdapter } from '@bull-board/express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import 'global-agent/bootstrap'
import http from 'http'
import path from 'path'
import { DataSource } from 'typeorm'
import { AbortControllerPool } from './AbortControllerPool'
import { CachePool } from './CachePool'
import { ChatFlow } from './database/entities/ChatFlow'
import { getDataSource } from './DataSource'
import { IdentityManager } from './IdentityManager'
import { MODE } from './Interface'
import { IMetricsProvider } from './Interface.Metrics'
import { OpenTelemetry } from './metrics/OpenTelemetry'
import { Prometheus } from './metrics/Prometheus'
import errorHandlerMiddleware from './middlewares/errors'
import { NodesPool } from './NodesPool'
import { QueueManager } from './queue/QueueManager'
import { RedisEventSubscriber } from './queue/RedisEventSubscriber'
import flowiseApiV1Router from './routes'
import { UsageCacheManager } from './UsageCacheManager'
import { getEncryptionKey, getNodeModulesPackagePath } from './utils'
import logger, { expressRequestLogger } from './utils/logger'
import { RateLimiterManager } from './utils/rateLimit'
import { SSEStreamer } from './utils/SSEStreamer'
import { Telemetry } from './utils/telemetry'
import { getAllowedIframeOrigins, sanitizeMiddleware } from './utils/XSS'

const initializeJwtCookieMiddleware = async (_app: express.Application, _identityManager: IdentityManager) => {}
const initAuthSecrets = async () => {}
const verifyToken = (_req: Request, _res: Response, next: any) => next()
const verifyTokenForBullMQDashboard = (_req: Request, _res: Response, next: any) => next()

declare global {
    namespace Express {
        interface User extends LoggedInUser {}
        interface Request {
            user?: LoggedInUser
        }
        namespace Multer {
            interface File {
                bucket: string
                key: string
                acl: string
                contentType: string
                contentDisposition: null
                storageClass: string
                serverSideEncryption: null
                metadata: any
                location: string
                etag: string
            }
        }
    }
}

export class App {
    app: express.Application
    nodesPool: NodesPool
    abortControllerPool: AbortControllerPool
    cachePool: CachePool
    telemetry: Telemetry
    rateLimiterManager: RateLimiterManager
    AppDataSource: DataSource = getDataSource()
    sseStreamer: SSEStreamer
    identityManager: IdentityManager
    metricsProvider: IMetricsProvider
    queueManager: QueueManager
    redisSubscriber: RedisEventSubscriber
    usageCacheManager: UsageCacheManager
    sessionStore: any

    constructor() {
        this.app = express()
    }

    async initDatabase() {
        // Initialize database
        try {
            await this.AppDataSource.initialize()
            logger.info('📦 [server]: Data Source initialized successfully')

            // Run Migrations Scripts
            await this.AppDataSource.runMigrations({ transaction: 'each' })
            logger.info('🔄 [server]: Database migrations completed successfully')

            // Initialize Identity Manager
            this.identityManager = await IdentityManager.getInstance()
            logger.info('🔐 [server]: Identity Manager initialized successfully')

            // Initialize nodes pool
            this.nodesPool = new NodesPool()
            await this.nodesPool.initialize()
            logger.info('🔧 [server]: Nodes pool initialized successfully')

            // Initialize abort controllers pool
            this.abortControllerPool = new AbortControllerPool()
            logger.info('⏹️ [server]: Abort controllers pool initialized successfully')

            // Initialize encryption key
            await getEncryptionKey()
            logger.info('🔑 [server]: Encryption key initialized successfully')

            // Initialize auth secrets (env → AWS Secrets Manager → filesystem)
            await initAuthSecrets()
            logger.info('🔐 [server]: Auth initialized successfully')

            // Initialize Rate Limit
            this.rateLimiterManager = RateLimiterManager.getInstance()
            await this.rateLimiterManager.initializeRateLimiters(await getDataSource().getRepository(ChatFlow).find())
            logger.info('🚦 [server]: Rate limiters initialized successfully')

            // Initialize cache pool
            this.cachePool = new CachePool()
            logger.info('💾 [server]: Cache pool initialized successfully')

            // Initialize usage cache manager
            this.usageCacheManager = await UsageCacheManager.getInstance()
            logger.info('📊 [server]: Usage cache manager initialized successfully')

            // Initialize telemetry
            this.telemetry = new Telemetry()
            logger.info('📈 [server]: Telemetry initialized successfully')

            // Initialize SSE Streamer
            this.sseStreamer = new SSEStreamer()
            logger.info('🌊 [server]: SSE Streamer initialized successfully')

            // Init Queues
            if (process.env.MODE === MODE.QUEUE) {
                this.queueManager = QueueManager.getInstance()
                const serverAdapter = new ExpressAdapter()
                serverAdapter.setBasePath('/admin/queues')
                this.queueManager.setupAllQueues({
                    componentNodes: this.nodesPool.componentNodes,
                    telemetry: this.telemetry,
                    cachePool: this.cachePool,
                    appDataSource: this.AppDataSource,
                    abortControllerPool: this.abortControllerPool,
                    usageCacheManager: this.usageCacheManager,
                    serverAdapter
                })
                logger.info('✅ [Queue]: All queues setup successfully')

                this.redisSubscriber = new RedisEventSubscriber(this.sseStreamer)
                await this.redisSubscriber.connect()
                logger.info('🔗 [server]: Redis event subscriber connected successfully')
            }

            logger.info('🎉 [server]: All initialization steps completed successfully!')
        } catch (error) {
            logger.error('❌ [server]: Error during Data Source initialization:', error)
            // Keep server booting in OSS mode even if optional migrations fail.
            if (!this.identityManager) {
                this.identityManager = new IdentityManager()
                await this.identityManager.initialize()
            }
        }
    }

    async config() {
        if (!this.identityManager) {
            this.identityManager = new IdentityManager()
            await this.identityManager.initialize()
        }

        // Limit is needed to allow sending/receiving base64 encoded string
        const flowise_file_size_limit = process.env.FLOWISE_FILE_SIZE_LIMIT || '50mb'
        this.app.use(express.json({ limit: flowise_file_size_limit }))
        this.app.use(express.urlencoded({ limit: flowise_file_size_limit, extended: true }))

        // Enhanced trust proxy settings for load balancer
        let trustProxy: string | boolean | number | undefined = process.env.TRUST_PROXY
        if (typeof trustProxy === 'undefined' || trustProxy.trim() === '' || trustProxy === 'true') {
            // Default to trust all proxies
            trustProxy = true
        } else if (trustProxy === 'false') {
            // Disable trust proxy
            trustProxy = false
        } else if (!isNaN(Number(trustProxy))) {
            // Number: Trust specific number of proxies
            trustProxy = Number(trustProxy)
        }

        this.app.set('trust proxy', trustProxy)

        // Allow access from specified domains
        this.app.use(
            cors({
                origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id', 'x-request-from', 'x-requested-with']
            })
        )

        // Parse cookies
        this.app.use(cookieParser())

        // Allow embedding from specified domains.
        this.app.use((req, res, next) => {
            const allowedOrigins = getAllowedIframeOrigins()
            if (allowedOrigins == '*') {
                next()
            } else {
                const csp = `frame-ancestors ${allowedOrigins}`
                res.setHeader('Content-Security-Policy', csp)
                next()
            }
        })

        // Switch off the default 'X-Powered-By: Express' header
        this.app.disable('x-powered-by')

        // Add the expressRequestLogger middleware to log all requests
        this.app.use(expressRequestLogger)

        // Add the sanitizeMiddleware to guard against XSS
        this.app.use(sanitizeMiddleware)

<<<<<<< HEAD
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Credentials', 'true') // Allow credentials (cookies, etc.)
            if (next) next()
        })

=======
        const denylistURLs = process.env.DENYLIST_URLS ? process.env.DENYLIST_URLS.split(',') : []
        const whitelistURLs = WHITELIST_URLS.filter((url) => !denylistURLs.includes(url))
>>>>>>> f118d77e1943a5e777bd7d57d4ae3d557a623b90
        const URL_CASE_INSENSITIVE_REGEX: RegExp = /\/api\/v1\//i
        const URL_CASE_SENSITIVE_REGEX: RegExp = /\/api\/v1\//

        await initializeJwtCookieMiddleware(this.app, this.identityManager)

        this.app.use((req, res, next) => {
            // Keep URL case check, but skip enterprise/API-key auth guards.
            if (URL_CASE_INSENSITIVE_REGEX.test(req.path) && !URL_CASE_SENSITIVE_REGEX.test(req.path)) {
                return res.status(401).json({ error: 'Unauthorized Access' })
            }
            if (req.headers['x-request-from'] === 'internal') {
                return verifyToken(req, res, next)
            }
            next()
        })

        // this is for SSO and must be after the JWT cookie middleware
        await this.identityManager.initializeSSO(this.app)

        if (process.env.ENABLE_METRICS === 'true') {
            switch (process.env.METRICS_PROVIDER) {
                // default to prometheus
                case 'prometheus':
                case undefined:
                    this.metricsProvider = new Prometheus(this.app)
                    break
                case 'open_telemetry':
                    this.metricsProvider = new OpenTelemetry(this.app)
                    break
                // add more cases for other metrics providers here
            }
            if (this.metricsProvider) {
                await this.metricsProvider.initializeCounters()
                logger.info(`📊 [server]: Metrics Provider [${this.metricsProvider.getName()}] has been initialized!`)
            } else {
                logger.error(
                    "❌ [server]: Metrics collection is enabled, but failed to initialize provider (valid values are 'prometheus' or 'open_telemetry'."
                )
            }
        }

        this.app.use('/api/v1', flowiseApiV1Router)
        this.app.use('/api', (_req, res) => {
            res.status(404).json({ error: 'API route not found' })
        })

        // ----------------------------------------
        // Configure number of proxies in Host Environment
        // ----------------------------------------
        this.app.get('/api/v1/ip', (request, response) => {
            response.send({
                ip: request.ip,
                msg: 'Check returned IP address in the response. If it matches your current IP address ( which you can get by going to http://ip.nfriedly.com/ or https://api.ipify.org/ ), then the number of proxies is correct and the rate limiter should now work correctly. If not, increase the number of proxies by 1 and restart Cloud-Hosted Flowise until the IP address matches your own. Visit https://docs.flowiseai.com/configuration/rate-limit#cloud-hosted-rate-limit-setup-guide for more information.'
            })
        })

        if (process.env.MODE === MODE.QUEUE && process.env.ENABLE_BULLMQ_DASHBOARD === 'true' && !this.identityManager.isCloud()) {
            // Initialize admin queues rate limiter
            const id = 'bullmq_admin_dashboard'
            await this.rateLimiterManager.addRateLimiter(
                id,
                60,
                100,
                process.env.ADMIN_RATE_LIMIT_MESSAGE || 'Too many requests to admin dashboard, please try again later.'
            )

            const rateLimiter = this.rateLimiterManager.getRateLimiterById(id)
            this.app.use('/admin/queues', rateLimiter, verifyTokenForBullMQDashboard, this.queueManager.getBullBoardRouter())
        }

        // ----------------------------------------
        // Serve UI static
        // ----------------------------------------

        const packagePath = getNodeModulesPackagePath('shiftleft-ui')
        const uiBuildPath = path.join(packagePath, 'build')
        const uiHtmlPath = path.join(packagePath, 'build', 'index.html')

        this.app.use('/', express.static(uiBuildPath))

        // All other requests not handled will return React app
        this.app.use((req: Request, res: Response) => {
            res.sendFile(uiHtmlPath)
        })

        // Error handling
        this.app.use(errorHandlerMiddleware)
    }

    async stopApp() {
        try {
            const removePromises: any[] = []
            removePromises.push(this.telemetry.flush())
            if (this.queueManager) {
                removePromises.push(this.redisSubscriber.disconnect())
            }
            await Promise.all(removePromises)
        } catch (e) {
            logger.error(`❌[server]: Flowise Server shut down error: ${e}`)
        }
    }
}

let serverApp: App | undefined

export async function start(): Promise<void> {
    serverApp = new App()

    const host = process.env.HOST
    const port = parseInt(process.env.PORT || '', 10) || 3000
    const server = http.createServer(serverApp.app)

    await serverApp.initDatabase()
    await serverApp.config()

    server.listen(port, host, () => {
        logger.info(`⚡️ [server]: Flowise Server is listening at ${host ? 'http://' + host : ''}:${port}`)
    })
}

export function getInstance(): App | undefined {
    return serverApp
}

const shouldStartDirectly = require.main === module || /[\\/]dist[\\/]index\.js$/i.test(process.argv[1] || '')

if (shouldStartDirectly) {
    start().catch((error) => {
        logger.error('[server]: Failed to start server', error)
        process.exit(1)
    })
}
