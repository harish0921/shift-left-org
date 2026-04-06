import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, List, Typography, useMediaQuery } from '@mui/material'

// project imports
import NavItem from '../NavItem'
import NavCollapse from '../NavCollapse'
import { useAuth } from '@/hooks/useAuth'
import { Available } from '@/ui-component/rbac/available'

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
    const theme = useTheme()
    const customization = useSelector((state) => state.customization)
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))
    const isMiniMode = !customization.opened && !matchesSM
    const { hasPermission, hasDisplay } = useAuth()

    const listItems = (menu, level = 1) => {
        // Filter based on display and permission
        if (!shouldDisplayMenu(menu)) return null

        // Handle item and group types
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={level} />
            case 'item':
                return <NavItem key={menu.id} item={menu} level={level} navType='MENU' />
            default:
                return (
                    <Typography key={menu.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                )
        }
    }

    const shouldDisplayMenu = (menu) => {
        // Bypass permission checks and always display the menu
        return true
    }

    const renderPrimaryItems = () => {
        const primaryGroup = item.children.find((child) => child.id === 'primary')
        return primaryGroup.children
    }

    const renderNonPrimaryGroups = () => {
        let nonprimaryGroups = item.children.filter((child) => child.id !== 'primary')
        // Display children based on permission and display
        nonprimaryGroups = nonprimaryGroups.map((group) => {
            const children = group.children.filter((menu) => shouldDisplayMenu(menu))
            return { ...group, children }
        })
        // Get rid of group with empty children
        nonprimaryGroups = nonprimaryGroups.filter((group) => group.children.length > 0)
        return nonprimaryGroups
    }

    return (
        <>
            <List
                subheader={
                    !isMiniMode &&
                    item.title && (
                        <Typography variant='caption' sx={{ ...theme.typography.menuCaption }} display='block' gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
                sx={{ p: isMiniMode ? '12px 8px' : '16px', py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
            >
                {renderPrimaryItems().map((menu) => listItems(menu))}
            </List>

            {renderNonPrimaryGroups().map((group) => {
                const groupPermissions = group.children.map((menu) => menu.permission).join(',')
                return (
                    <Available key={group.id} permission={groupPermissions}>
                        <>
                            <Divider sx={{ height: '1px', borderColor: theme.palette.grey[900] + 25, my: 0 }} />
                            <List
                                subheader={
                                    !isMiniMode ? (
                                        <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                                            {group.title}
                                        </Typography>
                                    ) : null
                                }
                                sx={{ p: isMiniMode ? '12px 8px' : '16px', py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}
                            >
                                {group.children.map((menu) => listItems(menu))}
                            </List>
                        </>
                    </Available>
                )
            })}
        </>
    )
}

NavGroup.propTypes = {
    item: PropTypes.object
}

export default NavGroup
