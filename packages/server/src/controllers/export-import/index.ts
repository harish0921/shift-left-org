import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import exportImportService from '../../services/export-import'
const resolveImportContext = async (req: Request) => {
    const workspaceId = req.user?.activeWorkspaceId || req.user?.workspaceId || ''
    let orgId = req.user?.activeOrganizationId || req.user?.organizationId || ''
    let subscriptionId = req.user?.activeOrganizationSubscriptionId || req.user?.organizationSubscriptionId || ''

    return { workspaceId, orgId, subscriptionId }
}

const exportData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.user?.activeWorkspaceId || ''
const apiResponse = await exportImportService.exportData(exportImportService.convertExportInput(req.body), workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const importData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { workspaceId, orgId: resolvedOrgId, subscriptionId } = await resolveImportContext(req)
        const orgId = resolvedOrgId || 'unknown'

        const importData = req.body
        if (!importData) {
            throw new InternalFlowiseError(StatusCodes.BAD_REQUEST, 'Error: exportImportController.importData - importData is required!')
        }

        await exportImportService.importData(importData, orgId, workspaceId, subscriptionId)
        return res.status(StatusCodes.OK).json({ message: 'success' })
    } catch (error) {
        next(error)
    }
}

const exportChatflowMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workspaceId = req.user?.activeWorkspaceId || ''
const { chatflowId, chatType, feedbackType, startDate, endDate } = req.body
        if (!chatflowId) {
            throw new InternalFlowiseError(
                StatusCodes.BAD_REQUEST,
                'Error: exportImportController.exportChatflowMessages - chatflowId is required!'
            )
        }

        const apiResponse = await exportImportService.exportChatflowMessages(
            chatflowId,
            chatType,
            feedbackType,
            startDate,
            endDate,
            workspaceId
        )

        // Set headers for file download
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Disposition', `attachment; filename="${chatflowId}-Message.json"`)

        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    exportData,
    importData,
    exportChatflowMessages
}
