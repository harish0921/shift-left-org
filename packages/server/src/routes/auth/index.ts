import express, { Request, Response } from 'express'

const router = express.Router()

const API_KEY_FALLBACK_PERMISSIONS = ['chatflows:view', 'assistants:view', 'tools:view']

const toGroupedPermissions = (permissions: string[]) => {
    const grouped: Record<string, Array<{ key: string; value: string; isOpenSource: boolean; isCloud: boolean }>> = {}

    permissions.forEach((permission) => {
        if (typeof permission !== 'string' || !permission.includes(':')) return
        const [category] = permission.split(':')
        if (!grouped[category]) grouped[category] = []
        grouped[category].push({
            key: permission,
            value: permission,
            isOpenSource: true,
            isCloud: true
        })
    })

    return grouped
}

router.get('/permissions/:type', (req: Request, res: Response) => {
    const type = (req.params.type || '').toUpperCase()
    const userPermissions = Array.isArray(req.user?.permissions) ? req.user.permissions : []

    let permissions = userPermissions.filter((permission: string) => typeof permission === 'string')
    if (type === 'API_KEY') {
        permissions = permissions.filter((permission: string) => !permission.startsWith('workspace:') && !permission.startsWith('admin:'))
    }

    // Keep UI usable in OSS/dev setups where permission payload may be absent.
    if (!permissions.length && type === 'API_KEY') {
        permissions = API_KEY_FALLBACK_PERMISSIONS
    }

    return res.json(toGroupedPermissions(permissions))
})

export default router
