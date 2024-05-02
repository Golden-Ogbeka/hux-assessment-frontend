import PrivateRoute from '@/components/auth/routeChecker/PrivateRoute';
import React from 'react';

const UserRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return <PrivateRoute>{children}</PrivateRoute>;
};

export default UserRouteLayout;
