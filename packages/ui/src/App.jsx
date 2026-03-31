import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

// routing
import Routes from '@/routes'

// defaultTheme
import { darkTheme, lightTheme } from '@/themes'

// project imports
import NavigationScroll from '@/layout/NavigationScroll'

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization)
    const theme = customization.isDarkMode ? darkTheme : lightTheme

    useEffect(() => {
        const mode = customization.isDarkMode ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', mode)
        document.body.setAttribute('data-theme', mode)
    }, [customization.isDarkMode])

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
