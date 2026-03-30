import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import toolsService from '../../services/tools'
import { getPageAndLimitParams } from '../../utils/pagination'

const createTool = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body) {
            throw new InternalFlowiseError(StatusCodes.PRECONDITION_FAILED, `Error: toolsController.createTool - body not provided!`)
        }
        const orgId = req.user?.activeOrganizationId
        if (!orgId) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Error: toolsController.createTool - organization ${orgId} not found!`)
        }
<<<<<<< HEAD
        const workspaceId = req.user?.activeWorkspaceId || ''
const body = req.body
        body.workspaceId = workspaceId
=======
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Error: toolsController.createTool - workspace ${workspaceId} not found!`)
        }
        const body = req.body
        // Explicit allowlist — id/workspaceId/timestamps must not be overrideable by client
        const toolBody: Record<string, unknown> = {}
        if (body.name !== undefined) toolBody.name = body.name
        if (body.description !== undefined) toolBody.description = body.description
        if (body.color !== undefined) toolBody.color = body.color
        if (body.iconSrc !== undefined) toolBody.iconSrc = body.iconSrc
        if (body.schema !== undefined) toolBody.schema = body.schema
        if (body.func !== undefined) toolBody.func = body.func
        toolBody.workspaceId = workspaceId
>>>>>>> f118d77e1943a5e777bd7d57d4ae3d557a623b90

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
        const workspaceId = req.user?.activeWorkspaceId || ''
const apiResponse = await toolsService.deleteTool(req.params.id, workspaceId)
        return res.json(apiResponse)
    } catch (error) {
        next(error)
    }
}

const getAllTools = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = getPageAndLimitParams(req)
        const apiResponse = await toolsService.getAllTools(req.user?.activeWorkspaceId, page, limit)
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
        const workspaceId = req.user?.activeWorkspaceId || ''
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
<<<<<<< HEAD
        const workspaceId = req.user?.activeWorkspaceId || ''
const apiResponse = await toolsService.updateTool(req.params.id, req.body, workspaceId)
=======
        const workspaceId = req.user?.activeWorkspaceId
        if (!workspaceId) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Error: toolsController.updateTool - workspace ${workspaceId} not found!`)
        }
        const body = req.body
        // Explicit allowlist — id/workspaceId/timestamps must not be overrideable by client
        const toolBody: Record<string, unknown> = {}
        if (body.name !== undefined) toolBody.name = body.name
        if (body.description !== undefined) toolBody.description = body.description
        if (body.color !== undefined) toolBody.color = body.color
        if (body.iconSrc !== undefined) toolBody.iconSrc = body.iconSrc
        if (body.schema !== undefined) toolBody.schema = body.schema
        if (body.func !== undefined) toolBody.func = body.func
        const apiResponse = await toolsService.updateTool(req.params.id, toolBody, workspaceId)
>>>>>>> f118d77e1943a5e777bd7d57d4ae3d557a623b90
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
