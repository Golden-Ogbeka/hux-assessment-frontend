'use client';

import Button from '@/common/Button/Button';
import { sendFeedback } from '@/functions/feedback';
import { signOut } from '@/store/features/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(signOut());
    router.push('/');
    sendFeedback('User signed out', 'success');
  };

  return (
    <nav className='w-full bg-white shadow-md h-20'>
      <div className='w-full items-center flex justify-between px-primary h-full'>
        {/* Logo */}
        <Link href={user ? '/user/contacts' : '/'} className='text-3xl font-extrabold'>
          Contact
        </Link>

        {/* Button */}
        {user ? (
          <div className='flex items-center gap-5'>
            <span className='text-lg font-bold text-black'>{user.fullName}</span>
            <Button variant='outlined' onClick={logoutUser}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-5'>
            <Link href='/auth/login'>
              <Button variant='contained'>Login</Button>
            </Link>
            <Link href='/auth/register'>
              <Button variant='contained'>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
