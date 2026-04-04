import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import { Button, Avatar, Box, ButtonBase, IconButton, Tooltip } from '@mui/material'
import { useTheme, darken } from '@mui/material/styles'

// project imports
import LogoSection from '../LogoSection'
import ProfileSection from './ProfileSection'
import WorkspaceSwitcher from '@/layout/MainLayout/Header/WorkspaceSwitcher'
import OrgWorkspaceBreadcrumbs from '@/layout/MainLayout/Header/OrgWorkspaceBreadcrumbs'
import PricingDialog from '@/ui-component/subscription/PricingDialog'

// assets
import { IconMenu2, IconSparkles } from '@tabler/icons-react'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

// store
import { SET_DARKMODE } from '@/store/actions'
import { useConfig } from '@/store/context/ConfigContext'

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme()
    const navigate = useNavigate()

    const customization = useSelector((state) => state.customization)

    const [isDark, setIsDark] = useState(customization.isDarkMode)
    const dispatch = useDispatch()
    const { isEELicensed, isCloud, isOpenSource } = useConfig()
    const currentUser = useSelector((state) => state.auth.user)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const shouldShowMenuToggle = isOpenSource || isAuthenticated
    const [isPricingOpen, setIsPricingOpen] = useState(false)

    const changeDarkMode = () => {
        dispatch({ type: SET_DARKMODE, isDarkMode: !isDark })
        setIsDark((isDark) => !isDark)
        localStorage.setItem('isDarkMode', !isDark)
    }

    useEffect(() => {
        setIsDark(customization.isDarkMode)
    }, [customization.isDarkMode])

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component='span' sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {shouldShowMenuToggle && (
                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant='rounded'
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.mode === 'dark' ? theme.palette.grey[200] : '#FFF3EE',
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    background: theme.palette.action.hover,
                                    color: theme.palette.primary.main
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color='inherit'
                        >
                            <IconMenu2 stroke={1.5} size='1.3rem' />
                        </Avatar>
                    </ButtonBase>
                )}
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {isEELicensed && isAuthenticated && <WorkspaceSwitcher />}
            {isCloud && isAuthenticated && <OrgWorkspaceBreadcrumbs />}
            {isCloud && currentUser?.isOrganizationAdmin && (
                <Button
                    variant='contained'
                    sx={{
                        mr: 1,
                        ml: 2,
                        borderRadius: 15,
                        background: (theme) =>
                            `linear-gradient(90deg, ${theme.palette.primary.main} 10%, ${theme.palette.secondary.main} 100%)`,
                        color: (theme) => theme.palette.secondary.contrastText,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: (theme) =>
                                `linear-gradient(90deg, ${darken(theme.palette.primary.main, 0.1)} 10%, ${darken(
                                    theme.palette.secondary.main,
                                    0.1
                                )} 100%)`,
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                        }
                    }}
                    onClick={() => setIsPricingOpen(true)}
                    startIcon={<IconSparkles size={20} />}
                >
                    Upgrade
                </Button>
            )}
            {isPricingOpen && isCloud && (
                <PricingDialog
                    open={isPricingOpen}
                    onClose={(planUpdated) => {
                        setIsPricingOpen(false)
                        if (planUpdated) {
                            navigate('/')
                            navigate(0)
                        }
                    }}
                />
            )}
            <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <IconButton
                    onClick={changeDarkMode}
                    size='large'
                    sx={{
                        color: isDark ? '#AAAAAA' : '#6B6B6B',
                        '&:hover': { color: '#FF5C00', backgroundColor: 'rgba(255,92,0,0.08)' }
                    }}
                >
                    {isDark ? <LightModeIcon sx={{ color: 'inherit' }} /> : <DarkModeIcon sx={{ color: 'inherit' }} />}
                </IconButton>
            </Tooltip>
            <Box sx={{ ml: 2 }}></Box>
            <ProfileSection />
        </>
    )
}

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
}

export default Header
