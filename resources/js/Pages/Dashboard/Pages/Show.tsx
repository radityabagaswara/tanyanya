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
  const handleFormSubmit = (e: InertiaFormProps<any>) => {
    e.post('/dashboard/page');
  };

  return <EditPageForm page={page} onSubmit={handleFormSubmit} />;
};

export default ShowPage;
