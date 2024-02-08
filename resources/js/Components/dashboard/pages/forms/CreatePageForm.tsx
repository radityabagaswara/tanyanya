import { Errors } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { Button, TextInput } from '@mantine/core';
import React, { useEffect, useState } from 'react';

interface FormProps {
  username: string;
}

interface Props {
  onSubmit: (e: InertiaFormProps<FormProps>) => void;
  error: any;
  loading?: boolean;
}

const CreatePageForm: React.FC<Props> = ({
  onSubmit,
  loading = false,
  error,
}) => {
  const [shake, setShake] = useState(false);

  const form = useForm({
    username: '',
  });

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  useEffect(() => {
    form.setError(error);
    setShake(true);
    const timeout = setTimeout(() => {
      setShake(false);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return (
    <form className="flex flex-col gap-3" onSubmit={formSubmit}>
      <TextInput
        onChange={e => {
          form.setData('username', e.currentTarget.value);
        }}
        size="md"
        leftSectionPointerEvents="none"
        leftSection={<p>tanyanya.id/</p>}
        leftSectionWidth={115}
        label="Username"
        name="username"
        placeholder="tanyanya"
        withAsterisk
        description="Your username will be used as your page URL"
        error={form.errors.username}
      />
      <div>
        <Button
          radius={'xl'}
          type="submit"
          loading={loading}
          className={shake ? 'animate-shake' : ''}
        >
          Create Page
        </Button>
      </div>
    </form>
  );
};

export default CreatePageForm;
