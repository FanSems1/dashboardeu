import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/social-google.svg';
import { useNavigate } from 'react-router-dom';

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token,
    };
  }

  const response = await fetch(url, options);
  if (response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/application/login';
    return null;
  }

  return response;
};

const AuthLogin = ({ ...rest }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await apiFetch('https://3wzg6m6x-5000.asse.devtunnels.ms/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response && response.ok) {
        const data = await response.json();
        localStorage.setItem('token', `Bearer ${data.token}`);
        localStorage.setItem('user', JSON.stringify({ email: values.email }));
        navigate('/dashboard');
      } else {
        setErrors({ submit: 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to connect to the server. Please try again later.' });
    }
    setSubmitting(false);
  };

  // Handle token and user extraction from URL parameters after SSO redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log('Search Params:', params.toString());
    const token = params.get('token');
    const userParam = params.get('user');

    if (token && userParam) {
        try {
            const userData = JSON.parse(decodeURIComponent(userParam));
            const user = userData.user;

            console.log('Token:', token); // Cek nilai token
            console.log('User Param:', userParam); // Cek nilai userParam

            if (user && user.id && user.username) {
                localStorage.setItem('token', `Bearer ${token}`);
                localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username }));
                console.log('User authenticated, navigating to dashboard...');
                navigate('/dashboard');
            } else { 
                setErrorMessage('Incomplete user data.'); // Set error message for incomplete user data
                console.error('Incomplete user data:', userData);
            }
        } catch (error) {
            setErrorMessage('Error parsing user data.'); // Set error message for parsing error
            console.error('Error parsing user data:', error);
        }
    } else {
        setErrorMessage('Missing token or user data in redirect URL'); // Set error message for missing data
        console.error('Missing token or user data in redirect URL');
    }
  }, [navigate]);

  // Redirect to SSO login
  const redirectToSSO = () => {
    const redirectUri = encodeURIComponent('http://localhost:5000/dashboard');
    window.location.href = `https://3wzg6m6x-3000.asse.devtunnels.ms/?redirect_uri=${redirectUri}`;    
  };

  return (
    <>
      {errorMessage && (
        <Box mb={2}>
          <FormHelperText error>{errorMessage}</FormHelperText> {/* Show error message */}
        </Box>
      )}
      
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            fullWidth
            sx={{
              fontSize: { md: '1rem', xs: '0.875rem' },
              fontWeight: 500,
              backgroundColor: theme.palette.grey[50],
              color: theme.palette.grey[600],
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
              },
            }}
            size="large"
            variant="contained"
          >
            <img
              src={Google}
              alt="google"
              width="20px"
              style={{ marginRight: '16px' }}
            />
            Sign in with Google
          </Button>
        </Grid>
      </Grid>

      <Box alignItems="center" display="flex" mt={2}>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        <Typography color="textSecondary" variant="h5" sx={{ m: theme.spacing(2) }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
      </Box>

      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...rest}>
            <TextField
              error={Boolean(touched.email && errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
              variant="outlined"
            />

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mt: theme.spacing(3), mb: theme.spacing(1) }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="subtitle2" color="primary" sx={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Typography>
              </Grid>
            </Grid>

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box mt={2}>
              <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Log In
              </Button>
            </Box>

            {/* SSO Login Button */}
            <Box mt={2}>
              <Button
                fullWidth
                onClick={redirectToSSO}
                sx={{
                  fontSize: { md: '1rem', xs: '0.875rem' },
                  fontWeight: 500,
                  backgroundColor: theme.palette.grey[50],
                  color: theme.palette.grey[600],
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100],
                  },
                }}
                size="large"
                variant="contained"
              >
                Sign in with SSO
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
