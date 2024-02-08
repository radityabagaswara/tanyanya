import useTypedPage from '@/Hooks/useTypedPage';
import MainLayout from '@/Layouts/MainLayout';
import { Button, Image } from '@mantine/core';
import React from 'react';

const Welcome = () => {
  const page = useTypedPage();

  console.log(page.props.auth.user);
  return (
    <MainLayout>
      <div className="min-h-[80vh] lg:min-h-max grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center gap-1">
          <h4 className="text-center lg:text-left text-tanya-pink-3 text-lg lg:text-2xl font-semibold tracking-wider">
            Tanyanya.id{' '}
            <span className="text-sm font-normal text-black">
              by Karya Mimpi Realita
            </span>
          </h4>
          <h1 className="text-center lg:text-left text-5xl lg:text-6xl font-semibold tracking-wide ">
            Get <span className="text-tanya-pink-3">Anonymous</span> Questions
            From Your Audience!
          </h1>
          <div className="text-center lg:text-left mt-4">
            <Button size="md" radius={'xl'}>
              Start Getting Question
            </Button>
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-5">
          <Image src="https://velcro.is3.cloudhost.id/HEADER.png" />
        </div>
      </div>
    </MainLayout>
  );
};

export default Welcome;
