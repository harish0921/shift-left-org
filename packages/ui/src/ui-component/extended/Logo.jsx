import logo from '@/assets/images/shiftleft-logo.svg'
import { useTheme } from '@mui/material/styles'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const theme = useTheme()

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
            <img
                style={{ objectFit: 'contain' }}
                src={logo}
                alt='ShiftLeft'
                width={36}
                height={36}
            />
            <span
                style={{
                    marginLeft: '10px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '18px',
                    letterSpacing: '-0.2px'
                }}
            >
                <span
                    style={{
                        color: theme.palette.text.primary
                    }}
                >
                    Shift
                </span>
                <span
                    style={{
                        color: '#FF5C00'
                    }}
                >
                    Left
                </span>
            </span>
        </div>
    )
}

export default Logo
