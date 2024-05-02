import ToastProvider from '@/common/ToastProvider';
import AppLayout from '@/components/layout';
import GetUserSession from '@/components/layout/GetUserSession';
import { Providers } from '@/store/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-primary' });

export const metadata: Metadata = {
  title: 'Contact App',
  description: 'Store and Track Contacts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${inter.className}`}>
      <body>
        <Providers>
          <ToastProvider>
            <GetUserSession />
            <AppLayout>{children}</AppLayout>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
