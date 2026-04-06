import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@mui/material'

export const BackdropLoader = ({ open }) => {
    return (
        <Backdrop
            sx={{
                color: '#ff7a1a',
                zIndex: (theme) => theme.zIndex.modal + 10,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
            open={open}
        >
            <CircularProgress color='inherit' size={56} thickness={4.5} />
        </Backdrop>
    )
}

BackdropLoader.propTypes = {
    open: PropTypes.bool
}
