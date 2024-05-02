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

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      email: yup.string().email('Enter a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
      fullName: yup.string().required('Full name is required'),
    }),
    enableReinitialize: true,
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/user/register', {
        email: formik.values.email,
        password: formik.values.password,
        fullName: formik.values.fullName,
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      return router.push('/auth/login');
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='font-semibold text-2xl md:text-[32px] mb-1'>Create an account</h1>
      <div className='mb-10 text-[#828282] font-medium'>Let&apos;s get started</div>
      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput formik={formik} name='fullName' label='Full Name' className='mb-6' />
        <LabelInput
          formik={formik}
          name='email'
          label='Email'
          type='email'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='password'
          label='Password'
          type='password'
          className='mb-4'
        />

        <Button type='submit' loading={loading} className='w-full mt-[38px]'>
          Create account
        </Button>
        <div className='mt-6 text-[#A0ABBB] font-medium'>
          Already have an account?{' '}
          <Link href='/auth/login' className=' text-primary'>
            Log in
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
