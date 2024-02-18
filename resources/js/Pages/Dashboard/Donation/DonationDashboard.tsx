import DashboardTabs from '@/Components/DashboardTab';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';
import DonationList from './DonationList';
import { Card } from '@mantine/core';

interface Props {
  donation: any;
}

const DonationDashboard = ({ donation }: Props) => {
  return (
    <DashboardLayout title="Donations">
      <DashboardTabs
        tabs={[
          {
            name: 'Donations',
            key: 'donations',
            content: (
              <Card withBorder radius={'lg'}>
                <DonationList />
              </Card>
            ),
          },
          {
            name: 'Donation Requests',
            key: 'donation-requests',
            content: (
              <div>
                <h1>Donation Requests</h1>
              </div>
            ),
          },
        ]}
      />
    </DashboardLayout>
  );
};

export default DonationDashboard;
