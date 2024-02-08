import { useState } from 'react';
import { Group, Code, Image } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconLayoutDashboard,
} from '@tabler/icons-react';

const data = [{ link: '', label: 'Dashboard', icon: IconLayoutDashboard }];

export function DashboardSidebar() {
  const [active, setActive] = useState('Billing');

  const links = data.map(item => (
    <a
      className={
        'link flex items-center text-sm text-gray-700 dark:text-gray-100 py-1 px-2 rounded-sm font-medium'
      }
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={event => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon
        className={'linkIcon text-gray-600 dark:text-gray-400 mr-2 w-6 h-6'}
        stroke={1.5}
      />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav
      className={
        'navbar min-h-screen w-72 p-4 flex flex-col border-r border-gray-300 bg-white dark:border-gray-600'
      }
    >
      <div className={'flex-1'}>
        <Group
          className={
            'header pb-4 mb-6 border-b border-gray-300 dark:border-gray-600'
          }
          justify="space-between"
        >
          <Image
            src={
              'https://velcro.is3.cloudhost.id/tanyanyaid_logotext_md-08.png'
            }
            w={150}
          />
          <Code fw={700}>v3.1.2</Code>
        </Group>
        {links}
      </div>

      <div
        className={
          'footer pt-4 mt-4 border-t border-gray-300 dark:border-gray-600'
        }
      >
        <a
          href="#"
          className={
            'link flex items-center text-sm text-gray-700 dark:text-gray-100 py-1 px-2 rounded-sm font-medium'
          }
          onClick={event => event.preventDefault()}
        >
          <IconSwitchHorizontal
            className={'linkIcon text-gray-600 dark:text-gray-400 mr-2 w-6 h-6'}
            stroke={1.5}
          />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={
            'link flex items-center text-sm text-gray-700 dark:text-gray-100 py-1 px-2 rounded-sm font-medium'
          }
          onClick={event => event.preventDefault()}
        >
          <IconLogout
            className={'linkIcon text-gray-600 dark:text-gray-400 mr-2 w-6 h-6'}
            stroke={1.5}
          />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
