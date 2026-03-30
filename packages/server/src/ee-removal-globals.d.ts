declare interface LoggedInUser {
    [key: string]: any
}

declare const initAuthSecrets: () => Promise<void>
declare const initializeJwtCookieMiddleware: (app: any, identityManager: any) => Promise<void>
declare const verifyToken: (req: any, res: any, next: any) => any
declare const verifyTokenForBullMQDashboard: (req: any, res: any, next: any) => any

declare const checkPermission: (permission: string) => (req: any, res: any, next: any) => any
declare const checkAnyPermission: (permission: string) => (req: any, res: any, next: any) => any

declare const getWorkspaceSearchOptions: (workspaceId?: string) => any
declare const getWorkspaceSearchOptionsFromReq: (req: any) => any

declare class WorkspaceUserService {
    readWorkspaceUserByUserId(userId: string, queryRunner: any): Promise<any[]>
}

declare class WorkspaceService {
    getSharedItemsForWorkspace(workspaceId: string, itemType: string): Promise<any[]>
}

declare const WorkspaceUserErrorMessage: Record<string, string>

declare const Workspace: any
declare const Organization: any
declare const User: any
declare const WorkspaceUsers: any
declare const LoginActivity: any
declare const WorkspaceShared: any
declare const Role: any
declare const OrganizationUser: any
declare const WorkspaceUser: any
declare const LoginMethod: any
declare const LoginSession: any

declare const getHash: (plain: string) => string
declare const validatePasswordOrThrow: (password: unknown) => void

declare const AddAuthTables1720230151482: any
declare const AddWorkspace1720230151484: any
declare const AddWorkspace1725437498242: any
declare const AddWorkspaceShared1726654922034: any
declare const AddWorkspaceIdToCustomTemplate1726655750383: any
declare const AddOrganization1727798417345: any
declare const LinkWorkspaceId1729130948686: any
declare const LinkOrganizationId1729133111652: any
declare const AddSSOColumns1730519457880: any
declare const AddPersonalWorkspace1734074497540: any
declare const RefactorEnterpriseDatabase1737076223692: any
declare const ExecutionLinkWorkspaceId1746862866554: any
