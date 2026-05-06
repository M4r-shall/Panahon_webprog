import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme, alpha, ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, InputBase } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

// --- Tactical Dark Theme ---
const tacticalTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0f0103',
      paper: '#1a0205',
    },
    primary: { main: '#730c1e' },
    text: { primary: '#ffffff', secondary: '#a3a3a3' },
    divider: '#480415',
  },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: '#1a0205', border: '1px solid #480415' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', backgroundColor: '#1a0205', border: '1px solid #480415' } } },
    MuiDataGrid: {
      styleOverrides: {
        root: { border: 'none', color: '#fff' },
        cell: { borderBottom: '1px solid #480415' },
        columnHeaders: { borderBottom: '2px solid #480415', backgroundColor: '#210207' },
        footerContainer: { borderTop: '1px solid #480415' }
      }
    }
  }
});

const drawerWidth = 260;

const navItems = [
  { label: 'Tactical Hub', to: '/dashboard', icon: DashboardIcon },
  { label: 'War Reports', to: '/dashboard/reports', icon: AssessmentIcon },
  { label: 'Demigod Roster', to: '/dashboard/users', icon: PeopleIcon },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
  overflowX: 'hidden',
  backgroundColor: '#1a0205', 
  borderRight: '1px solid #480415',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  backgroundColor: '#1a0205',
  borderRight: '1px solid #480415',
  [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(9)} + 1px)` },
});

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#210207',
  borderBottom: '1px solid #480415',
  boxShadow: 'none',
  transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) }),
  ...(!open && { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: theme.spacing(0, 1), ...theme.mixins.toolbar }));

const Search = styled('div')(({ theme }) => ({
  position: 'relative', borderRadius: '20px', backgroundColor: alpha('#fff', 0.05),
  '&:hover': { backgroundColor: alpha('#fff', 0.1) },
  marginRight: theme.spacing(2), width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)})`, width: '100%',
    [theme.breakpoints.up('md')]: { width: '25ch' },
  },
}));

const DashLayout = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={tacticalTheme}>
      {/* 🚨 THE FIX: Added position: 'absolute', top: 0, left: 0, right: 0 to break out of the Vite box 🚨 */}
      <Box sx={{ display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: '#0f0103', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton color="inherit" onClick={() => setOpen(!open)} edge="start" sx={{ mr: 2 }}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, letterSpacing: 2, fontWeight: 'bold', color: '#730c1e' }}>
              CAMP HALF-BLOOD OS
            </Typography>
            <Search>
              <Box sx={{ position: 'absolute', height: '100%', display: 'flex', alignItems: 'center', pl: 2, pointerEvents: 'none' }}>
                <SearchIcon sx={{ color: '#730c1e' }} />
              </Box>
              <StyledInputBase placeholder="Search Ranks..." />
            </Search>
            <Button variant="contained" startIcon={<LogoutIcon />} onClick={() => navigate('/')} sx={{ bgcolor: '#730c1e', '&:hover': { bgcolor: '#480415' } }}>
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <Typography variant="caption" sx={{ color: '#730c1e', fontWeight: 'bold', mr: 'auto', ml: 2 }}>NAVIGATION</Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: '#730c1e' }}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ borderColor: '#480415' }} />
          <List>
            {navItems.map(({ label, to, icon: Icon }) => (
              <ListItem key={to} disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to={to} selected={location.pathname === to} sx={{ minHeight: 56, justifyContent: open ? 'initial' : 'center', px: 2.5, '&.Mui-selected': { backgroundColor: alpha('#730c1e', 0.2), borderRight: '3px solid #730c1e' } }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: location.pathname === to ? '#ef4444' : '#666' }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} sx={{ opacity: open ? 1 : 0, '& span': { fontWeight: location.pathname === to ? 'bold' : 'normal', color: 'white' } }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Ensure the main content area can grow and stretch properly */}
        <Box component="main" sx={{ flexGrow: 1, p: 4, width: '100%', overflowX: 'hidden' }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashLayout;