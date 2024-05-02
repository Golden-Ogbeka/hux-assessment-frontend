'use client';

import { sendFeedback } from '@/functions/feedback';
import { getUserSession } from '@/functions/userSession';

import { updateUser } from '@/store/features/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UserType } from '@/types/user';
import { redirect } from 'next/navigation';
import React from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const checkSession = () => {
      const sessionDetails = getUserSession();
      if (user || sessionDetails) {
        dispatch(updateUser({ user: user || (sessionDetails as UserType) }));
      } else {
        sendFeedback('Login to continue', 'error');

        redirect('/');
      }
    };
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children as any;
};

export default PrivateRoute;
