import RegisterForm from '@/Components/auth/RegisterForm';
import useRoute from '@/Hooks/useRoute';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { ActionIcon, Button, Card, Divider } from '@mantine/core';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import React from 'react';

const Register = () => {
  const route = useRoute();
  const RegisterUser = (e: any) => {
    e.post(route('register'), {
      onFinish: () => e.reset('password', 'password_confirmation'),
    });
  };
  return (
    <MainLayout className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-semibold text-tanya-pink-3">
        Glad to Have You Aboard!
      </h1>
      <p className="mt-1">
        Already have an account? <Link href="/login">Login Here!</Link>
      </p>
      <Card mt={'md'} className="min-w-[600px]">
        <Card.Section p={'lg'}>
          <RegisterForm onSubmit={RegisterUser} />
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
      <p className="text-center mt-5 text-sm">
        By signing up, you agree to our <Link href="#">Terms of Use</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </p>
    </MainLayout>
  );
};

export default Register;
