'use client';

import { appAxios } from '@/api/axios';
import Button from '@/common/Button/Button';
import LoadingIndicator from '@/common/LoadingIndicator';
import { sendCatchFeedback } from '@/functions/feedback';
import { ContactType } from '@/types/contact';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ContactList = () => {
  const [data, setData] = useState<ContactType[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await appAxios.get('/contact');
        setData(response.data.data);
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
        <h1 className='text-[#323A46] text-xl md:text-2xl font-semibold'>
          Your contacts
        </h1>

        <Link href='/user/new-contact'>
          <Button>Add Contact</Button>
        </Link>
      </div>

      <div className='w-full flex flex-col gap-6'>
        {loading ? (
          <LoadingIndicator />
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <button
              key={item._id}
              className='w-full shadow rounded-md bg-white flex p-4 cursor-pointer hover:bg-primaryDark hover:text-white duration-300 flex-col'
              onClick={() => router.push(`/user/view-contact/?contact=${item._id}`)}
            >
              <span>First name: {item.firstName}</span>
              <span>Last name: {item.lastName}</span>
              <span>Phone number: {item.phoneNumber}</span>
            </button>
          ))
        ) : (
          <p className='text-sm'>No contact found</p>
        )}
      </div>
    </div>
  );
};

export default ContactList;
