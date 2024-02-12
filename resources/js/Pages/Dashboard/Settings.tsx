import EditPageForm from '@/Components/dashboard/pages/forms/EditPageForm';
import ProfileForm from '@/Components/dashboard/profile/ProfileForm';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@inertiajs/core';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { Space, Tabs } from '@mantine/core';
import React from 'react';
import route from 'ziggy-js';

interface Props extends PageProps {
  page: any;
  user: any;
}

const SettingsPage = ({ page, user }: Props) => {
  const handleFormPageSubmit = (e: InertiaFormProps<any>) => {
    e.post('/dashboard/page');
  };

  const handleFormProfileSubmit = (e: InertiaFormProps<any>) => {
    console.log(e);
    e.post(route('dashboard.profile.update'));
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-semibold">Settings</h1>
      <Space h="md" />
      <Tabs variant="outline" radius={'md'} defaultValue={'profile'}>
        <Tabs.List>
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="page">Page</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile" className="py-4">
          <ProfileForm user={user} onSubmit={handleFormProfileSubmit} />
        </Tabs.Panel>
        <Tabs.Panel value="page" className="py-4">
          <EditPageForm page={page} onSubmit={handleFormPageSubmit} />
        </Tabs.Panel>
      </Tabs>
    </DashboardLayout>
  );
};

export default SettingsPage;
