import DashboardTabs from '@/Components/DashboardTab';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { usePage } from '@inertiajs/react';
import React from 'react';
import DonationList from './DonationList';
import { Card, Space } from '@mantine/core';
import {
  IconCalendar,
  IconCalendarMonth,
  IconMedal2,
  IconMoneybag,
  IconTrophy,
} from '@tabler/icons-react';
import { differenceInMinutes, format, formatDistance } from 'date-fns';
import DonationGoals from './DonationGoals';

interface Props {
  donation: any;
  total_donation: number;
  total_donation_this_month: number;
  most_active_donator: any;
  cache_refresh_in: number;
}

const DonationDashboard = ({
  donation,
  total_donation,
  total_donation_this_month,
  most_active_donator,
  cache_refresh_in,
}: Props) => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card withBorder bg={'white'} radius={'lg'}>
          <Card.Section p={'lg'}>
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">Total Donations</p>
              <div className="bg-tanya-pink-3 p-3 rounded-full">
                <IconMoneybag size={24} className="text-white" />
              </div>
            </div>
            <p className="font-semibold text-xl mt-5">
              Rp {total_donation?.toLocaleString('id-ID') ?? 0}
            </p>
          </Card.Section>
        </Card>

        <Card withBorder bg={'white'} radius={'lg'}>
          <Card.Section p={'lg'}>
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">
                {format(new Date(), 'MMMM')} Donations
              </p>
              <div className="bg-tanya-pink-3 p-3 rounded-full">
                <IconCalendarMonth size={24} className="text-white" />
              </div>
            </div>
            <p className="font-semibold text-xl mt-5">
              Rp {total_donation_this_month?.toLocaleString('id-ID') ?? 0}
            </p>
          </Card.Section>
        </Card>

        <Card withBorder bg={'white'} radius={'lg'}>
          <Card.Section p={'lg'}>
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">Most Active Donator</p>
              <div className="bg-tanya-pink-3 p-3 rounded-full">
                <IconTrophy size={24} className="text-white" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl mt-5">
                {most_active_donator?.users.name ?? 'n/a'}
              </p>
              {most_active_donator ? (
                <p className="text-gray-500 text-sm mt-1">
                  Donated{' '}
                  <span className="text-tanya-pink-3 font-semibold">
                    {most_active_donator.total}
                  </span>{' '}
                  times
                </p>
              ) : null}
            </div>
          </Card.Section>
        </Card>
      </div>
      <Space m="xs" />

      <small className="text-gray-500">
        *Stats above will refresh in about{' '}
        {formatDistance(new Date(cache_refresh_in * 1000), new Date())}
      </small>

      <Space m="lg" />

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
            name: 'Donation Goals',
            key: 'donation-Goals',
            content: <DonationGoals />,
          },
        ]}
      />
    </DashboardLayout>
  );
};

export default DonationDashboard;
