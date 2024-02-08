import CardNoPage from '@/Components/CardNoPage';
import InboxCard from '@/Components/dashboard/InboxCard';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Avatar, Button, Card, Divider } from '@mantine/core';
import React from 'react';

interface Props {
  is_page: boolean;
}

const UserDashboard = ({ is_page }: Props) => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-5">Inbox</h1>
      {is_page ? (
        <div className="columns-1 sm:columns-1 md:columns-1 lg:columns-2 xl:columns-3 2xl:columns-4 gap-7 space-y-5 p-4">
          {dataTemp.map((value: any, index: number) => {
            return <InboxCard data={value} key={index} />;
          })}
        </div>
      ) : (
        <CardNoPage />
      )}
    </DashboardLayout>
  );
};

export default UserDashboard;

const dataTemp = [
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci,Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudianLorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudian repudiandae inventore architecto recusandae non blanditiis dignissimos animi debitis ipsa laudantium id quas aut vitae laborum dolore eveniet.',
    sender: {
      name: 'Raditya Bagaswara',
      avatar: 'RB',
    },
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi.',
    sender: null,
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi debitis ipsa laudantium id quas aut vitae laborum dolore eveniet.',
    sender: {
      name: 'Raditya Bagaswara',
      avatar: 'RB',
    },
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi.',
    sender: null,
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi debitis ipsa laudantium id quas aut vitae laborum dolore eveniet.',
    sender: {
      name: 'Raditya Bagaswara',
      avatar: 'RB',
    },
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi.',
    sender: null,
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi debitis ipsa laudantium id quas aut vitae laborum dolore eveniet.',
    sender: {
      name: 'Raditya Bagaswara',
      avatar: 'RB',
    },
  },
  {
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, temporibus, alias adipisci, repudiandae inventore architecto recusandae non blanditiis dignissimos animi.',
    sender: null,
  },
];
