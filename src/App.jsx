import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Breadcrumbs, InputBase, Badge, Chip, useMediaQuery, useTheme, Tooltip } from '@mui/material';
import { Bell, Search, Calendar, Menu, Sparkles } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Production from './components/Production';
import Inventory from './components/Inventory';
import Payroll from './components/Payroll';

const pageTitles = {
  '/': 'Executive Dashboard',
  '/dashboard': 'Executive Dashboard',
  '/production': 'Production Workflow',
  '/inventory': 'Inventory Management',
  '/payroll': 'Payroll & HR',
};

const pageIds = {
  '/': 'dashboard',
  '/dashboard': 'dashboard',
  '/production': 'production',
  '/inventory': 'inventory',
  '/payroll': 'payroll',
};

// ── Live date display ──────────────────────────────────────
function LiveDate() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

// ── TopBar with glassmorphism & animations ─────────────────
function TopBar({ onMenuClick, isMobile }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: { xs: 2, md: 3 },
        pb: 2,
        borderBottom: '1px solid rgba(240, 235, 228, 0.8)',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuClick}
            sx={{
              border: '1px solid #F0EBE4',
              borderRadius: '12px',
              width: 40,
              height: 40,
              flexShrink: 0,
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#C8943E',
                backgroundColor: '#FDF8F0',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Menu size={18} color="#4B2C20" />
          </IconButton>
        )}
        <Breadcrumbs
          separator="›"
          sx={{
            '& .MuiBreadcrumbs-separator': { color: '#C4B8AC', mx: 0.5 },
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Sparkles size={12} color="#C8943E" />
            <Typography sx={{ fontSize: '0.78rem', color: '#7A6E66', display: { xs: 'none', sm: 'block' } }}>
              TimberCraft ERP
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '0.78rem',
              color: '#4B2C20',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.2 }, flexShrink: 0 }}>
        {/* Live Date */}
        <Chip
          icon={<Calendar size={14} />}
          label={<LiveDate />}
          size="small"
          sx={{
            bgcolor: 'rgba(253, 248, 240, 0.9)',
            backdropFilter: 'blur(8px)',
            color: '#4B2C20',
            fontWeight: 500,
            fontSize: '0.76rem',
            height: 34,
            display: { xs: 'none', sm: 'flex' },
            '& .MuiChip-icon': { color: '#C8943E' },
            border: '1px solid rgba(200, 148, 62, 0.15)',
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: '#FDF8F0',
              borderColor: 'rgba(200, 148, 62, 0.35)',
            },
          }}
        />

        {/* Search - desktop only */}
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.7,
            borderRadius: '12px',
            border: '1px solid #F0EBE4',
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.25s ease',
            '&:hover': {
              borderColor: '#C8943E',
              boxShadow: '0 0 0 3px rgba(200,148,62,0.08)',
            },
            '&:focus-within': {
              borderColor: '#C8943E',
              boxShadow: '0 0 0 3px rgba(200,148,62,0.12)',
            },
          }}
        >
          <Search size={15} color="#A09486" />
          <InputBase
            placeholder="Quick search..."
            sx={{ fontSize: '0.82rem', width: 160, color: '#2D2420' }}
          />
          <Typography
            sx={{
              fontSize: '0.62rem',
              color: '#A09486',
              border: '1px solid #E8E0D8',
              borderRadius: '5px',
              px: 0.7,
              py: 0.15,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            ⌘K
          </Typography>
        </Box>

        {/* Notifications */}
        <Tooltip title="3 notifications" arrow>
          <IconButton
            size="small"
            sx={{
              border: '1px solid #F0EBE4',
              borderRadius: '12px',
              width: 38,
              height: 38,
              position: 'relative',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: '#C8943E',
                backgroundColor: '#FDF8F0',
                transform: 'scale(1.05)',
              },
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#C8943E',
                  color: '#fff',
                  fontSize: '0.6rem',
                  minWidth: 18,
                  height: 18,
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(200,148,62,0.4)',
                },
              }}
            >
              <Bell size={16} color="#7A6E66" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

// ── Page wrapper with animations ───────────────────────────
function AnimatedPage({ children }) {
  const location = useLocation();
  return (
    <Box key={location.pathname} className="page-content">
      {children}
    </Box>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const activePage = pageIds[location.pathname] || 'dashboard';

  const handlePageChange = (pageId) => {
    const path = pageId === 'dashboard' ? '/dashboard' : `/${pageId}`;
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F6F3' }}>
      <Sidebar
        activePage={activePage}
        onPageChange={handlePageChange}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5, md: 3, lg: 4 },
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
          }}
        >
          <TopBar
            onMenuClick={() => setMobileOpen(true)}
            isMobile={isMobile}
          />
          <AnimatedPage>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/production" element={<Production />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AnimatedPage>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
