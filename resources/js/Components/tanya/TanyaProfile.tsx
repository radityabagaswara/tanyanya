import { ActionIcon, Avatar, Image, Space } from '@mantine/core';
import {
  IconBrandDiscordFilled,
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTwitch,
  IconBrandX,
  IconBrandYoutubeFilled,
} from '@tabler/icons-react';
import React from 'react';

interface Props {
  page: any;
}

const TanyaProfile: React.FC<Props> = ({ page }) => {
  return (
    <div className="flex flex-col items-center mt-12 lg:mt-24">
      <div className="relative w-full">
        <Image
          w={'100%'}
          src={page.header_url}
          styles={{ root: { aspectRatio: '121/30' } }}
          radius={'lg'}
        />
        <div className="absolute w-full flex justify-center -bottom-10">
          <Avatar
            src={page.user.profile_photo_url}
            size={100}
            className="border"
          >
            {page.user.name[0]}
          </Avatar>
        </div>
      </div>
      <Space h={40} />
      <h1 className="text-xl font-semibold mt-3">{page.user.name}</h1>
      <h2 className="text-sm text-gray-500">@{page.username}</h2>
      <p className="mt-1">{page.bio}</p>
      <div className="flex flex-row gap-2 items-center mt-2">
        {page.social_links.find((link: any) => link.name === 'twitter') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'twitter').url
            }
          >
            <IconBrandX size={18} />
          </ActionIcon>
        ) : null}
        {page.social_links.find((link: any) => link.name === 'facebook') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'facebook')
                .url
            }
          >
            <IconBrandFacebookFilled size={18} />
          </ActionIcon>
        ) : null}
        {page.social_links.find((link: any) => link.name === 'youtube') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'youtube').url
            }
            target="_blank"
          >
            <IconBrandYoutubeFilled size={18} />
          </ActionIcon>
        ) : null}
        {page.social_links.find((link: any) => link.name === 'instagram') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'instagram')
                .url
            }
          >
            <IconBrandInstagram size={18} />
          </ActionIcon>
        ) : null}
        {page.social_links.find((link: any) => link.name === 'twitch') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'twitch').url
            }
          >
            <IconBrandTwitch size={18} />
          </ActionIcon>
        ) : null}
        {page.social_links.find((link: any) => link.name === 'discord') ? (
          <ActionIcon
            size={'sm'}
            variant="subtle"
            component={'a'}
            href={
              page.social_links.find((link: any) => link.name === 'discord').url
            }
          >
            <IconBrandDiscordFilled size={18} />
          </ActionIcon>
        ) : null}
      </div>
    </div>
  );
};

export default TanyaProfile;
