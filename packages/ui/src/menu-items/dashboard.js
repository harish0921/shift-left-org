// assets
import {
    IconList,
    IconSettings,
    IconTestPipe,
    IconMicroscope,
    IconDatabase,
    IconChartHistogram
} from '@tabler/icons-react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import DataObjectOutlinedIcon from '@mui/icons-material/DataUsageOutlined'
import KeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined'

// constant
const icons = {
    ChatBubbleOutlineIcon,
    SmartToyOutlinedIcon,
    PlayCircleOutlineIcon,
    AssistantOutlinedIcon,
    StorefrontOutlinedIcon,
    FolderOpenOutlinedIcon,
    BuildOutlinedIcon,
    LockOutlinedIcon,
    DataObjectOutlinedIcon,
    KeyOutlinedIcon,
    IconList,
    IconSettings,
    IconTestPipe,
    IconMicroscope,
    IconDatabase,
    IconChartHistogram
}

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
        {
            id: 'primary',
            title: '',
            type: 'group',
            children: [
                {
                    id: 'chatflows',
                    title: 'Chatflows',
                    type: 'item',
                    url: '/chatflows',
                    icon: icons.ChatBubbleOutlineIcon,
                    breadcrumbs: true,
                    permission: 'chatflows:view'
                },
                {
                    id: 'agentflows',
                    title: 'Agentflows',
                    type: 'item',
                    url: '/agentflows',
                    icon: icons.SmartToyOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'agentflows:view'
                },
                {
                    id: 'executions',
                    title: 'Executions',
                    type: 'item',
                    url: '/executions',
                    icon: icons.PlayCircleOutlineIcon,
                    breadcrumbs: true,
                    permission: 'executions:view'
                },
                {
                    id: 'assistants',
                    title: 'Assistants',
                    type: 'item',
                    url: '/assistants',
                    icon: icons.AssistantOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'assistants:view'
                },
                {
                    id: 'marketplaces',
                    title: 'Marketplaces',
                    type: 'item',
                    url: '/marketplaces',
                    icon: icons.StorefrontOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'templates:marketplace,templates:custom'
                },
                {
                    id: 'tools',
                    title: 'Tools',
                    type: 'item',
                    url: '/tools',
                    icon: icons.BuildOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'tools:view'
                },
                {
                    id: 'secrets',
                    title: 'Secrets',
                    type: 'item',
                    url: '/credentials',
                    icon: icons.LockOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'credentials:view'
                },
                {
                    id: 'variables',
                    title: 'Variables',
                    type: 'item',
                    url: '/variables',
                    icon: icons.DataObjectOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'variables:view'
                },
                {
                    id: 'apikeys',
                    title: 'API Keys',
                    type: 'item',
                    url: '/apikey',
                    icon: icons.KeyOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'apikeys:view'
                },
                {
                    id: 'knowledge',
                    title: 'Knowledge Stores',
                    type: 'item',
                    url: '/document-stores',
                    icon: icons.FolderOpenOutlinedIcon,
                    breadcrumbs: true,
                    permission: 'documentStores:view'
                }
            ]
        },
        {
            id: 'evaluations',
            title: 'Evaluations',
            type: 'group',
            children: [
                {
                    id: 'datasets',
                    title: 'Datasets',
                    type: 'item',
                    url: '/datasets',
                    icon: icons.IconDatabase,
                    breadcrumbs: true,
                    display: 'feat:datasets',
                    permission: 'datasets:view'
                },
                {
                    id: 'evaluators',
                    title: 'Evaluators',
                    type: 'item',
                    url: '/evaluators',
                    icon: icons.IconTestPipe,
                    breadcrumbs: true,
                    display: 'feat:evaluators',
                    permission: 'evaluators:view'
                },
                {
                    id: 'evaluations',
                    title: 'Evaluations',
                    type: 'item',
                    url: '/evaluations',
                    icon: icons.IconChartHistogram,
                    breadcrumbs: true,
                    display: 'feat:evaluations',
                    permission: 'evaluations:view'
                }
            ]
        },
        {
            id: 'others',
            title: 'Others',
            type: 'group',
            children: [
                {
                    id: 'logs',
                    title: 'Logs',
                    type: 'item',
                    url: '/logs',
                    icon: icons.IconList,
                    breadcrumbs: true,
                    display: 'feat:logs',
                    permission: 'logs:view'
                },
                // {
                //     id: 'files',
                //     title: 'Files',
                //     type: 'item',
                //     url: '/files',
                //     icon: icons.IconFileDatabase,
                //     breadcrumbs: true,
                //     display: 'feat:files',
                // },
                {
                    id: 'account',
                    title: 'Account Settings',
                    type: 'item',
                    url: '/account',
                    icon: icons.IconSettings,
                    breadcrumbs: true,
                    display: 'feat:account'
                }
            ]
        }
    ]
}

export default dashboard
