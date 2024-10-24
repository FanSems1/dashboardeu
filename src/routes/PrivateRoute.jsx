// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Ambil token dari localStorage

  // Jika tidak ada token, arahkan ke halaman login
  if (!token) {
    return <Navigate to="/application/login" />;
  }

  // Jika ada token, tampilkan anak komponen
  return children;
};

export default PrivateRoute;