import ProtectedRoute from '@/components/auth/routeChecker/ProtectedRoute';
import React from 'react';

const AuthRootLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AuthRootLayout;
