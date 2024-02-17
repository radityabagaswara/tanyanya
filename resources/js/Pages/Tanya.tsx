import TanyaForm from '@/Components/tanya/TanyaForm';
import TanyaProfile from '@/Components/tanya/TanyaProfile';
import useSnap from '@/Hooks/useSnap';
import MainLayout from '@/Layouts/MainLayout';
import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import {
  Button,
  Card,
  Divider,
  Modal,
  Overlay,
  Switch,
  Textarea,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

interface Props {
  page: any;
  auth: Auth;
}

const TanyaPage = ({ page, auth }: Props) => {
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [snapToken, setSnapToken] = useState<string>('');
  const { snapEmbed } = useSnap();
  const [loading, setLoading] = useState<boolean>(false);

  const submitDono = (e: InertiaFormProps<any>) => {
    setLoading(true);
    e.post(route('tanya.donate', page.id), {
      onSuccess: e => {
        setLoading(false);
        if (e.props.snap_token) {
          if (snapToken.length > 0) return;
          setSnapToken(e.props.snap_token as string);
        }
      },
      onError: e => {
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!snapToken) return;
    setTimeout(() => {
      snapEmbed(snapToken, 'snap-embed', {
        onSuccess: (result: any) => {
          setSnapToken('');
          notifications.show({
            title: 'Success',
            message:
              'Thank you for your support! Your donation has been received.',
          });
        },
        onPending: (result: any) => {
          console.log('pending', result);
          setSnapToken('');
        },
        onError: () => {
          notifications.show({
            title: 'Error while processing payment',
            message:
              'Error while processing your payment, please try again later!',
          });
        },
        onClose: () => {
          console.log('closed');
          setSnapToken('');
        },
      });
    }, 500);
  }, [snapToken]);

  return (
    <MainLayout loading={loading}>
      <div className="max-w-3xl mx-auto">
        <TanyaProfile page={page} />
        <div className="mt-8 ">
          <TanyaForm page={page} onSubmit={submitDono} />
        </div>
        <div className="mt-8">
          <h2 className="font-semibold text-xl">Recent Supporter</h2>
        </div>
      </div>

      <Modal
        opened={snapToken.length > 0}
        onClose={() => null}
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        w={320}
        h={560}
        classNames={{ body: 'p-0' }}
        radius={'lg'}
        centered
      >
        <div id="snap-embed" className="w-full h-full"></div>
      </Modal>
    </MainLayout>
  );
};

export default TanyaPage;
