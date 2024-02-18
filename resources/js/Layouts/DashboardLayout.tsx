import FlashMessage from '@/Components/FlashMessage';
import { DashboardSidebar } from '@/Components/navigation/DashboardSidebar';
import { usePage } from '@inertiajs/react';
import { ActionIcon, Burger, LoadingOverlay, Space } from '@mantine/core';
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
  loading?: boolean;
}

const DashboardLayout = ({ children, title, loading }: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [opened, { open, close, toggle }] = useDisclosure();
  const { width } = useViewportSize();
  const { errors, success }: any = usePage().props;

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
      close();
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    if (errors.error) {
      notifications.show({
        message: errors.error,
        color: 'red',
        title: 'There was an error while processing your request!',
      });
    }

    if (success) {
      notifications.show({
        title: success.title as string,
        message: success.message as string,
        color: 'green',
      });
    }
  }, [errors, success]);

  return (
    <>
      <LoadingOverlay visible={loading} />
      <FlashMessage />
      {isMobile ? (
        <div
          className={`fixed top-5 z-40 transition-all ${
            opened ? 'left-[19rem]' : 'left-5'
          }`}
        >
          <ActionIcon radius={'xl'} size={'xl'}>
            <Burger
              opened={opened}
              onClick={toggle}
              size={'md'}
              color="white"
            />
          </ActionIcon>
        </div>
      ) : null}
      <div
        className={`fixed transition-all z-50 ${
          isMobile && !opened
            ? '-left-[300px]'
            : isMobile && opened
            ? 'left-0'
            : 'left-0'
        }`}
      >
        <DashboardSidebar />
      </div>
      <div
        className={`${
          isMobile && !opened ? 'pl-8' : isMobile && opened ? 'pl-8' : 'pl-80'
        }  pr-8 py-8 bg-white min-h-screen`}
      >
        {title ? (
          <>
            <h1 className="text-xl font-semibold">{title}</h1>
            <Space h="md" />{' '}
          </>
        ) : null}
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
