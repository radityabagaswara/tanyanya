import DashboardLayout from '@/Layouts/DashboardLayout';
import { Card } from '@mantine/core';
import React from 'react';

const UserProfile = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-5">Your Profile</h1>
      <Card withBorder bg={'white'} radius={'md'}>
        <Card.Section></Card.Section>
      </Card>
    </DashboardLayout>
  );
};

export default UserProfile;
