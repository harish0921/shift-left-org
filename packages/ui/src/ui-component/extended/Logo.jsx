import logo from '@/assets/images/shiftleft-logo.svg'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: '10px' }}>
            <img
                style={{ objectFit: 'contain' }}
                src={logo}
                alt='ShiftLeft'
                width={36}
                height={36}
            />
            <span style={{ fontSize: '20px', letterSpacing: '-0.5px', marginLeft: '10px' }}>
                <span style={{ fontWeight: 400, color: '#1A1A1A' }}>Shift</span>
                <span style={{ fontWeight: 700, color: '#0078D4' }}>Left</span>
            </span>
        </div>
    )
}

export default Logo
