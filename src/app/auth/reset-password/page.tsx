import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Password Reset',
  robots: {
    index: false,
  },
};

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
