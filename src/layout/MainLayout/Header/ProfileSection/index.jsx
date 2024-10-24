import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Popper, Paper, List, ListItemButton, ListItemText, ListItemIcon, ClickAwayListener } from '@mui/material';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import MeetingRoomTwoToneIcon from '@mui/icons-material/MeetingRoomTwoTone';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 1) {
      navigate('/profile'); 
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://3wzg6m6x-5000.asse.devtunnels.ms/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('token') || '' // Ensure there's a default value
        }
      });
      
      console.log('Logout response:', response); // Log response for debugging
  
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/application/login');
      } else {
        console.error('Logout failed with status:', response.status); // Log the status if not okay
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };
  

  return (
    <>
      <Button
        sx={{ minWidth: { sm: 50, xs: 35 } }}
        ref={anchorRef} 
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Profile"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleTwoToneIcon sx={{ fontSize: '1.5rem' }} />
      </Button>
      
      {/* Popper untuk dropdown */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14], 
            },
          },
        ]}
        style={{ zIndex: theme.zIndex.modal }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <List sx={{ width: 250, bgcolor: theme.palette.background.paper }}>
              <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                <ListItemIcon>
                  <SettingsTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                <ListItemIcon>
                  <PersonTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
                <ListItemIcon>
                  <MeetingRoomTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default ProfileSection;
