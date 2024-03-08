import DonationCard from '@/Components/tanya/DonationCard';
import TanyaForm from '@/Components/tanya/TanyaForm';
import TanyaProfile from '@/Components/tanya/TanyaProfile';
import useSnap from '@/Hooks/useSnap';
import MainLayout from '@/Layouts/MainLayout';
import { Auth } from '@/types';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';
import { Loader, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

interface Props {
  page: any;
  auth: Auth;
}

const TanyaPage = ({ page, auth }: Props) => {
  const [snapToken, setSnapToken] = useState<string>('');
  const { snapEmbed } = useSnap();
  const [loading, setLoading] = useState<boolean>(false);
  const [recentDono, setRecentDono] = useState<any | null>(null);

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

  useEffect(() => {
    axios
      .get(`/api/tanya/${page.id}/recent`)
      .then(res => {
        setRecentDono(res.data);
      })
      .catch(err => {
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch recent dono.',
        });
      });
  }, []);

  const moreDono = () => {
    axios
      .get(`/api/tanya/${page.id}/recent?page=${recentDono.current_page + 1}`)
      .then(res => {
        setRecentDono({
          ...res.data,
          data: [...recentDono.data, ...res.data.data],
        });
      })
      .catch(err => {
        notifications.show({
          title: 'Error',
          message: 'Failed to fetch recent dono.',
        });
      });
  };

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
        <div className="flex flex-col gap-5 mt-5">
          {recentDono ? (
            <InfiniteScroll
              dataLength={recentDono.data.length}
              next={moreDono}
              hasMore={recentDono.current_page < recentDono.last_page}
              loader={<h4>Loading...</h4>}
              className="flex flex-col gap-5"
            >
              {recentDono.data.map((donation: any, index: number) => (
                <DonationCard
                  key={index}
                  donation={donation}
                  pagename={page.user.name}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <div className="flex justify-center">
              <Loader variant="bars" />
            </div>
          )}
        </div>
      </div>

      <Modal
        opened={snapToken.length > 0}
        onClose={() => null}
        closeOnEscape={false}
        closeOnClickOutside={false}
        withCloseButton={false}
        classNames={{ body: 'p-0' }}
        radius={'lg'}
        size={320}
        centered
      >
        <div className="w-[320px] h-[560px]">
          <div id="snap-embed" className="w-full h-full"></div>
        </div>
      </Modal>
    </MainLayout>
  );
};

export default TanyaPage;
