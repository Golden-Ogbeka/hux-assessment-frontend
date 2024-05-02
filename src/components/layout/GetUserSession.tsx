'use client';

import { getSessionDetails } from '@/functions/userSession';
import { updateUser } from '@/store/features/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { UserType } from '@/types/user';
import React from 'react';

const GetUserSession = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    const sessionDetails = getSessionDetails();
    if (user || sessionDetails) {
      dispatch(updateUser({ user: user || (sessionDetails as UserType) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default GetUserSession;
