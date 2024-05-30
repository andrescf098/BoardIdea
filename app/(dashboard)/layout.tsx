'use client';
import { Authenticated, Unauthenticated } from 'convex/react';
import { Navbar } from './_components/Navbar';
import { OrgSidebar } from './_components/OrgSidebar';
import { Sidebar } from './_components/sidebar';
import { SignInButton, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isLoaded, userId } = useAuth();
  useEffect(() => {
    if (isLoaded && !userId) {
      document.getElementById('sign-in-button')?.click();
    }
  }, [isLoaded, userId]);
  return (
    <main className='h-full'>
      <Unauthenticated>
        <SignInButton mode='redirect'>
          <button id='sign-in-button'></button>
        </SignInButton>
      </Unauthenticated>
      <Authenticated>
        <Sidebar />
        <div className='pl-[60px] h-full'>
          <div className='flex gap-x-3 h-full'>
            <OrgSidebar />
            <div className='h-full flex-1'>
              <Navbar />
              {children}
            </div>
          </div>
        </div>
      </Authenticated>
    </main>
  );
};
export default DashboardLayout;
