import { createTheme } from '@mui/material/styles'

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  primary: {
                      main: '#FF5C00',
                      light: '#FF7A33',
                      dark: '#E04F00',
                      contrastText: '#FFFFFF',
                      200: '#FFB899',
                      800: '#CC4A00'
                  },
                  secondary: {
                      main: '#1A1A1A',
                      light: '#444444',
                      dark: '#000000',
                      contrastText: '#FFFFFF',
                      200: '#6B6B6B',
                      800: '#0A0A0A'
                  },
                  background: {
                      default: '#FFFDFB',
                      paper: '#FFFFFF'
                  },
                  text: {
                      primary: '#1A1A1A',
                      secondary: '#6B6B6B',
                      disabled: '#B0B0B0',
                      hint: '#B0B0B0'
                  },
                  divider: '#F1E7DE',
                  action: {
                      hover: 'rgba(255,92,0,0.06)',
                      selected: 'rgba(255,92,0,0.10)',
                      disabled: '#B0B0B0',
                      disabledBackground: '#F0F0ED',
                      focus: 'rgba(255,92,0,0.12)'
                  },
                  grey: {
                      50: '#FFF9F5',
                      100: '#FFF3EB',
                      200: '#F5E8DC',
                      300: '#E7D6C6',
                      400: '#C8B3A0',
                      500: '#9F8872',
                      600: '#7E6B5B',
                      700: '#5F4F42',
                      800: '#3F342B',
                      900: '#1A1A1A'
                  },
                  asyncSelect: {
                      main: '#FFF9F5'
                  },
                  textBackground: {
                      main: '#FFF9F5',
                      border: '#F1E7DE'
                  },
                  card: {
                      main: '#FFFFFF',
                      light: '#FFF9F5',
                      hover: '#FFFFFF'
                  },
                  timeMessage: {
                      main: '#FFF3EB'
                  },
                  canvasHeader: {
                      deployLight: '#FFF3EE',
                      deployDark: '#FF5C00',
                      saveLight: '#FFF3EE',
                      saveDark: '#FF5C00',
                      settingsLight: '#FFF3EE',
                      settingsDark: '#FF5C00'
                  },
                  codeEditor: {
                      main: '#FFF9F5'
                  },
                  nodeToolTip: {
                      background: '#1A1A1A',
                      color: '#FFFFFF'
                  },
                  teal: {
                      light: '#76C893',
                      main: '#52B69A',
                      dark: '#34A0A4'
                  }
              }
            : {
                  primary: {
                      main: '#FF5C00',
                      light: '#FF7A33',
                      dark: '#E04F00',
                      contrastText: '#FFFFFF',
                      200: '#FF9966',
                      800: '#CC4A00'
                  },
                  secondary: {
                      main: '#F5F5F5',
                      light: '#FFFFFF',
                      dark: '#CCCCCC',
                      contrastText: '#111111',
                      200: '#AAAAAA',
                      800: '#EEEEEE'
                  },
                  background: {
                      default: '#07090C',
                      paper: 'rgba(14,17,24,0.72)'
                  },
                  text: {
                      primary: '#F5F5F5',
                      secondary: '#AAAAAA',
                      disabled: '#555555',
                      hint: '#555555'
                  },
                  divider: 'rgba(255,255,255,0.1)',
                  action: {
                      hover: 'rgba(255,92,0,0.10)',
                      selected: 'rgba(255,92,0,0.15)',
                      disabled: '#555555',
                      disabledBackground: '#2A2A2A',
                      focus: 'rgba(255,92,0,0.18)'
                  },
                  grey: {
                      50: '#2A2A2A',
                      100: '#242424',
                      200: '#1E1E1E',
                      300: '#333333',
                      400: '#444444',
                      500: '#666666',
                      600: '#888888',
                      700: '#AAAAAA',
                      800: '#CCCCCC',
                      900: '#F0F0F0'
                  },
                  asyncSelect: {
                      main: '#242424'
                  },
                  textBackground: {
                      main: '#242424',
                      border: 'rgba(255,255,255,0.12)'
                  },
                  card: {
                      main: 'rgba(18,22,31,0.78)',
                      light: 'rgba(28,34,47,0.75)',
                      hover: 'rgba(28,34,47,0.88)'
                  },
                  timeMessage: {
                      main: '#2A2A2A'
                  },
                  canvasHeader: {
                      deployLight: 'rgba(255,92,0,0.12)',
                      deployDark: '#FF5C00',
                      saveLight: 'rgba(255,92,0,0.12)',
                      saveDark: '#FF5C00',
                      settingsLight: '#2A2A2A',
                      settingsDark: '#AAAAAA'
                  },
                  codeEditor: {
                      main: '#1E1E1E'
                  },
                  nodeToolTip: {
                      background: '#2A2A2A',
                      color: '#FFFFFF'
                  },
                  teal: {
                      light: '#76C893',
                      main: '#52B69A',
                      dark: '#34A0A4'
                  }
              })
    },
    typography: {
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        h1: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 700,
            fontSize: '2.5rem',
            lineHeight: 1.15,
            letterSpacing: '-1px'
        },
        h2: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2,
            letterSpacing: '-0.5px'
        },
        h3: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 700,
            fontSize: '1.6rem',
            lineHeight: 1.25,
            letterSpacing: '-0.3px'
        },
        h4: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 600,
            fontSize: '1.3rem',
            lineHeight: 1.3,
            letterSpacing: '-0.2px'
        },
        h5: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.35
        },
        h6: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.4
        },
        subtitle1: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5
        },
        subtitle2: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.5
        },
        body1: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 400,
            fontSize: '1rem',
            lineHeight: 1.65
        },
        body2: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 400,
            fontSize: '0.875rem',
            lineHeight: 1.6
        },
        caption: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 400,
            fontSize: '0.75rem',
            lineHeight: 1.5
        },
        button: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontWeight: 600,
            fontSize: '0.9rem',
            textTransform: 'none',
            letterSpacing: '0'
        },
        overline: {
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 500,
            fontSize: '0.7rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {
            backgroundColor: 'transparent',
            width: '100%',
            minHeight: 'calc(100vh - 75px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '75px',
            marginRight: '20px',
            borderRadius: '12px'
        },
        menuCaption: {
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '6px',
            textTransform: 'capitalize',
            marginTop: '10px'
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        }
    },
    shape: { borderRadius: 12 }
})

