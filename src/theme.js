import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B2C20',
      light: '#6B4332',
      dark: '#3A1F15',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C8943E',
      light: '#E5B86A',
      dark: '#A87A2F',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F6F3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D2420',
      secondary: '#7A6E66',
    },
    success: {
      main: '#2E7D32',
      light: '#E8F5E9',
    },
    warning: {
      main: '#ED6C02',
      light: '#FFF3E0',
    },
    error: {
      main: '#D32F2F',
      light: '#FFEBEE',
    },
    divider: '#E8E0D8',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { fontWeight: 600, letterSpacing: '-0.01em' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, color: '#7A6E66' },
    body2: { color: '#7A6E66' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(75, 44, 32, 0.04), 0 1px 2px rgba(75, 44, 32, 0.06)',
          border: '1px solid #F0EBE4',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '8px 20px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#7A6E66',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '2px solid #F0EBE4',
          backgroundColor: '#FDFBF9',
        },
        root: {
          borderBottom: '1px solid #F5F1EC',
          padding: '14px 16px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          minHeight: 44,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 8,
          backgroundColor: '#F0EBE4',
        },
      },
    },
  },
});

export default theme;
