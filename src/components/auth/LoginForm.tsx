'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LabelInput from '@/common/LabelInput';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { updateToken, updateUser } from '@/store/features/user';
import { useAppDispatch } from '@/store/hooks';
import { UserType } from '@/types/user';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as yup from 'yup';

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
      const response = await appAxios.post('/user/login', {
        email: formik.values.email,
        password: formik.values.password,
      });
      const userToken = response.data?.token;
      dispatch(updateToken({ token: userToken }));

      const accountInfo: UserType = response.data?.user;
      dispatch(updateUser({ user: accountInfo }));

      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      return router.push('/user/contacts');
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
