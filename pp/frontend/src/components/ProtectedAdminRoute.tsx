import React from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface ProtectedAdminRouteProps {
  user: User | null;
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ user, children }: ProtectedAdminRouteProps) {
  // Check if user is logged in and is an admin
  const isAdmin = user && user.role === 'admin';
  const isAdminToken = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin && !isAdminToken) {
    // Redirect to admin login if not authenticated as admin
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
} 