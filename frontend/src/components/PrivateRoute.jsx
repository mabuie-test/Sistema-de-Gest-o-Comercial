import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../services/authService';

function PrivateRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;

