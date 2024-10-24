import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  IconButton,
  useTheme,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ProfilePage = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual token key
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode the token
      setName(userData.username); // Assuming 'username' is the field in your token
      setEmail(userData.email); // Assuming 'email' is the field in your token
    }
  }, []);

  const handleSave = () => {
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handlePasswordChange = () => {
    setSnackbarMessage('Password changed successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ padding: theme.spacing(3) }}>
      <Grid item xs={12} md={8}>
        {/* Profile Card */}
        <div sx={{ padding: theme.spacing(3), borderRadius: '12px', boxShadow: 3 }}>
          <CardHeader
            title="Profile Information"
            titleTypographyProps={{ variant: 'h4', fontWeight: 'bold' }}
            action={
              <IconButton component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePictureChange}
                />
                <PhotoCamera color="primary" />
              </IconButton>
            }
            sx={{ backgroundColor: theme.palette.primary.light, color: '#fff', borderRadius: '10px 10px 0 0' }}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <Avatar
                  alt="Profile Picture"
                  src={profilePicture || 'https://via.placeholder.com/150'}
                  sx={{ width: 150, height: 150, margin: 'auto', border: `4px solid ${theme.palette.primary.main}` }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  InputProps={{
                    readOnly: true, // Make the field read-only
                  }}
                  sx={{ borderRadius: '8px' }}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  InputProps={{
                    readOnly: true, // Make the field read-only
                  }}
                  InputLabelProps={{
                    shrink: true, // Ensure the label is always shown
                  }}
                  sx={{ borderRadius: '8px' }}
                />

              </Grid>
            </Grid>
          </CardContent>
        </div>

        {/* Change Password Card */}
        <div sx={{ mt: 4, padding: theme.spacing(3), borderRadius: '12px', boxShadow: 3 }}>
          <CardHeader title="Change Password" titleTypographyProps={{ variant: 'h4', fontWeight: 'bold' }} />
          <Divider />
          <CardContent>
            <TextField
              label="New Password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ borderRadius: '8px' }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)} // Toggle the visibility state
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2, borderRadius: '8px' }}>
                  Change Password
                </Button>
          </CardContent>
        </div>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProfilePage;
