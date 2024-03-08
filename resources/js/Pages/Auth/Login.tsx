import LoginForm from '@/Components/auth/LoginForm';
import RegisterForm from '@/Components/auth/RegisterForm';
import useRoute from '@/Hooks/useRoute';
import MainLayout from '@/Layouts/MainLayout';
import { Link, usePage } from '@inertiajs/react';
import { ActionIcon, Button, Card, Divider } from '@mantine/core';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import React, { useState } from 'react';

const Register = () => {
  const route = useRoute();
  const [loading, setLoading] = useState<boolean>(false);
  const RegisterUser = (e: any) => {
    setLoading(true);
    e.post(route('login'), {
      onFinish: () => {
        setLoading(false);
      },
    });
  };

  const { errors } = usePage().props;

  return (
    <MainLayout className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-semibold text-tanya-pink-3">
        Welcome Back!
      </h1>
      <p className="mt-1">
        Don't have an account? <Link href="/register">Register Here!</Link>
      </p>
      <Card mt={'md'} className="min-w-[600px]">
        <Card.Section p={'lg'}>
          <LoginForm onSubmit={RegisterUser} loading={loading} error={errors} />
        </Card.Section>
        <Divider />
        <Card.Section p={'lg'}>
          <p className="text-center text-sm text-neutral-500 mb-3">
            Or Signup with
          </p>
          <div className="flex flex-row gap-3 justify-center">
            <Button
              radius={'xl'}
              leftSection={<IconBrandGoogleFilled />}
              size="md"
            >
              Sign up with Google
            </Button>
          </div>
        </Card.Section>
      </Card>
      <p className="text-center mt-5 text-sm text-gray-500">
        By signing up, you agree to our <Link href="#">Terms of Use</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </p>
    </MainLayout>
  );
};

export default Register;
