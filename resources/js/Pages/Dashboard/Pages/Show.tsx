import DashboardLayout from '@/Layouts/DashboardLayout';
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  FileButton,
  Space,
  Switch,
  TextInput,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { IconQuestionMark } from '@tabler/icons-react';
import React, { useState } from 'react';

const ShowPage = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <DashboardLayout>
      <Card withBorder>
        <Card.Section p={'lg'}>
          <div className="flex flex-col gap-3 justify-center items-center">
            <Tooltip label="You can change your avatar on your profile">
              <Avatar className="cursor-pointer" color="tanya-pink" size={'xl'}>
                PG
              </Avatar>
            </Tooltip>
          </div>
          <Tooltip label="You can change your page name on your profile">
            <p className="text-center mt-1">User Full Name</p>
          </Tooltip>
          <Space m={'md'} />

          <div className="w-full flex justify-center">
            <form className="w-full max-w-[900px] flex flex-col gap-3">
              <TextInput
                label="Username"
                description="tanyanya.id/username"
                placeholder="username"
              />
              <Textarea
                label="Bio"
                rows={5}
                placeholder="Tell your audience about your self"
              />
              <Divider />
              <p>Social Media</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
                <TextInput label="X" placeholder="https://x.com/username" />
                <TextInput
                  label="Instagram"
                  placeholder="https://instagram.com/username"
                />
                <TextInput
                  label="Youtube"
                  placeholder="https://youtube.com/username"
                />
                <TextInput
                  label="Twitch"
                  placeholder="https://twitch.com/username"
                />
                <TextInput
                  label="Discord"
                  placeholder="https://discord.com/username"
                />
              </div>
              <Divider />
              <p>Page Settings</p>
              <Switch
                label="Accepting Question"
                labelPosition="right"
                classNames={{ body: 'gap-2' }}
              />
              <Switch
                label="Allow Anonymous Question"
                labelPosition="right"
                classNames={{ body: 'gap-2' }}
              />
              <Switch
                label="Get Notification on New Question"
                labelPosition="right"
                classNames={{ body: 'gap-2' }}
              />

              <div className="flex justify-end">
                <Button radius={'xl'} type="submit">
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        </Card.Section>
      </Card>
    </DashboardLayout>
  );
};

export default ShowPage;
