import ContactDescription from '@/components/contacts/ContactDescription';
import { Suspense } from 'react';

const ViewContactPage = () => {
  return (
    <Suspense>
      <ContactDescription />
    </Suspense>
  );
};

export default ViewContactPage;
