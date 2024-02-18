import DashboardTabs from '@/Components/DashboardTab';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';

interface Props {
  donation: any;
}

const DonationDashboard = ({ donation }: Props) => {
  console.log(donation);
  return (
    <DashboardLayout title="Donations">
      <DashboardTabs
        tabs={[
          {
            name: 'Donations',
            key: 'donations',
            content: (
              <div>
                <h1>Donations</h1>
              </div>
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
