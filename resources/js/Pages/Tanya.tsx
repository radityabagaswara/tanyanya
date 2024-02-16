import TanyaForm from '@/Components/tanya/TanyaForm';
import TanyaProfile from '@/Components/tanya/TanyaProfile';
import MainLayout from '@/Layouts/MainLayout';
import { Auth } from '@/types';
import {
  Button,
  Card,
  Divider,
  Overlay,
  Switch,
  Textarea,
  Tooltip,
} from '@mantine/core';

import React from 'react';

interface Props {
  page: any;
  auth: Auth;
}

const TanyaPage = ({ page, auth }: Props) => {
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(true);
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <TanyaProfile page={page} />
        <div className="mt-8 ">
          <TanyaForm page={page} />
        </div>
      </div>
    </MainLayout>
  );
};

export default TanyaPage;
