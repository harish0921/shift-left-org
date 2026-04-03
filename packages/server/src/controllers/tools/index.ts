import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import toolsService from '../../services/tools'
import { getPageAndLimitParams } from '../../utils/pagination'

const resolveWorkspaceId = (req: Request, body?: any) => {
    return req.user?.activeWorkspaceId || req.user?.workspaceId || body?.workspaceId || ''
}

const resolveOrgId = (req: Request, body?: any) => {
    return req.user?.activeOrganizationId || req.user?.organizationId || body?.organizationId || 'unknown'
}

const createTool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.createTool - body not provided!`)
        }
        const body = req.body
        const orgId = resolveOrgId(req, body)
        const workspaceId = resolveWorkspaceId(req, body)

        // Explicit allowlist - id/workspaceId/timestamps must not be overrideable by client
        const toolBody: Record<string, unknown> = {}
        if (body.name !== undefined) toolBody.name = body.name
        if (body.description !== undefined) toolBody.description = body.description
        if (body.color !== undefined) toolBody.color = body.color
        if (body.iconSrc !== undefined) toolBody.iconSrc = body.iconSrc
        if (body.schema !== undefined) toolBody.schema = body.schema
        if (body.func !== undefined) toolBody.func = body.func
        toolBody.workspaceId = workspaceId

        const apiResponse = await toolsService.createTool(toolBody, orgId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const deleteTool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.deleteTool - id not provided!`)
        }
        const workspaceId = resolveWorkspaceId(req)
        const apiResponse = await toolsService.deleteTool(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllTools = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = getPageAndLimitParams(req)
        const apiResponse = await toolsService.getAllTools(resolveWorkspaceId(req), page, limit)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getToolById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.getToolById - id not provided!`)
        }
        const workspaceId = resolveWorkspaceId(req)
        const apiResponse = await toolsService.getToolById(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const updateTool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (typeof req.params === 'undefined' || !req.params.id) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.updateTool - id not provided!`)
        }
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.deleteTool - body not provided!`)
        }
        const workspaceId = resolveWorkspaceId(req, req.body)
        const body = req.body

        // Explicit allowlist - id/workspaceId/timestamps must not be overrideable by client
        const toolBody: Record<string, unknown> = {}
        if (body.name !== undefined) toolBody.name = body.name
        if (body.description !== undefined) toolBody.description = body.description
        if (body.color !== undefined) toolBody.color = body.color
        if (body.iconSrc !== undefined) toolBody.iconSrc = body.iconSrc
        if (body.schema !== undefined) toolBody.schema = body.schema
        if (body.func !== undefined) toolBody.func = body.func
        const apiResponse = await toolsService.updateTool(req.params.id, toolBody, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

export default {
    createTool,
    deleteTool,
    getAllTools,
    getToolById,
    updateTool
}
