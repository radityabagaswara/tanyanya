import { HomeNavBar } from '@/Components/navigation/HomeNavbar';
import React from 'react';

interface props {
  children: React.ReactNode;
  className?: string;
  withContainer?: boolean;
}

const MainLayout = ({ children, withContainer = true, className }: props) => {
  return (
    <>
      <HomeNavBar />
      <main
        className={`mt-8 ${
          withContainer ? 'container px-4 mx-auto' : ''
        } ${className}`}
      >
        {children}
      </main>
    </>
  );
};

export default MainLayout;
