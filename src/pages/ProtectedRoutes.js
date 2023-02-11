import React from 'react';
import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
const ProtectedRoutes = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    console.log('no user found in the context');
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoutes;
