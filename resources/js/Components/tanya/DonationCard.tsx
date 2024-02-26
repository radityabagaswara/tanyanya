import { Avatar, Card, Divider } from '@mantine/core';
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
      <Card withBorder>
        <Card.Section p={'lg'}>
          <span className="font-semibold">
            {donation.users?.name || 'Anonymous'}{' '}
          </span>
          donated {donation.ammount} coins to {pagename}!
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
