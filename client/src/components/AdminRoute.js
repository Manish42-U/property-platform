import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  console.log('AdminRoute - User:', user);
  console.log('AdminRoute - Loading:', loading);
  console.log('AdminRoute - User Role:', user?.role);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    console.log('User is not admin, role:', user.role);
    return <Navigate to="/" />;
  }

  console.log('Admin access granted');
  return children;
}

export default AdminRoute;