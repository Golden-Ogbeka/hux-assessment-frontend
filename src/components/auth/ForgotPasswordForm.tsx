'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LabelInput from '@/common/LabelInput';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import * as yup from 'yup';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
    }),
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/user/reset-password', {
        email: formik.values.email,
      });
      sendFeedback(response.data?.message, 'success');
      router.push(`/auth/reset-password/?email=${formik.values.email}`);
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-semibold text-2xl md:text-[32px] mb-1'>Forgot Password?</h1>
      <p className='mb-10 text-[#828282]'>
        Enter your registered email to continue we&apos;ll send you a verification code to
        reset your password.
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-10'
        />

        <Button type='submit' loading={loading} className='w-full mb-10'>
          Send Verification Code
        </Button>
        <div className='text-center'>
          <Link href='/auth/login' className='text-primary'>
            Back to login
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
