'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LabelInput from '@/common/LabelInput';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

const NewContactForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    }),
    enableReinitialize: true,
  });
  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('/contact', {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phoneNumber: formik.values.phoneNumber,
      });
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
    <div>
      <div className='flex flex-wrap justify-between items-center gap-5 mb-10'>
        <h1 className='text-[#323A46] text-xl md:text-2xl font-semibold'>
          Add new contact
        </h1>

        <Link href='/user/contacts'>
          <Button variant='outlined'>Back</Button>
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit} className='w-full '>
        <LabelInput
          formik={formik}
          name='firstName'
          label='First Name'
          type='firstName'
          className='mb-6'
        />
        <LabelInput formik={formik} name='lastName' label='Last Name' className='mb-4' />
        <LabelInput
          formik={formik}
          name='phoneNumber'
          label='Phone Number'
          type='tel'
          className='mb-6'
        />

        <Button type='submit' loading={loading} className='w-full mt-[38px]'>
          Create Contact
        </Button>
      </form>
    </div>
  );
};

export default NewContactForm;
