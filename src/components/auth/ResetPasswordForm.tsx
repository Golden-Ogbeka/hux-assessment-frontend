'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LabelInput from '@/common/LabelInput';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import * as yup from 'yup';

const ResetPasswordForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const param = useSearchParams();
  const searchEmail = param.get('email');
  const searchCode = param.get('verificationCode');

  const formik = useFormik({
    initialValues: {
      email: searchEmail,
      password: '',
      confirmPassword: '',
      verificationCode: searchCode,
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      // email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      confirmPassword: yup
        .string()
        .required('Enter your password again')
        .oneOf([yup.ref('password'), ''], 'The password you entered does not match'),
      verificationCode: yup.string().required('Verification code is required'),
    }),
    enableReinitialize: true,
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/user/reset-password/update', {
        email: formik.values.email,
        newPassword: formik.values.password,
        verificationCode: formik.values.verificationCode,
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();

      router.push('/auth/login');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-semibold text-2xl md:text-[32px] mb-1'>Reset Password</h1>
      <p className='mb-10 text-[#828282]'>
        Enter your new password and the verification code you received in your email
      </p>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-8'
          disabled
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className='mb-8'
        />
        <LabelInput
          formik={formik}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          className='mb-8'
        />
        <LabelInput
          formik={formik}
          name='verificationCode'
          label='Verification Code'
          className='mb-[66px]'
        />

        <Button type='submit' loading={loading} className='w-full'>
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
