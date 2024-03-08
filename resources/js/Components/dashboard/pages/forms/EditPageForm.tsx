import useErrorShake from '@/Hooks/useErrorShake';
import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import {
  Avatar,
  Button,
  Divider,
  FileButton,
  Image,
  LoadingOverlay,
  NumberInput,
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
  is_accepting_dono: boolean;
  allow_anon_dono: boolean;
  get_notification_on_new_question: boolean;
  header: any;
  price_per_unit: number;
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
    is_accepting_dono: page ? page.is_accepting_dono === 1 : false,
    allow_anon_dono: page ? page.allow_anon_dono === 1 : false,
    get_notification_on_new_question: page
      ? page.get_notification_on_new_question === 1
      : false,
    header: null,
    price_per_unit: page?.price_per_unit || 1000,
  });

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const shake = useErrorShake(form.errors);

  const getPhotoURL = () => {
    if (form.data.header) {
      return URL.createObjectURL(form.data.header as any);
    }
    return page.header_url;
  };

  return (
    <>
      <form
        className="w-full max-w-[900px] flex flex-col gap-3"
        onSubmit={formSubmit}
      >
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Profile</h3>
            <p className="text-sm text-gray-500">
              You can change your profile on the profile section.
            </p>
          </div>
          <div className="form-content flex flex-row gap-2 items-center">
            <Avatar
              src={page.user.profile_photo_url}
              size={'lg'}
              color="tanya-pink"
            />
            <p>{page.user.name}</p>
            <Button variant="subtle" component={Link} href="?tab=profile">
              Change
            </Button>
          </div>
        </div>
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Banner</h3>
          </div>
          <div className="form-content ">
            <div className="flex flex-row flex-wrap gap-1 items-center">
              {/* <Avatar src={getPhotoURL()} size={'lg'}></Avatar> */}

              <img
                className="w-[400px] aspect-[121/30] object-cover rounded-2xl border"
                src={getPhotoURL()}
              />
              <FileButton
                onChange={e => {
                  form.setData('header', e as any);
                }}
                accept="image/png,image/jpeg"
              >
                {props => (
                  <Button {...props} variant="transparent">
                    Change Banner
                  </Button>
                )}
              </FileButton>
            </div>
            {form.errors.header ? (
              <p className="text-sm text-red-500 mt-1">{form.errors.header}</p>
            ) : null}
          </div>
        </div>
        <Divider />
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Username</h3>
          </div>
          <div className="form-content">
            <TextInput
              description="tanyanya.id/username"
              placeholder="username"
              defaultValue={form.data.username}
              onChange={e => form.setData('username', e.target.value)}
              error={form.errors.username}
            />
          </div>
        </div>
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Bio</h3>
          </div>
          <div className="form-content">
            <Textarea
              rows={5}
              placeholder="Tell your audience about your self"
              defaultValue={form.data.bio}
              onChange={e => form.setData('bio', e.target.value)}
              error={form.errors.bio}
            />
          </div>
        </div>
        <Divider />
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Social Media</h3>
          </div>
          <div className="form-content flex flex-col gap-3">
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
            {/* @ts-ignore */}
            {form.errors?.['social_links.0.url'] ? (
              <p className="text-sm text-red-500">
                {/* @ts-ignore */}
                {form.errors['social_links.0.url']}
              </p>
            ) : null}
          </div>
        </div>
        <Divider />
        <div className="form-groups">
          <div className="form-title">
            <h3 className="font-semibold">Page Settings</h3>
          </div>
          <div className="form-content flex flex-col gap-3">
            <NumberInput
              label="Price per Unit"
              placeholder="1000"
              hideControls
              min={1000}
              max={100000}
              defaultValue={form.data.price_per_unit}
              onChange={e =>
                form.setData('price_per_unit', parseInt(e.toString()))
              }
              error={form.errors.price_per_unit}
              leftSection="Rp"
              thousandSeparator="."
              decimalSeparator=","
            />
            <Switch
              label="Accepting Question"
              labelPosition="right"
              classNames={{ body: 'gap-2' }}
              defaultChecked={form.data.is_accepting_dono}
              onChange={e =>
                form.setData('is_accepting_dono', e.target.checked)
              }
            />
            <Switch
              label="Allow Anonymous Question"
              labelPosition="right"
              classNames={{ body: 'gap-2' }}
              defaultChecked={form.data.allow_anon_dono}
              onChange={e => form.setData('allow_anon_dono', e.target.checked)}
            />
            <Switch
              label="Get Notification on New Question"
              labelPosition="right"
              classNames={{ body: 'gap-2' }}
              defaultChecked={form.data.get_notification_on_new_question}
              onChange={e =>
                form.setData(
                  'get_notification_on_new_question',
                  e.target.checked,
                )
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            radius={'xl'}
            type="submit"
            loading={form.processing}
            className={shake ? 'animate-shake' : ''}
            disabled={!form.isDirty}
          >
            Save Page
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditPageForm;
