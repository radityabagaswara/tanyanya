import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';
import { Button, Card, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import CreatePageForm from './dashboard/pages/forms/CreatePageForm';
import { usePage } from '@inertiajs/react';

const CardNoPage: React.FC = () => {
  const route = useRoute();
  const [opened, { open, close, toggle }] = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const { errors } = usePage().props;
  return (
    <>
      <Card bg={'white'} withBorder>
        <Card.Section p={'lg'}>
          <h3 className="text-xl text-tanya-pink-3">
            You Don't Have a Page Yet 😭
          </h3>
          <p className="mt-3">
            Don't worry, you can create one by clicking the button below!
          </p>
          <div className="mt-3">
            <Button
              radius={'xl'}
              onClick={() => {
                open();
              }}
            >
              Create Page
            </Button>
          </div>
        </Card.Section>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        title="Create Page"
        closeOnClickOutside={false}
        closeOnEscape={false}
      >
        <CreatePageForm
          loading={loading}
          error={errors}
          onSubmit={e => {
            setLoading(true);
            e.post(route('dashboard.page.insert'), {
              onSuccess: () => {
                e.reset('username');
                close();
              },
              onFinish: () => setLoading(false),
            });
          }}
        />
      </Modal>
    </>
  );
};

export default CardNoPage;
