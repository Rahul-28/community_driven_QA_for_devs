import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Home, AccountCircle, BarChart, QuestionAnswer, Forum } from '@mui/icons-material';
import{ InputBase,
  createTheme,ThemeProvider,Button,
} from '@mui/material';
import { Search, ExitToApp, Brightness4, Brightness7, Person as PersonIcon } from '@mui/icons-material'; // Import MenuIcon

const drawerWidth = 240;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    color:'azure'
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function MiniDrawer(  onClose) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(false);
  const [theme, setTheme] = useState('light');
  const isLoggedin = () => {
    if (localStorage.getItem('username') !== null) {
      setLoginStatus(true);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('since');
    localStorage.removeItem('Usertype');
  
    setLoginStatus(false);
    navigate('/');
  };
  
  const searchQuestion = async (e) => {
    e.preventDefault();
    const que = document.getElementById('searchQue').value;
  
    await fetch(`http://localhost:5000/api/question/search?keyword=${que}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((questions) => {
        navigate('/search', { state: questions });
      });
  };
  
  useEffect(() => {
    isLoggedin();
  }, [loginStatus]);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{background:'#721d8a'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          <Link to="/">
              <img src={require('../../Assets/logo.png')} height="30" width="160" alt="image" />
            </Link>
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
            <form onSubmit={searchQuestion}>
              <InputBase id="searchQue" placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
              <IconButton type="submit" aria-label="search">
                <Search />
              </IconButton>
            </form>
            <List component="nav" aria-label="main mailbox folders" style={{ display: 'flex' }}>
              {loginStatus === true ? (
                <ListItem>
                  <Button variant="contained" color="primary" onClick={logout} startIcon={<ExitToApp />}>
                    Logout
                  </Button>
                </ListItem>
              ) : (
                <ListItem>
                  <NavLink to="/login" style={{ color: 'black', textDecoration: 'none' }}>
                    <Button variant="contained" color="primary" startIcon={<PersonIcon />}>
                      <Typography>Login</Typography>
                    </Button>
                  </NavLink>
                </ListItem>
              )}
            </List>

            <IconButton onClick={toggleTheme} color="inherit">
              {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} <img src={require('../../Assets/icon.png')} height="30" width="60" alt="image" />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
        <ListItem component={NavLink} to="/" onClick={onClose}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem component={NavLink} to="/tags" onClick={onClose}>
          <ListItemIcon>
            <Forum />
          </ListItemIcon>
          <ListItemText primary="Tags" />
        </ListItem>

        <ListItem component={NavLink} to="/profile" onClick={onClose}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>

       

        { loginStatus && (
          <>
            <ListItem component={NavLink} to="/analysis" onClick={onClose}>
              <ListItemIcon>
                <BarChart />
              </ListItemIcon>
              <ListItemText primary="Analysis" />
            </ListItem>

            <ListItem component={NavLink} to="/myquestions" onClick={onClose}>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItem>

            <ListItem component={NavLink} to="/myanswers" onClick={onClose}>
              <ListItemIcon>
                <Forum />
              </ListItemIcon>
              <ListItemText primary="Answers" />
            </ListItem>
          </>
        )}
      </List>
       
      
       
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
    </ThemeProvider>
  );
}