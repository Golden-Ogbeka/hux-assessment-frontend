'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LabelInput from '@/common/LabelInput';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { ContactType } from '@/types/contact';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

const EditContactForm = () => {
  const params = useSearchParams();
  const contactId = params.get('contact');
  const [data, setData] = useState<ContactType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      phoneNumber: data?.phoneNumber || '',
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
      const response = await appAxios.patch('/contact/' + contactId, {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phoneNumber: formik.values.phoneNumber,
      });
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
      return router.push(`/user/view-contact/?contact=${contactId}`);
    } catch (error: any) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get('/contact/' + contactId);
        setData(response.data.contact);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center gap-5 mb-10'>
        <h1 className='text-[#323A46] text-xl md:text-2xl font-semibold'>Edit Contact</h1>
        <Link href={`/user/view-contact/?contact=${contactId}`}>
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

        <Button
          type='submit'
          disabled={loading}
          loading={loading}
          className='w-full mt-[38px]'
        >
          Update Contact
        </Button>
      </form>
    </div>
  );
};

export default EditContactForm;
