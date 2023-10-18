import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Login from '../Login/Login';

function ProtectedRoute({ element, ...rest }) {
//   item = sessionStorage.getItem('authenticated');
  return Login.isAuthenticated(true) ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;