import MainLayout from '@/Layouts/MainLayout';
import { Auth } from '@/types';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Overlay,
  Switch,
  Textarea,
  Tooltip,
} from '@mantine/core';
import React from 'react';

interface Props {
  page: any;
  auth: Auth;
}

const TanyaPage = ({ page, auth }: Props) => {
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(true);
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mt-12 lg:mt-24">
          <Avatar src={page.user.profile_photo_url} size={'xl'}>
            {page.user.name[0]}
          </Avatar>
          <h1 className="text-xl font-semibold mt-3">{page.user.name}</h1>
          <h2 className="text-sm text-gray-500">@{page.username}</h2>
          <p className="mt-1">{page.bio}</p>
        </div>
        <div className="mt-8 ">
          <Card withBorder bg={'white'} radius={'md'} className="relative">
            {page.is_accepting_question ? null : (
              <>
                <Overlay color="#fff" backgroundOpacity={0.35} blur={3} />
                <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center z-[10000]">
                  <h3 className="font-semibold text-red-500">
                    Creator has turned off the asking function!
                  </h3>
                </div>
              </>
            )}

            <Card.Section px={'lg'} pt={'lg'} pb={'sm'}>
              <Textarea
                disabled={auth.user ? auth.user.id === page.user.id : false}
                title={
                  auth.user && auth.user.id === page.user.id
                    ? "You can't ask yourself"
                    : 'Write your question'
                }
                autosize
                minRows={3}
                placeholder="Ask me anything!"
                variant="unstyled"
                size="md"
                styles={{
                  input: {
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    background: 'white',
                  },
                }}
              />
              <p className="text-sm text-gray-500 text-right">0/300</p>
            </Card.Section>
            <Divider />
            <Card.Section px={'lg'} pt={'sm'} pb={'lg'}>
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <Tooltip
                    label={
                      !auth.user
                        ? 'You have to login first to change visibilty'
                        : 'Change your question visibility'
                    }
                  >
                    <Switch
                      title={
                        !auth.user
                          ? 'You have to login first to change visibilty'
                          : 'Change your question visibility'
                      }
                      disabled={!auth.user}
                      defaultChecked={isAnonymous}
                      onChange={e => {
                        if (!auth.user) {
                          return;
                        }
                        setIsAnonymous(e.currentTarget.checked);
                      }}
                    />
                  </Tooltip>
                  {isAnonymous ? (
                    <p className="text-sm">Your question will be anonymous.</p>
                  ) : (
                    <p className="text-sm">
                      You are asking as {auth.user?.name.split(' ')[0]}.
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    radius={'xl'}
                    disabled={auth.user ? auth.user.id === page.user.id : false}
                    title={
                      auth.user && auth.user.id === page.user.id
                        ? "You can't ask yourself"
                        : 'Send Question'
                    }
                  >
                    Ask
                  </Button>
                </div>
              </div>
            </Card.Section>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default TanyaPage;