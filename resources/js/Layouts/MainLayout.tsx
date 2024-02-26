import { HomeNavBar } from '@/Components/navigation/HomeNavbar';
import { LoadingOverlay } from '@mantine/core';
import React from 'react';

interface props {
  children: React.ReactNode;
  className?: string;
  withContainer?: boolean;
  loading?: boolean;
}

const MainLayout = ({
  children,
  withContainer = true,
  className,
  loading = false,
}: props) => {
  return (
    <>
      <LoadingOverlay visible={loading} />
      <HomeNavBar />
      <div className="bg-gray-50">
        <main
          className={`mt-8 ${
            withContainer ? 'container px-4 mx-auto' : ''
          } ${className} `}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
