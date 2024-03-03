import { Avatar, Card, Divider } from '@mantine/core';
import { format } from 'date-fns';
import React from 'react';

interface Props {
  donation: any;
  pagename: string;
}

const DonationCard: React.FC<Props> = ({ donation, pagename }) => {
  return (
    <div className="flex flex-row gap-3">
      <Avatar
        src={donation.users?.profile_photo_url || null}
        size={50}
        bg={'#FEEEF3'}
        color="#F43F5E"
      >
        ?
      </Avatar>
      <Card
        withBorder
        radius={0}
        classNames={{ root: 'rounded-r-2xl rounded-bl-2xl' }}
      >
        <Card.Section p={'md'}>
          <div>
            <small className="text-gray-500">
              {format(new Date(donation.transaction_time), 'd MMM yyyy')}
            </small>
          </div>
          <span className="font-semibold">
            {donation.users?.name || 'Anonymous'}{' '}
          </span>
          donated {donation.amount} coins to {pagename}!
          {donation.message ? (
            <>
              <Divider my={'md'} />
              <p className="font-semibold text-sm">Message:</p>
              <p className="text-sm">{donation.message}</p>
            </>
          ) : null}
        </Card.Section>
      </Card>
    </div>
  );
};

export default DonationCard;
