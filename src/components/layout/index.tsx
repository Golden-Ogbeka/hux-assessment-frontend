import React from 'react';
import Navbar from './Navbar';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className='min-h-screen p-10 px-primary'>{children}</main>
    </div>
  );
};

export default AppLayout;
