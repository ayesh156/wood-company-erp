import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Divider,
  Tooltip,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LayoutDashboard,
  Factory,
  Package,
  Users,
  ChevronLeft,
  ChevronRight,
  TreePine,
  Settings,
  LogOut,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'production', path: '/production', label: 'Production', icon: Factory },
  { id: 'inventory', path: '/inventory', label: 'Inventory', icon: Package },
  { id: 'payroll', path: '/payroll', label: 'Payroll & HR', icon: Users },
];

function SidebarContent({ collapsed, setCollapsed, onMobileClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    if (onMobileClose) onMobileClose();
  };

  return (
    <Box
      sx={{
        width: collapsed ? 76 : 264,
        minWidth: collapsed ? 76 : 264,
        height: '100%',
        background: 'linear-gradient(180deg, #4B2C20 0%, #3A1F15 50%, #2A1510 100%)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient orb */}
      <Box
        sx={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,148,62,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,148,62,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Logo */}
      <Box sx={{ p: collapsed ? '20px 14px' : '24px 24px', display: 'flex', alignItems: 'center', gap: 1.5, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            minWidth: 42,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #C8943E 0%, #E5B86A 50%, #C8943E 100%)',
            backgroundSize: '200% 200%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(200, 148, 62, 0.35)',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'rotate(-5deg) scale(1.05)' },
          }}
        >
          <TreePine size={22} color="#fff" />
        </Box>
        {!collapsed && (
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
              TimberCraft
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Zap size={9} color="#C8943E" />
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                ERP Pro
              </Typography>
            </Box>
          </Box>
        )}
        {!collapsed && onMobileClose && (
          <IconButton onClick={onMobileClose} sx={{ color: 'rgba(255,255,255,0.5)', '&:hover': { color: '#fff' } }} size="small">
            <X size={18} />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: collapsed ? 1 : 2 }} />

      {/* Navigation */}
      <List sx={{ px: collapsed ? 1 : 1.5, mt: 1.5, flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
          return (
            <Tooltip key={item.id} title={collapsed ? item.label : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                sx={{
                  borderRadius: '12px',
                  mb: 0.5,
                  py: 1.2,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  backgroundColor: isActive ? 'rgba(200, 148, 62, 0.15)' : 'transparent',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': isActive ? {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '60%',
                    borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(180deg, #E5B86A, #C8943E)',
                  } : {},
                  '&:hover': {
                    backgroundColor: isActive
                      ? 'rgba(200, 148, 62, 0.2)'
                      : 'rgba(255,255,255,0.06)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    color: isActive ? '#E5B86A' : 'rgba(255,255,255,0.45)',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <Icon size={20} />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? '#E5B86A' : 'rgba(255,255,255,0.65)',
                          transition: 'color 0.2s ease',
                        },
                      },
                    }}
                  />
                )}
                {isActive && !collapsed && (
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #E5B86A, #C8943E)',
                      boxShadow: '0 0 8px rgba(200, 148, 62, 0.5)',
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: collapsed ? 1 : 2 }} />

      {/* Bottom section */}
      <Box sx={{ p: collapsed ? '12px' : '16px 20px' }}>
        <Tooltip title={collapsed ? 'Settings' : ''} placement="right" arrow>
          <ListItemButton
            sx={{
              borderRadius: '12px',
              py: 1,
              px: collapsed ? 1.5 : 2,
              justifyContent: collapsed ? 'center' : 'flex-start',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
              mb: 1,
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemIcon
              sx={{ minWidth: collapsed ? 0 : 40, color: 'rgba(255,255,255,0.35)', justifyContent: 'center' }}
            >
              <Settings size={18} />
            </ListItemIcon>
            {!collapsed && (
              <ListItemText
                primary="Settings"
                slotProps={{
                  primary: {
                    sx: { fontSize: '0.825rem', color: 'rgba(255,255,255,0.45)' },
                  },
                }}
              />
            )}
          </ListItemButton>
        </Tooltip>

        {!collapsed && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: '10px 12px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.04)',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderColor: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: '0.8rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #C8943E, #E5B86A)',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(200, 148, 62, 0.3)',
              }}
            >
              RS
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.2 }}>
                Rajitha Silva
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem' }}>
                Administrator
              </Typography>
            </Box>
            <Tooltip title="Sign out" arrow>
              <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.25)', '&:hover': { color: '#E5B86A' } }}>
                <LogOut size={15} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {/* Collapse toggle - only desktop */}
      {!onMobileClose && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              color: 'rgba(255,255,255,0.35)',
              '&:hover': { color: 'rgba(255,255,255,0.7)', backgroundColor: 'rgba(255,255,255,0.06)' },
              transition: 'all 0.2s ease',
            }}
            size="small"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Drawer
        open={mobileOpen}
        onClose={onMobileClose}
        sx={{
          '& .MuiDrawer-paper': {
            border: 'none',
            width: 264,
            background: 'transparent',
          },
        }}
      >
        <SidebarContent
          collapsed={false}
          setCollapsed={() => {}}
          onMobileClose={onMobileClose}
        />
      </Drawer>
    );
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100,
        flexShrink: 0,
      }}
    >
      <SidebarContent
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
    </Box>
  );
}
