import { styled } from '@mui/material/styles'
import { Fab } from '@mui/material'

export const StyledFab = styled(Fab)(({ theme, color = 'primary' }) => {
    const safeColor = theme?.palette?.[color]?.main || theme?.palette?.primary?.main || '#FF5C00'

    return {
        color: 'white',
        backgroundColor: safeColor,
        '&:hover': {
            backgroundColor: safeColor,
            backgroundImage: `linear-gradient(rgb(0 0 0/10%) 0 0)`
        }
    }
})
