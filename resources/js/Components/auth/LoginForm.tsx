import useErrorShake from '@/Hooks/useErrorShake';
import { useForm } from '@inertiajs/react';
import { Button, Checkbox, Divider, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface Props {
  onSubmit: (e: any) => void;
  error: any;
  loading?: boolean;
}

const LoginForm: React.FC<Props> = ({ onSubmit, error, loading = false }) => {
  const form = useForm({
    email: '',
    password: '',
    remember: 'on',
  });

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const shake = useErrorShake(form.errors);

  return (
    <form className="flex flex-col gap-3" onSubmit={formSubmit}>
      <TextInput
        label="Email"
        size="md"
        withAsterisk
        required
        type="email"
        error={form.errors.email}
        onChange={e => form.setData('email', e.target.value)}
      />
      <TextInput
        label="Password"
        size="md"
        withAsterisk
        required
        type="password"
        error={form.errors.password}
        onChange={e => form.setData('password', e.target.value)}
      />

      <Button
        size="md"
        mt={'sm'}
        radius={'xl'}
        type="submit"
        loading={loading}
        className={shake ? 'animate-shake' : ''}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
