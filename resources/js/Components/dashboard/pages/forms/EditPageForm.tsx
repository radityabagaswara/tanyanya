import useErrorShake from '@/Hooks/useErrorShake';
import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import {
  Avatar,
  Button,
  Divider,
  LoadingOverlay,
  Space,
  Switch,
  TextInput,
  Textarea,
  Tooltip,
} from '@mantine/core';
import React, { FormEvent, useEffect, useState } from 'react';

interface FormProps {
  username: string;
  bio: string;
  social_links: any[];
  is_accepting_question: boolean;
  allow_anon_question: boolean;
  get_notification_on_new_question: boolean;
}

interface Props {
  page: any;
  onSubmit: (e: InertiaFormProps<FormProps>) => void;
}

const EditPageForm = ({ page, onSubmit }: Props) => {
  const form = useForm<FormProps>({
    username: page?.username || '',
    bio: page?.bio || '',
    social_links: page?.social_links || [],
    is_accepting_question: page ? page.is_accepting_question === 1 : false,
    allow_anon_question: page ? page.allow_anon_question === 1 : false,
    get_notification_on_new_question: page
      ? page.get_notification_on_new_question === 1
      : false,
  });

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const shake = useErrorShake(form.errors);

  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center">
        <Tooltip
          label="You can change your avatar on your profile"
          onClick={() => {
            router.visit('/dashboard/profile');
          }}
        >
          <Avatar
            className="cursor-pointer"
            color="tanya-pink"
            size={'xl'}
            src={page.user.profile_photo_url}
          />
        </Tooltip>
      </div>
      <Tooltip
        label="You can change your page name on your profile"
        onClick={() => {
          router.visit('/dashboard/profile');
        }}
      >
        <p className="text-center mt-1">{page.user.name}</p>
      </Tooltip>
      <Space m={'md'} />

      <div className="w-full flex justify-center relative">
        <LoadingOverlay visible={form.processing} />
        <form
          className="w-full max-w-[900px] flex flex-col gap-3"
          onSubmit={formSubmit}
        >
          <TextInput
            label="Username"
            description="tanyanya.id/username"
            placeholder="username"
            defaultValue={form.data.username}
            onChange={e => form.setData('username', e.target.value)}
            error={form.errors.username}
          />
          <Textarea
            label="Bio"
            rows={5}
            placeholder="Tell your audience about your self"
            defaultValue={form.data.bio}
            onChange={e => form.setData('bio', e.target.value)}
            error={form.errors.bio}
          />
          <Divider />
          <p>Social Media</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextInput
              label="Facebook"
              placeholder="https://facebook.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'facebook')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'facebook',
                  ),
                  { name: 'facebook', url: e.target.value },
                ])
              }
              error={form.errors.social_links}
            />
            <TextInput
              label="X"
              placeholder="https://x.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'twitter')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'twitter',
                  ),
                  { name: 'twitter', url: e.target.value },
                ])
              }
              error={form.errors.social_links}
            />
            <TextInput
              label="Instagram"
              placeholder="https://instagram.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'instagram')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'instagram',
                  ),
                  { name: 'instagram', url: e.target.value },
                ])
              }
              error={form.errors.social_links}
            />
            <TextInput
              label="Youtube"
              placeholder="https://youtube.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'youtube')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'youtube',
                  ),
                  { name: 'youtube', url: e.target.value },
                ])
              }
              error={form.errors.social_links}
            />
            <TextInput
              label="Twitch"
              placeholder="https://twitch.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'twitch')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'twitch',
                  ),
                  { name: 'twitch', url: e.target.value },
                ])
              }
              error={form.errors.social_links}
            />
            <TextInput
              label="Discord"
              placeholder="https://discord.com/username"
              defaultValue={
                form.data.social_links?.find((x: any) => x.name === 'discord')
                  ?.url || ''
              }
              onChange={e =>
                form.setData('social_links', [
                  ...form.data.social_links.filter(
                    (x: any) => x.name !== 'discord',
                  ),
                  { name: 'discord', url: e.target.value },
                ])
              }
            />
          </div>

          {/* @ts-ignore */}
          {form.errors?.['social_links.0.url'] ? (
            <p className="text-sm text-red-500">
              {/* @ts-ignore */}
              {form.errors['social_links.0.url']}
            </p>
          ) : null}

          <Divider />
          <p>Page Settings</p>
          <Switch
            label="Accepting Question"
            labelPosition="right"
            classNames={{ body: 'gap-2' }}
            defaultChecked={form.data.is_accepting_question}
            onChange={e =>
              form.setData('is_accepting_question', e.target.checked)
            }
          />
          <Switch
            label="Allow Anonymous Question"
            labelPosition="right"
            classNames={{ body: 'gap-2' }}
            defaultChecked={form.data.allow_anon_question}
            onChange={e =>
              form.setData('allow_anon_question', e.target.checked)
            }
          />
          <Switch
            label="Get Notification on New Question"
            labelPosition="right"
            classNames={{ body: 'gap-2' }}
            defaultChecked={form.data.get_notification_on_new_question}
            onChange={e =>
              form.setData('get_notification_on_new_question', e.target.checked)
            }
          />

          <div className="flex justify-end">
            <Button
              radius={'xl'}
              type="submit"
              loading={form.processing}
              className={shake ? 'animate-shake' : ''}
            >
              Save Page
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPageForm;
