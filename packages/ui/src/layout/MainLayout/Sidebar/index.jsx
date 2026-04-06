import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Box, Drawer, useMediaQuery } from '@mui/material'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'
import { BrowserView, MobileView } from 'react-device-detect'

// project imports
import MenuList from './MenuList'
import LogoSection from '../LogoSection'
import CloudMenuList from '@/layout/MainLayout/Sidebar/CloudMenuList'
import { useConfig } from '@/store/context/ConfigContext'

// store
import { drawerWidth, headerHeight } from '@/store/constant'

// ==============================|| SIDEBAR DRAWER ||============================== //
const miniDrawerWidth = 88

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'))
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const { isOpenSource } = useConfig()
    const shouldRenderSidebar = isOpenSource || isAuthenticated

    const drawer = (
        <>
            <Box
                sx={{
                    display: { xs: 'block', md: 'none' },
                    height: '80px'
                }}
            >
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component='div'
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : `calc(100vh - ${headerHeight}px)`,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <MenuList />
                    <CloudMenuList />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    <CloudMenuList />
                </Box>
            </MobileView>
        </>
    )

    const container = window !== undefined ? () => window.document.body : undefined

    return (
        <Box
            component='nav'
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? (drawerOpen ? drawerWidth : miniDrawerWidth) : 'auto'
            }}
            aria-label='mailbox folders'
        >
            {shouldRenderSidebar && (
                <Drawer
                    container={container}
                    variant={matchUpMd ? 'persistent' : 'temporary'}
                    anchor='left'
                    open={matchUpMd ? true : drawerOpen}
                    onClose={drawerToggle}
                    sx={{
                        '& .MuiDrawer-paper': {
                            width: matchUpMd ? (drawerOpen ? drawerWidth : miniDrawerWidth) : drawerWidth,
                            background: theme.palette.mode === 'light' ? 'rgba(255, 247, 240, 0.68)' : 'rgba(8, 12, 20, 0.84)',
                            backdropFilter: 'blur(18px)',
                            WebkitBackdropFilter: 'blur(18px)',
                            color: theme.palette.text.primary,
                            overflowX: 'hidden',
                            [theme.breakpoints.up('md')]: {
                                top: `${headerHeight}px`
                            },
                            borderRight: drawerOpen ? '1px solid' : 'none',
                            borderColor: drawerOpen ? (theme.palette.mode === 'light' ? '#FFDCC8' : 'rgba(143, 170, 204, 0.18)') : 'transparent',
                            boxShadow: theme.palette.mode === 'dark' ? 'inset -1px 0 0 rgba(143, 170, 204, 0.1)' : 'none'
                        }
                    }}
                    ModalProps={{ keepMounted: true }}
                    color='inherit'
                >
                    {drawer}
                </Drawer>
            )}
        </Box>
    )
}

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
}

export default Sidebar

