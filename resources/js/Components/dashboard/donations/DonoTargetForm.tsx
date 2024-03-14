import { useForm } from '@inertiajs/react';
import React from 'react';
import { Button, Space, Switch, TextInput, Textarea } from '@mantine/core';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';

export interface TargetFormProps {
  name: string;
  description: string;
  amount: number;
  is_active: boolean;
}

interface Props {
  onSubmit?: (e: InertiaFormProps<TargetFormProps>) => void;
}

const DonoTargetForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm<TargetFormProps>({
    name: '',
    description: '',
    amount: 0,
    is_active: false,
  });

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit && onSubmit(form);
  };
  return (
    <form onSubmit={formSubmit} className="flex flex-col gap-3">
      <TextInput
        label="Name"
        description="Target Name"
        size="md"
        withAsterisk
        required
        onChange={e => {
          form.setData('name', e.currentTarget.value);
        }}
        error={form.errors.name}
      />
      <Textarea
        label="Description"
        description="Optional"
        size="md"
        minRows={4}
        autosize
        onChange={e => {
          form.setData('description', e.currentTarget.value);
        }}
        error={form.errors.description}
      />
      <TextInput
        label="Target Ammount"
        type="number"
        size="md"
        withAsterisk
        required
        leftSection="Rp"
        onChange={e => {
          form.setData('amount', parseInt(e.currentTarget.value));
        }}
        error={form.errors.amount}
      />
      <Switch
        mt={'sm'}
        label="Is this target active?"
        labelPosition="left"
        onLabel="Yes"
        offLabel="No"
        size="md"
        checked={form.data.is_active}
        onChange={e => {
          form.setData('is_active', e.currentTarget.checked);
        }}
        error={form.errors.is_active}
      />

      <Space h={10} />
      <div className="flex justify-end">
        <Button type="submit" loading={form.processing}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default DonoTargetForm;
