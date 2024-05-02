'use client';

import { sendFeedback } from '@/functions/feedback';
import { getUserSession } from '@/functions/userSession';
import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const checkSession = () => {
      const sessionDetails = getUserSession();
      if (user || sessionDetails) {
        sendFeedback('You are already logged in');
        redirect('/user/contacts');
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children as any;
};

export default ProtectedRoute;
