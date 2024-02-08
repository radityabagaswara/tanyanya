import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Divider, TextInput } from '@mantine/core';
import React from 'react';

interface Props {
  onSubmit: (e: any) => void;
}

const RegisterForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: true,
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={formSubmit}>
      <TextInput
        label="Name"
        size="md"
        withAsterisk
        required
        type="text"
        onChange={e => form.setData('name', e.target.value)}
      />
      <TextInput
        label="Email"
        size="md"
        withAsterisk
        required
        type="email"
        onChange={e => form.setData('email', e.target.value)}
      />
      <TextInput
        label="Password"
        size="md"
        withAsterisk
        required
        type="password"
        onChange={e => form.setData('password', e.target.value)}
      />
      <TextInput
        label="Confirm Password"
        size="md"
        withAsterisk
        required
        type="password"
        onChange={e => form.setData('password_confirmation', e.target.value)}
      />
      <Button size="md" mt={'sm'} radius={'xl'} type="submit">
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
