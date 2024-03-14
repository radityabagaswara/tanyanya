import DashboardLayout from '@/Layouts/DashboardLayout';
import React from 'react';

interface Props {
  goals: any;
}

const DonationGoalsDetail = ({ goals }: Props) => {
  return (
    <DashboardLayout title="Donation Target">Hello World!</DashboardLayout>
  );
};

export default DonationGoalsDetail;
