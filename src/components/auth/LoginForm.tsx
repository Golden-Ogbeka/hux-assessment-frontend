'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import LabelInput from '@/common/LabelInput';
import Button from '@/common/Button/Button';
import Link from 'next/link';
import { appAxios } from '@/api/axios';
import { signOut, updateToken, updateUser } from '@/store/features/user';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { UserType } from '@/types/user';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/auth/login', {
        email: formik.values.email,
        password: formik.values.password,
      });
      const userToken = response.data?.data;
      dispatch(updateToken({ token: userToken }));

      const accountResponse = await appAxios.get('/auth/profile');
      const accountInfo: UserType = accountResponse.data.data;
      dispatch(updateUser({ user: accountInfo }));

      // Check if account is verified
      if (!accountInfo.isVerified) {
        // Sign the user out so they can verify their email first
        dispatch(signOut());

        // Send verification code
        sendFeedback('Verify your account to continue', 'info');
        await appAxios.post('/auth/resend-code', {
          email: accountInfo.email,
        });
        return router.push('/auth/verify-email');
      }

      // Check if any of the account info is missing
      if (!accountInfo.goal || !accountInfo.school || !accountInfo.guardianFullName) {
        return router.push('/auth/account-info');
      }

      // Check if subscription is running
      if (!accountInfo.subscription?.running) {
        return router.push('/dashboard/account/?tab=2');
      }

      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      return router.push('/dashboard/home');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-semibold text-2xl md:text-[32px] mb-1'>Welcome back</h1>
      <div className='mb-10 text-[#A0ABBB] font-medium'>
        Don&apos;t have an account?{' '}
        <Link href='/auth/register' className=' text-primary'>
          Sign up
        </Link>
      </div>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-8'
        />
        <LabelInput formik={formik} name='password' label='Password' type='password' />
        <div className='mb-10 mt-[5px] text-right'>
          <Link href='/auth/forgot-password' className=' text-primary'>
            Forgot Password?
          </Link>
        </div>
        <Button type='submit' loading={loading} className='w-full'>
          Log in
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
