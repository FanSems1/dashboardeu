// src/routes/PublicRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = localStorage.getItem('token');

  // Jika ada token, arahkan ke halaman dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika tidak ada token, render halaman login atau register
  return <Outlet />;
};

export default PublicRoute;
