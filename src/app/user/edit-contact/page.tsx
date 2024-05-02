import EditContactForm from '@/components/contacts/EditContactForm';
import { Suspense } from 'react';

const EditContactPage = () => {
  return (
    <Suspense>
      <EditContactForm />
    </Suspense>
  );
};

export default EditContactPage;
