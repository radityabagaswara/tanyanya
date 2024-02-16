import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { DateInput, DatePicker } from '@mantine/dates';
import { format } from 'date-fns';

import {
  Avatar,
  Button,
  Divider,
  FileButton,
  Group,
  LoadingOverlay,
  TextInput,
} from '@mantine/core';
import useErrorShake from '@/Hooks/useErrorShake';

interface Props {
  user: any;
  onSubmit: (e: InertiaFormProps<any>) => void;
}

const ProfileForm: React.FC<Props> = ({ user, onSubmit }) => {
  const form = useForm({
    name: user?.name || '',
    email: user?.email || 'email',
    birth_date: user?.birth_date || null,
    photo: null,
  });

  const shake = useErrorShake(form.errors);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const getPhotoURL = () => {
    if (user && user.profile_photo_url && !form.data.photo) {
      return user.profile_photo_url;
    } else if (form.data.photo) {
      return URL.createObjectURL(form.data.photo as any);
    } else {
      return null;
    }
  };
  console.log(user);
  return (
    <form onSubmit={formSubmit} className="flex flex-col gap-3">
      <LoadingOverlay visible={form.processing} />
      <div className="form-groups">
        <div className="form-title">
          <h3 className="font-semibold">Your Photo</h3>
        </div>
        <div className="form-content ">
          <div className="flex flex-row gap-1 items-center">
            <Avatar src={getPhotoURL()} size={'lg'}></Avatar>

            <FileButton
              onChange={e => {
                form.setData('photo', e as any);
              }}
              accept="image/png,image/jpeg"
            >
              {props => (
                <Button {...props} variant="transparent">
                  Change Photo
                </Button>
              )}
            </FileButton>
          </div>
          {form.errors.photo ? (
            <p className="text-sm text-red-500 mt-1">{form.errors.photo}</p>
          ) : null}
        </div>
      </div>
      <Divider />
      <div className="form-groups">
        <div className="form-title">
          <h3 className="font-semibold">Full Name</h3>
        </div>
        <div className="form-content">
          <TextInput
            size="md"
            placeholder="Full Name"
            required
            value={form.data.name}
            onChange={e => {
              form.setData('name', e.currentTarget.value);
            }}
            error={form.errors.name}
          />
        </div>
      </div>
      <div className="form-groups">
        <div className="form-title">
          <h3 className="font-semibold">Email</h3>
        </div>
        <div className="form-content">
          <TextInput
            size="md"
            type="email"
            required
            value={form.data.email}
            onChange={e => {
              form.setData('email', e.currentTarget.value);
            }}
            error={form.errors.email}
          />
        </div>
      </div>
      <div className="form-groups">
        <div className="form-title">
          <h3 className="font-semibold">Birth Date</h3>
        </div>
        <div className="form-content">
          <DateInput
            placeholder="DD/MM/YYYY"
            value={new Date(form.data.birth_date)}
            size="md"
            valueFormat="DD/MM/YYYY"
            onChange={e => {
              if (!e) return;
              form.setData('birth_date', format(e, 'yyy-M-d'));
            }}
            error={form.errors.birth_date}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={!form.isDirty}
          radius={'lg'}
          type="submit"
          loading={form.processing}
          className={shake ? 'animate-shake' : ''}
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
