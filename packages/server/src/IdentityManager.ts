import express, { Application, NextFunction, Request, Response } from 'express'
import { Platform } from './Interface'

export class IdentityManager {
    private static instance: IdentityManager
    licenseValid = true
    currentInstancePlatform: Platform = Platform.OPEN_SOURCE

    public static async getInstance(): Promise<IdentityManager> {
        if (!IdentityManager.instance) {
            IdentityManager.instance = new IdentityManager()
            await IdentityManager.instance.initialize()
        }
        return IdentityManager.instance
    }

    public async initialize() {
        this.licenseValid = true
        this.currentInstancePlatform = Platform.OPEN_SOURCE
    }

    public getPlatformType = () => this.currentInstancePlatform
    public getPermissions = () => ({})
    public isEE = () => false
    public isCloud = () => false
    public isOpenSource = () => true
    public isLicenseValid = () => true

    public initializeSSO = async (_app: express.Application) => {}
    initializeEmptySSO(_app: Application) {}
    initializeSsoProvider(_app: Application, _providerName: string, _providerConfig: any) {}

    async getRefreshToken(_providerName: any, ssoRefreshToken: string) {
        return ssoRefreshToken
    }

    public async getProductIdFromSubscription(_subscriptionId: string) {
        return ''
    }

    public async getFeaturesByPlan(_subscriptionId: string, _withoutCache: boolean = false) {
        return {}
    }

    public static checkFeatureByPlan(_feature: string) {
        return (_req: Request, _res: Response, next: NextFunction) => next()
    }
}
