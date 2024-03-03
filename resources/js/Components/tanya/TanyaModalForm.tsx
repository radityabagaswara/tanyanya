import { useForm, usePage } from '@inertiajs/react';
import {
  ActionIcon,
  Avatar,
  Button,
  Image,
  NumberInput,
  TextInput,
  Textarea,
} from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React from 'react';

interface Props {
  message: string;
  onSubmit?: (e: any) => void;
  is_anonymous: boolean;
  page: any;
}

const TanyaModalForm: React.FC<Props> = ({
  message,
  onSubmit,
  is_anonymous,
  page,
}) => {
  const form = useForm({
    message: message || '',
    is_anon: is_anonymous || false,
    amount: 1,
  });

  const { auth }: any = usePage().props;

  const RenderUserField = () => {
    if (is_anonymous)
      return (
        <TextInput disabled label="Supporting as" defaultValue={'Anonymous'} />
      );

    return (
      <TextInput
        label="Supporting as"
        leftSection={
          <Avatar
            src={auth.user.profile_photo_url}
            radius={'xl'}
            size={'sm'}
            className="border"
          />
        }
        defaultValue={auth.user.name}
        size="md"
      />
    );
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={e => {
        e.preventDefault();
        onSubmit && onSubmit(form);
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          className="w-48 aspect-square object-cover"
          src="https://velcro.is3.cloudhost.id/tanyanya/25498.jpg"
        />
        <p>Total Donation</p>
        <p className="font-semibold text-gray-700 mb-2">
          Rp. {(form.data.amount * page.price_per_unit).toLocaleString('ID-id')}
        </p>

        <div className="flex flex-row gap-2 items-center">
          <ActionIcon
            radius={'xl'}
            variant="outline"
            onClick={() => {
              if (form.data.amount > 1)
                form.setData('amount', form.data.amount - 1);
            }}
          >
            <IconMinus />
          </ActionIcon>
          <NumberInput
            hideControls
            className="w-14"
            classNames={{ input: 'text-center' }}
            min={1}
            value={form.data.amount}
            onChange={value => {
              if (!value || parseInt(value.toString()) <= 0)
                return form.setData('amount', 1);
              form.setData('amount', parseInt(value.toString()));
            }}
          />
          <ActionIcon
            radius={'xl'}
            onClick={() => {
              form.setData('amount', form.data.amount + 1);
            }}
          >
            <IconPlus />
          </ActionIcon>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Rp {page.price_per_unit.toLocaleString('ID-id')} / Unit
        </p>
      </div>
      <RenderUserField />
      <Textarea
        label="Message"
        size="md"
        minRows={4}
        autosize
        error={form.errors.message}
        onChange={e => form.setData('message', e.target.value)}
        value={form.data.message}
        maxLength={180}
      />
      <Button mt={'sm'} type="submit">
        Support Creator
      </Button>
    </form>
  );
};

export default TanyaModalForm;
