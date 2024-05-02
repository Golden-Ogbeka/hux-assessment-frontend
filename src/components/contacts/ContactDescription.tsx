'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LoadingIndicator from '@/common/LoadingIndicator';
import { sendCatchFeedback, sendFeedback } from '@/functions/feedback';
import { ContactType } from '@/types/contact';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ContactDescription = () => {
  const params = useSearchParams();
  const contactId = params.get('contact');
  const [data, setData] = useState<ContactType | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this contact')) {
      try {
        setLoading(true);
        await appAxios.delete('/contact/' + contactId);
        router.push('/user/contacts');
        sendFeedback('Contact Deleted', 'success');
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <div className='flex flex-wrap justify-between items-center gap-5 mb-10'>
        <h1 className='text-[#323A46] text-xl md:text-2xl font-semibold'>
          Contact Details
        </h1>
        {data && (
          <div className='flex items-center gap-3'>
            <Link href={`/user/edit-contact/?contact=${data._id}`}>
              <Button variant='outlined'>Edit</Button>
            </Link>
            <Button
              variant='outlined'
              className='!border-error hover:!bg-error !text-error hover:!text-white'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      {loading ? (
        <LoadingIndicator />
      ) : data ? (
        <div className='text-lg flex flex-col gap-5'>
          <p>
            <b>First Name: </b>
            {data.firstName}
          </p>
          <p>
            <b>Last Name: </b>
            {data.lastName}
          </p>
          <p>
            <b>Phone Number: </b>
            {data.phoneNumber}
          </p>
          <p>
            <b>Date Created: </b>
            {new Date(data.createdAt).toDateString()}
          </p>
        </div>
      ) : (
        <>Contact not found</>
      )}
    </div>
  );
};

export default ContactDescription;
