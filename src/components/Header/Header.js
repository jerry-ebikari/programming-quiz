import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css'
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { navbarItems } from '../constants/navbarItems';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({toggleDrawer, isDrawerOpen}) {
  const navItems = navbarItems;
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname.split('/').slice(-1)[0];
  return (
    <AppBar
      sx={{
        backgroundColor: 'var(--primary-color)',
        height: '60px',
        display: 'flex',
        justifyContent: 'center'
      }}
      position="fixed">
      {ReactDOM.createPortal(
        <div className='menu-button'>
            <IconButton onClick={toggleDrawer} sx={{color: 'var(--white)'}}>
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
        </div>,
        document.getElementById('root')
      )}
      <p className="logo">EJ</p>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <div>
            {navItems.map((item) => (
              <Button
                key={item.id}
                sx={{ 
                  color: path == item.route ? '#fff' : 'var(--white)',
                  backgroundColor: path == item.route ? 'rgba(255, 255, 255, 0.4) !important' : 'transparent'
                }}
                onClick={() => navigate(item.route)}>
                <Typography variant='body1'>
                  {item.label}
                </Typography>
              </Button>
            ))}
          </div>
          </Box>
    </AppBar>
  )
}

export default Header