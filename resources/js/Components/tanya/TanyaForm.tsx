import { useForm, usePage } from '@inertiajs/react';
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
import React from 'react';
import TanyaModalForm from './TanyaModalForm';
import { InertiaFormProps } from '@inertiajs/react/types/useForm';

interface Props {
  page: any;
  onSubmit?: (e: InertiaFormProps<any>) => void;
}

const maxLine = 180;

const TanyaForm: React.FC<Props> = ({ page, onSubmit }) => {
  const { auth }: any = usePage().props;
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(
    auth.user ? false : true,
  );

  const [message, setMessage] = React.useState<string>('');

  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <Card withBorder bg={'white'} radius={'md'} className="relative">
        {page.is_accepting_question ? null : (
          <>
            <Overlay color="#fff" backgroundOpacity={0.35} blur={3} />
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center z-[10000]">
              <h3 className="font-semibold text-red-500">
                Creator has turned off this function! Please check later.
              </h3>
            </div>
          </>
        )}

        <Card.Section px={'lg'} pt={'lg'} pb={'sm'}>
          <Textarea
            onChange={e => setMessage(e.currentTarget.value)}
            maxLength={180}
            //TODO: turn this on after testing
            // disabled={auth.user ? auth.user.id === page.user.id : false}
            title={
              auth.user && auth.user.id === page.user.id
                ? "You can't donate yourself"
                : 'Write your messages'
            }
            autosize
            minRows={3}
            placeholder="Write your messages! (Optional)"
            variant="unstyled"
            size="md"
            styles={{
              input: {
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                background: 'white',
              },
            }}
          />
          <p className="text-sm text-gray-500 text-right">
            <span
              className={`${message.length > maxLine ? 'text-red-500' : ''}`}
            >
              {message.length}
            </span>
            /{maxLine}
          </p>
        </Card.Section>
        <Divider />
        <Card.Section px={'lg'} pt={'sm'} pb={'lg'}>
          <div className="flex justify-between">
            <div>
              {page.allow_anon_question == 0 ? (
                <p className="text-gray-500 text-sm mt-1">
                  The creator has turned off the anonymous function. Your
                  donation can't be hidden.
                </p>
              ) : (
                <div className="flex gap-2 items-center">
                  <Tooltip
                    label={
                      !auth.user
                        ? 'You have to login first to change visibilty'
                        : 'Change your question visibility'
                    }
                  >
                    <Switch
                      title={
                        !auth.user
                          ? 'You have to login first to change visibilty'
                          : 'Change your question visibility'
                      }
                      disabled={!auth.user || page.allow_anon_question == 0}
                      defaultChecked={isAnonymous}
                      onChange={e => {
                        if (!auth.user) {
                          return;
                        }
                        setIsAnonymous(e.currentTarget.checked);
                      }}
                    />
                  </Tooltip>
                  {isAnonymous ? (
                    <p className="text-sm">Your donation will be anonymous.</p>
                  ) : (
                    <p className="text-sm">
                      You are donating as {auth.user?.name.split(' ')[0]}.
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                radius={'xl'}
                //TODO: turn this on after testing
                // disabled={!auth.user || auth.user.id === page.user.id}
                title={
                  !auth.user
                    ? 'You have to login first to support'
                    : auth.user.id === page.user.id
                    ? "You can't donate yourself"
                    : 'Support the creator'
                }
                onClick={() => {
                  if (!auth.user) {
                    return;
                  }
                  open();
                }}
              >
                Support {page.user.name.split(' ')[0]}
              </Button>
            </div>
          </div>
        </Card.Section>
      </Card>
      <Modal
        title={`Send ${page.user.name.split(' ')[0]} Your Support`}
        onClose={close}
        opened={isOpen}
        closeOnClickOutside={false}
        closeOnEscape={false}
        size={'lg'}
        radius={'md'}
      >
        <TanyaModalForm
          is_anonymous={isAnonymous}
          message={message}
          page={page}
          onSubmit={onSubmit}
        />
      </Modal>
    </>
  );
};

export default TanyaForm;
