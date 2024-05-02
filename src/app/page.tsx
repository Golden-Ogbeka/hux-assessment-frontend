import Button from '@/common/Button/Button';
import ProtectedRoute from '@/components/auth/routeChecker/ProtectedRoute';
import Link from 'next/link';

export default function Home() {
  return (
    <ProtectedRoute>
      <h1 className='font-bold text-5xl mb-2'>Welcome to Contact</h1>
      <p className='text-lg font-medium mb-10'>
        It is an online directory for saving and managing your contacts
      </p>
      <Link href='/auth/login'>
        <Button>Login to begin</Button>
      </Link>
    </ProtectedRoute>
  );
}
