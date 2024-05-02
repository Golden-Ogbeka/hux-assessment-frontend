'use client';

import { sendFeedback } from '@/functions/feedback';
import { getSessionDetails } from '@/functions/userSession';
import { useAppSelector } from '@/store/hooks';
import { redirect } from 'next/navigation';
import React from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const sessionDetails = getSessionDetails();
    if (user || sessionDetails) {
      sendFeedback('You are already logged in');
      redirect('/dashboard/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children as any;
};

export default ProtectedRoute;
