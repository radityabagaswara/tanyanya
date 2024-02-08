import EditPageForm from '@/Components/dashboard/pages/forms/EditPageForm';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { PageProps } from '@inertiajs/core';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { Card } from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import React, { useState } from 'react';

interface Props extends PageProps {
  page: any;
}

const ShowPage = ({ page }: Props) => {
  console.log(page);

  const handleFormSubmit = (e: InertiaFormProps<any>) => {
    e.post('/dashboard/page');
  };

  return (
    <DashboardLayout>
      <Card withBorder>
        <Card.Section p={'lg'}>
          <EditPageForm page={page} onSubmit={handleFormSubmit} />
        </Card.Section>
      </Card>
    </DashboardLayout>
  );
};

export default ShowPage;