const getComponents = (mode) => ({
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                background:
                    mode === 'light'
                        ? 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F5 55%, #FFF3EB 100%)'
                        : 'radial-gradient(circle at 15% 15%, rgba(255,92,0,0.14) 0%, rgba(255,92,0,0) 34%), radial-gradient(circle at 85% 0%, rgba(255,122,51,0.1) 0%, rgba(255,122,51,0) 30%), #07090C',
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
            },
            '::-webkit-scrollbar': { width: '5px', height: '5px' },
      '::-webkit-scrollbar-track': {
                background: mode === 'light' ? '#FFF9F5' : '#1A1A1A'
            },
            '::-webkit-scrollbar-thumb': {
                background: mode === 'light' ? '#F1E7DE' : '#333333',
                borderRadius: '3px'
            },
            '::-webkit-scrollbar-thumb:hover': {
                background: '#FF5C00'
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '100px',
                padding: '10px 24px',
                fontWeight: 600,
                textTransform: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(255,92,0,0.3)'
                },
                '&:active': { transform: 'scale(0.98)' }
            },
            containedPrimary: {
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(255,92,0,0.25)',
                '&:hover': {
                    backgroundColor: '#FF7A33',
                    boxShadow: '0 8px 24px rgba(255,92,0,0.4)'
                }
            },
            outlinedPrimary: {
                borderColor: '#FF5C00',
                color: '#FF5C00',
                '&:hover': {
                    backgroundColor: 'rgba(255,92,0,0.06)',
                    borderColor: '#FF7A33'
                }
            },
            textPrimary: {
                color: '#FF5C00',
                '&:hover': { backgroundColor: 'rgba(255,92,0,0.06)' }
            }
        }
    },
    MuiIconButton: {
        styleOverrides: {
            root: {
                color: mode === 'light' ? '#E04F00' : '#AAAAAA',
                transition: 'all 0.2s ease',
                '&:hover': {
                    color: '#FF5C00',
                    backgroundColor: mode === 'light' ? 'rgba(255,92,0,0.14)' : 'rgba(255,92,0,0.08)'
                }
            }
        }
    },
    MuiSvgIcon: {
        styleOverrides: {
            root: {
                color: 'inherit'
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? 'rgba(255,247,240,0.96)' : 'rgba(8,11,16,0.68)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: mode === 'light' ? '1px solid #FFDCC8' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: 'none',
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5'
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                backgroundColor: mode === 'light' ? '#FFF7F0' : 'rgba(9,12,18,0.72)',
                backdropFilter: mode === 'light' ? 'none' : 'blur(18px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(18px)',
                borderRight: mode === 'light' ? '1px solid #FFDCC8' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: mode === 'light' ? '2px 0 12px rgba(0,0,0,0.04)' : '2px 0 12px rgba(0,0,0,0.3)'
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            root: {
                borderRadius: '10px',
                margin: '2px 8px',
                padding: '10px 14px',
                color: mode === 'light' ? '#7E6B5B' : '#AAAAAA',
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: mode === 'light' ? 'rgba(255,92,0,0.16)' : 'rgba(255,92,0,0.08)',
                    color: '#FF5C00',
                    paddingLeft: '18px',
                    '& .MuiListItemIcon-root': { color: '#FF5C00' }
                },
                '&.Mui-selected': {
                    backgroundColor: mode === 'light' ? '#FFE8DC' : 'rgba(255,92,0,0.15)',
                    color: '#FF5C00',
                    fontWeight: 600,
                    '& .MuiListItemIcon-root': { color: '#FF5C00' },
                    '&:hover': {
                        backgroundColor: mode === 'light' ? '#FFDCC8' : 'rgba(255,92,0,0.22)'
                    }
                }
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                color: mode === 'light' ? '#E04F00' : '#AAAAAA',
                minWidth: '36px',
                transition: 'color 0.2s ease'
            }
        }
    },
    MuiListItemText: {
        styleOverrides: {
            primary: {
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'inherit'
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : 'rgba(18,22,31,0.78)',
                border: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                boxShadow: mode === 'light' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 2px 8px rgba(0,0,0,0.3)',
                backdropFilter: mode === 'light' ? 'none' : 'blur(16px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(16px)',
                transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {
                    boxShadow: mode === 'light' ? '0 8px 24px rgba(0,0,0,0.10)' : '0 8px 24px rgba(0,0,0,0.4)',
                    transform: 'translateY(-2px)',
                    borderColor: '#FF5C00'
                }
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : 'rgba(14,17,24,0.72)',
                backgroundImage: 'none',
                border: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.08)',
                backdropFilter: mode === 'light' ? 'none' : 'blur(14px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(14px)'
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    backgroundColor: mode === 'light' ? '#FFF9F5' : '#242424',
                    borderRadius: '12px',
                    color: mode === 'light' ? '#1A1A1A' : '#F5F5F5',
                    '& fieldset': {
                        borderColor: mode === 'light' ? '#F1E7DE' : 'rgba(255,255,255,0.12)'
                    },
                    '&:hover fieldset': {
                        borderColor: mode === 'light' ? '#B0B0AA' : 'rgba(255,255,255,0.25)'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#FF5C00',
                        borderWidth: '1.5px'
                    }
                },
                '& .MuiInputLabel-root': {
                    color: mode === 'light' ? '#6B6B6B' : '#AAAAAA',
                    '&.Mui-focused': { color: '#FF5C00' }
                },
                '& .MuiInputBase-input': {
                    color: mode === 'light' ? '#1A1A1A' : '#F5F5F5'
                }
            }
        }
    },
    MuiSelect: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? '#FFF9F5' : '#242424',
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5',
                borderRadius: '12px'
            },
            icon: {
                color: mode === 'light' ? '#6B6B6B' : '#AAAAAA'
            }
        }
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : 'rgba(18,22,31,0.9)',
                border: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: mode === 'light' ? '0 8px 24px rgba(0,0,0,0.10)' : '0 8px 24px rgba(0,0,0,0.5)',
                borderRadius: '12px',
                backdropFilter: mode === 'light' ? 'none' : 'blur(18px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(18px)'
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: '0.9rem',
                '&:hover': {
                    backgroundColor: 'rgba(255,92,0,0.08)',
                    color: '#FF5C00'
                },
                '&.Mui-selected': {
                    backgroundColor: 'rgba(255,92,0,0.10)',
                    color: '#FF5C00'
                }
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: '100px',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontWeight: 500,
                fontSize: '0.8rem'
            },
            colorPrimary: {
                backgroundColor: mode === 'light' ? '#FFF3EE' : 'rgba(255,92,0,0.15)',
                color: '#FF5C00',
                border: '1px solid rgba(255,92,0,0.3)'
            },
            colorDefault: {
                backgroundColor: mode === 'light' ? '#FFF3EB' : '#2A2A2A',
                color: mode === 'light' ? '#6B6B6B' : '#AAAAAA'
            }
        }
    },
    MuiDialog: {
        styleOverrides: {
            root: {
                '& .MuiBackdrop-root': {
                    backgroundColor: mode === 'light' ? 'rgba(246, 241, 236, 0.42)' : 'rgba(6, 9, 14, 0.48)',
                    backdropFilter: 'blur(10px) saturate(120%)',
                    WebkitBackdropFilter: 'blur(10px) saturate(120%)'
                }
            },
            paper: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : 'rgba(12,15,22,0.92)',
                borderRadius: '20px',
                border: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: mode === 'light' ? '0 24px 64px rgba(0,0,0,0.12)' : '0 24px 64px rgba(0,0,0,0.6)',
                backdropFilter: mode === 'light' ? 'none' : 'blur(22px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(22px)'
            }
        }
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5'
            }
        }
    },
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                backgroundColor: mode === 'light' ? '#1A1A1A' : '#2A2A2A',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                padding: '6px 12px',
                border: mode === 'dark' ? '1px solid rgba(255,255,255,0.1)' : 'none'
            },
            arrow: {
                color: mode === 'light' ? '#1A1A1A' : '#2A2A2A'
            }
        }
    },
    MuiTableContainer: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : 'rgba(14,17,24,0.72)',
                border: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                boxShadow: 'none',
                backdropFilter: mode === 'light' ? 'none' : 'blur(14px)',
                WebkitBackdropFilter: mode === 'light' ? 'none' : 'blur(14px)'
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                '& .MuiTableCell-head': {
                    backgroundColor: mode === 'light' ? '#FFF9F5' : '#222222',
                    color: mode === 'light' ? '#6B6B6B' : '#AAAAAA',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    borderBottom: mode === 'light' ? '1px solid #F1E7DE' : '1px solid rgba(255,255,255,0.08)'
                }
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                borderColor: mode === 'light' ? '#F5E8DC' : 'rgba(255,255,255,0.06)',
                color: mode === 'light' ? '#1A1A1A' : '#F5F5F5',
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontSize: '0.9rem'
            }
        }
    },
    MuiTabs: {
        styleOverrides: {
            indicator: {
                backgroundColor: '#FF5C00',
                height: '2px',
                borderRadius: '2px'
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                fontWeight: 500,
                textTransform: 'none',
                fontSize: '0.9rem',
                color: mode === 'light' ? '#6B6B6B' : '#AAAAAA',
                '&.Mui-selected': {
                    color: '#FF5C00',
                    fontWeight: 600
                }
            }
        }
    },
    MuiDivider: {
        styleOverrides: {
            root: {
                borderColor: mode === 'light' ? '#F1E7DE' : 'rgba(255,255,255,0.08)'
            }
        }
    },
    MuiSwitch: {
        styleOverrides: {
            switchBase: {
                '&.Mui-checked': {
                    color: '#FF5C00',
                    '& + .MuiSwitch-track': {
                        backgroundColor: '#FF5C00'
                    }
                }
            },
            track: {
                backgroundColor: mode === 'light' ? '#F1E7DE' : '#444444'
            }
        }
    },
    MuiPagination: {
        styleOverrides: {
            root: {
                '& .MuiPaginationItem-root': {
                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                    color: mode === 'light' ? '#6B6B6B' : '#AAAAAA',
                    borderRadius: '8px',
                    '&.Mui-selected': {
                        backgroundColor: '#FF5C00',
                        color: '#FFFFFF',
                        '&:hover': { backgroundColor: '#FF7A33' }
                    }
                }
            }
        }
    },
    MuiAvatar: {
        styleOverrides: {
            colorDefault: {
                backgroundColor: 'rgba(255,92,0,0.12)',
                color: '#FF5C00'
            }
        }
    },
    MuiLinearProgress: {
        styleOverrides: {
            root: {
                backgroundColor: mode === 'light' ? '#FFF3EB' : 'rgba(255,255,255,0.1)',
                borderRadius: '4px'
            },
            bar: { backgroundColor: '#FF5C00', borderRadius: '4px' }
        }
    },
    MuiCircularProgress: {
        styleOverrides: {
            colorPrimary: { color: '#FF5C00' }
        }
    }
})

export const lightTheme = createTheme({
    ...getDesignTokens('light'),
    components: getComponents('light')
})

export const darkTheme = createTheme({
    ...getDesignTokens('dark'),
    components: getComponents('dark')
})

export default lightTheme

