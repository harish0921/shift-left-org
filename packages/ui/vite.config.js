import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dotenv from 'dotenv'

export default defineConfig(async ({ mode }) => {
    let serverHost = 'localhost'
    let serverPort = 3000
    if (mode === 'development') {
        const serverEnv = dotenv.config({ processEnv: {}, path: '../server/.env' }).parsed
        serverHost = serverEnv?.['HOST'] ?? 'localhost'
        const parsedPort = parseInt(serverEnv?.['PORT'] ?? 3000)
        if (!Number.isNaN(parsedPort) && parsedPort > 0 && parsedPort < 65535) {
            serverPort = parsedPort
        }
    }
    const normalizedServerHost = !serverHost || serverHost === 'localhost' ? '127.0.0.1' : serverHost

    dotenv.config()
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@codemirror/state': resolve(__dirname, '../../node_modules/@codemirror/state'),
                '@codemirror/view': resolve(__dirname, '../../node_modules/@codemirror/view'),
                '@codemirror/language': resolve(__dirname, '../../node_modules/@codemirror/language'),
                '@codemirror/lang-javascript': resolve(__dirname, '../../node_modules/@codemirror/lang-javascript'),
                '@codemirror/lang-json': resolve(__dirname, '../../node_modules/@codemirror/lang-json'),
                '@uiw/react-codemirror': resolve(__dirname, '../../node_modules/@uiw/react-codemirror'),
                '@uiw/codemirror-theme-vscode': resolve(__dirname, '../../node_modules/@uiw/codemirror-theme-vscode'),
                '@uiw/codemirror-theme-sublime': resolve(__dirname, '../../node_modules/@uiw/codemirror-theme-sublime'),
                '@lezer/common': resolve(__dirname, '../../node_modules/@lezer/common'),
                '@lezer/highlight': resolve(__dirname, '../../node_modules/@lezer/highlight')
            }
        },
        root: resolve(__dirname),
        build: {
            outDir: './build'
        },
        server: {
            open: true,
            port: 8080,
            proxy: {
                '/api': {
                    target: `http://${normalizedServerHost}:${serverPort}`,
                    changeOrigin: true,
                    secure: false
                },
                '/socket.io': {
                    target: `http://${normalizedServerHost}:${serverPort}`,
                    ws: true,
                    changeOrigin: true
                }
            },
            host: process.env.VITE_HOST
        }
    }
})
