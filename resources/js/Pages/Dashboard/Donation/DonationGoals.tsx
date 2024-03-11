import { Anchor, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';

const DonationGoals = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Your Donation Goals</h1>
        <Button leftSection={<IconPlus size={14} />}>New Goals</Button>
      </div>
      <div className="flex flex-col h-32 items-center justify-center">
        <p className="text-sm text-gray-500">
          You don't have any donation goals yet 😢{' '}
        </p>
        <Anchor className="text-sm">Create one here!</Anchor>
      </div>
    </div>
  );
};

export default DonationGoals;
