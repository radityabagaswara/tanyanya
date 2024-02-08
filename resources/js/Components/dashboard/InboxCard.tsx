import { ActionIcon, Avatar, Card, Divider } from '@mantine/core';
import { IconBroadcast, IconDots } from '@tabler/icons-react';
import React from 'react';

interface Props {
  data: any;
}

const InboxCard: React.FC<Props> = ({ data }) => {
  return (
    <Card withBorder radius={'lg'} className="relative group">
      <Card.Section p={'lg'} className="porse">
        <p className="">{data.message}</p>
      </Card.Section>
      <Divider />
      <Card.Section px={'lg'} pt={'md'}>
        {data.sender ? (
          <div className="flex flex-row items-center gap-3">
            <Avatar color="tanya-pink">RB</Avatar>
            <p>{data.sender.name}</p>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-3">
            <Avatar color="tanya-pink">?</Avatar>
            <p>Anon</p>
          </div>
        )}
      </Card.Section>
      <div className="absolute bottom-3 right-2 opacity-0 group-hover:opacity-100 transition-all flex flex-row gap-3">
        <ActionIcon size={'lg'} radius={'xl'} title="Send to overlay">
          <IconBroadcast />
        </ActionIcon>
        <ActionIcon size={'lg'} radius={'xl'} variant="subtle">
          <IconDots />
        </ActionIcon>
      </div>
    </Card>
  );
};

export default InboxCard;
