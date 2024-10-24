// src/routes/AuthenticationRoutes.jsx
import React, { lazy } from 'react';
import PublicRoute from './PublicRoute';

const AuthLogin = lazy(() => import('../views/Login'));
// const AuthRegister = lazy(() => import('../views/Register'));

const AuthenticationRoutes = {
  path: '/application',
  element: <PublicRoute />, // Proteksi rute login & register dengan PublicRoute
  children: [
    { path: 'login', element: <AuthLogin /> },
    // { path: 'register', element: <AuthRegister /> }
  ]
};

export default AuthenticationRoutes;
