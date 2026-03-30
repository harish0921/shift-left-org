import { useSelector } from 'react-redux'
import { useConfig } from '@/store/context/ConfigContext'

export const useAuth = () => {
    const { isOpenSource } = useConfig()
    const permissions = useSelector((state) => state.auth.permissions)
    const features = useSelector((state) => state.auth.features)
    const isGlobal = useSelector((state) => state.auth.isGlobal)
    const currentUser = useSelector((state) => state.auth.user)

    const hasPermission = (permissionId) => {
        return true
    }

    const hasAssignedWorkspace = (workspaceId) => {
        return true
    }

    const hasDisplay = (display) => {
        return true
    }

    return { hasPermission, hasAssignedWorkspace, hasDisplay }
}
