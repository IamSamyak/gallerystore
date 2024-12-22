// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect the route
const PrivateRoute = ({ children }) => {
  const isAdminLoggedIn = sessionStorage.getItem('isAdminLoggedIn');

  // If user is authenticated, render the element, else redirect to login
  return (
    isAdminLoggedIn ? children : <Navigate to="/admin-login" />
  );
};

export default PrivateRoute;
