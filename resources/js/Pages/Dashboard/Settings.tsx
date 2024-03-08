import DashboardTabs from '@/Components/def_comp/DashboardTab';
import EditPageForm from '@/Components/dashboard/pages/forms/EditPageForm';
import ProfileForm from '@/Components/dashboard/profile/ProfileForm';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@inertiajs/core';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { Space, Tabs } from '@mantine/core';
import React, { useState } from 'react';
import route from 'ziggy-js';

interface Props extends PageProps {
  page: any;
  user: any;
}

const SettingsPage = ({ page, user }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleFormPageSubmit = (e: InertiaFormProps<any>) => {
    setLoading(true);
    e.post('/dashboard/page', {
      onFinish: () => setLoading(false),
    });
  };

  const handleFormProfileSubmit = (e: InertiaFormProps<any>) => {
    setLoading(true);
    e.post(route('dashboard.profile.update'), {
      onFinish: () => setLoading(false),
    });
  };

  return (
    <DashboardLayout title="Settings" loading={loading}>
      <DashboardTabs
        tabs={[
          {
            name: 'Profile',
            key: 'profile',
            content: (
              <ProfileForm user={user} onSubmit={handleFormProfileSubmit} />
            ),
          },
          {
            name: 'Page',
            key: 'page',
            content: (
              <EditPageForm page={page} onSubmit={handleFormPageSubmit} />
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export default SettingsPage;
