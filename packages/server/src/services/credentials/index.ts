import { StatusCodes } from 'http-status-codes'
import { omit } from 'lodash'
import { ICredentialReturnResponse } from '../../Interface'
import { Credential } from '../../database/entities/Credential'
import { InternalFlowiseError } from '../../errors/internalFlowiseError'
import { getErrorMessage } from '../../errors/utils'
import { decryptCredentialData, transformToCredentialEntity } from '../../utils'
import { getRunningExpressApp } from '../../utils/getRunningExpressApp'

const getWorkspaceSearchOptions = (workspaceId?: string) => {
    if (workspaceId) return { workspaceId }
    return {}
}

const createCredential = async (requestBody: any) => {
    try {
        const appServer = getRunningExpressApp()
        const newCredential = await transformToCredentialEntity(requestBody)

        if (requestBody.id) {
            newCredential.id = requestBody.id
        }

        const credential = await appServer.AppDataSource.getRepository(Credential).create(newCredential)
        const dbResponse = await appServer.AppDataSource.getRepository(Credential).save(credential)
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: credentialsService.createCredential - ${getErrorMessage(error)}`
        )
    }
}

// Delete all credentials from chatflowid
const deleteCredentials = async (credentialId: string, workspaceId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const deleteWhere = workspaceId ? { id: credentialId, workspaceId } : { id: credentialId }
        const dbResponse = await appServer.AppDataSource.getRepository(Credential).delete(deleteWhere)
        if (!dbResponse) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`)
        }
        return dbResponse
    } catch (error) {
        if (error instanceof InternalFlowiseError) throw error
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: credentialsService.deleteCredential - ${getErrorMessage(error)}`
        )
    }
}

const getAllCredentials = async (paramCredentialName: any, workspaceId: string) => {
    try {
        const appServer = getRunningExpressApp()
        let dbResponse: any[] = []
        if (paramCredentialName) {
            if (Array.isArray(paramCredentialName)) {
                for (let i = 0; i < paramCredentialName.length; i += 1) {
                    const name = paramCredentialName[i] as string
                    const searchOptions = {
                        credentialName: name,
                        ...getWorkspaceSearchOptions(workspaceId)
                    }
                    const credentials = await appServer.AppDataSource.getRepository(Credential).findBy(searchOptions)
                    dbResponse.push(...credentials.map((c) => omit(c, ['encryptedData'])))
                }
            } else {
                const searchOptions = {
                    credentialName: paramCredentialName,
                    ...getWorkspaceSearchOptions(workspaceId)
                }
                const credentials = await appServer.AppDataSource.getRepository(Credential).findBy(searchOptions)
                dbResponse = credentials.map((c) => omit(c, ['encryptedData']))
            }
        } else {
            const credentials = await appServer.AppDataSource.getRepository(Credential).findBy(getWorkspaceSearchOptions(workspaceId))
            for (const credential of credentials) {
                dbResponse.push(omit(credential, ['encryptedData']))
            }
        }
        return dbResponse
    } catch (error) {
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: credentialsService.getAllCredentials - ${getErrorMessage(error)}`
        )
    }
}

const getCredentialById = async (credentialId: string, workspaceId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const findWhere = workspaceId ? { id: credentialId, workspaceId } : { id: credentialId }
        const credential = await appServer.AppDataSource.getRepository(Credential).findOneBy(findWhere)
        if (!credential) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`)
        }
        // Decrpyt credentialData
        const decryptedCredentialData = await decryptCredentialData(
            credential.encryptedData,
            credential.credentialName,
            appServer.nodesPool.componentCredentials
        )
        const returnCredential: ICredentialReturnResponse = {
            ...credential,
            plainDataObj: decryptedCredentialData
        }
        const dbResponse: any = omit(returnCredential, ['encryptedData'])
        return dbResponse
    } catch (error) {
        if (error instanceof InternalFlowiseError) throw error
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: credentialsService.createCredential - ${getErrorMessage(error)}`
        )
    }
}

const updateCredential = async (credentialId: string, requestBody: any, workspaceId: string): Promise<any> => {
    try {
        const appServer = getRunningExpressApp()
        const findWhere = workspaceId ? { id: credentialId, workspaceId } : { id: credentialId }
        const credential = await appServer.AppDataSource.getRepository(Credential).findOneBy(findWhere)
        if (!credential) {
            throw new InternalFlowiseError(StatusCodes.NOT_FOUND, `Credential ${credentialId} not found`)
        }
        const decryptedCredentialData = await decryptCredentialData(credential.encryptedData)
        requestBody.plainDataObj = { ...decryptedCredentialData, ...requestBody.plainDataObj }
        const updateCredential = await transformToCredentialEntity(requestBody)
        if (workspaceId) {
            updateCredential.workspaceId = workspaceId
        }
        await appServer.AppDataSource.getRepository(Credential).merge(credential, updateCredential)
        const dbResponse = await appServer.AppDataSource.getRepository(Credential).save(credential)
        return dbResponse
    } catch (error) {
        if (error instanceof InternalFlowiseError) throw error
        throw new InternalFlowiseError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Error: credentialsService.updateCredential - ${getErrorMessage(error)}`
        )
    }
}

export default {
    createCredential,
    deleteCredentials,
    getAllCredentials,
    getCredentialById,
    updateCredential
}
