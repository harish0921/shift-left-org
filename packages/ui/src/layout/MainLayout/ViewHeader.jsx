import PropTypes from 'prop-types'
import { useRef } from 'react'

// material-ui
import { IconButton, Box, OutlinedInput, Toolbar, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { StyledFab } from '@/ui-component/button/StyledFab'

// icons
import { IconSearch, IconArrowLeft, IconEdit } from '@tabler/icons-react'

import useSearchShortcut from '@/hooks/useSearchShortcut'
import { getOS } from '@/utils/genericHelper'

const os = getOS()
const isMac = os === 'macos'
const isDesktop = isMac || os === 'windows' || os === 'linux'
const keyboardShortcut = isMac ? '[ ⌘ + F ]' : '[ Ctrl + F ]'

const ViewHeader = ({
    children,
    filters = null,
    onSearchChange,
    search,
    searchPlaceholder = 'Search',
    title,
    description,
    isBackButton,
    onBack,
    isEditButton,
    onEdit
}) => {
    const theme = useTheme()
    const searchInputRef = useRef()
    useSearchShortcut(searchInputRef)

    return (
        <Box sx={{ flexGrow: 1, py: 1.25, width: '100%' }}>
            <Toolbar
                disableGutters={true}
                sx={{
                    p: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    rowGap: 1.5
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', flex: '1 1 520px', minWidth: 0, pr: 1 }}>
                    {isBackButton && (
                        <StyledFab
                            sx={{
                                mr: 3,
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)',
                                color: 'text.secondary',
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: 'none',
                                '&:hover': {
                                    bgcolor: 'rgba(255,92,0,0.12)',
                                    color: 'primary.main',
                                    borderColor: 'primary.main'
                                }
                            }}
                            size='small'
                            aria-label='back'
                            title='Back'
                            onClick={onBack}
                        >
                            <IconArrowLeft style={{ color: 'currentColor' }} />
                        </StyledFab>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
                        <Typography
                            sx={{
                                fontSize: '1.8rem',
                                fontWeight: 600,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                flex: 1,
                                minWidth: 0,
                                maxWidth: { xs: '100%', md: '680px' }
                            }}
                            variant='h1'
                        >
                            {title}
                        </Typography>
                        {description && (
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    mt: 2,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 5,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    flex: 1,
                                    minWidth: 0,
                                    maxWidth: { xs: '100%', md: '680px' }
                                }}
                            >
                                {description}
                            </Typography>
                        )}
                    </Box>
                    {isEditButton && (
                        <IconButton
                            sx={{
                                ml: 3,
                                color: 'text.secondary',
                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)',
                                border: '1px solid',
                                borderColor: 'divider',
                                '&:hover': {
                                    bgcolor: 'rgba(255,92,0,0.12)',
                                    color: 'primary.main',
                                    borderColor: 'primary.main'
                                }
                            }}
                            title='Edit'
                            onClick={onEdit}
                        >
                            <IconEdit style={{ color: 'currentColor' }} />
                        </IconButton>
                    )}
                </Box>
                <Box
                    sx={{
                        minHeight: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'flex-start', md: 'flex-end' },
                        width: { xs: '100%', md: 'auto' }
                    }}
                >
                    {search && (
                        <OutlinedInput
                            inputRef={searchInputRef}
                            size='small'
                            sx={{
                                width: '325px',
                                height: '100%',
                                display: { xs: 'none', sm: 'flex' },
                                borderRadius: 2,

                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: 2
                                }
                            }}
                            variant='outlined'
                            placeholder={`${searchPlaceholder} ${isDesktop ? keyboardShortcut : ''}`}
                            onChange={onSearchChange}
                            startAdornment={
                                <Box
                                    sx={{
                                        color: theme.palette.grey[400],
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 1
                                    }}
                                >
                                    <IconSearch style={{ color: 'inherit', width: 16, height: 16 }} />
                                </Box>
                            }
                            type='search'
                        />
                    )}
                    {filters}
                    {children}
                </Box>
            </Toolbar>
        </Box>
    )
}

ViewHeader.propTypes = {
    children: PropTypes.node,
    filters: PropTypes.node,
    onSearchChange: PropTypes.func,
    search: PropTypes.bool,
    searchPlaceholder: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isBackButton: PropTypes.bool,
    onBack: PropTypes.func,
    isEditButton: PropTypes.bool,
    onEdit: PropTypes.func
}

export default ViewHeader
