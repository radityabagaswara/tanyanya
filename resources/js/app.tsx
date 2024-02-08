import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { RouteContext } from '@/Hooks/useRoute';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#4B5563',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      // @ts-ignore
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    return root.render(
      <RouteContext.Provider value={(window as any).route}>
        <MantineProvider
          theme={{
            colors: {
              'tanya-pink': [
                '#FF7DB6',
                '#FF669F',
                '#FF4E88',
                '#FB4983',
                '#D8416F',
                '#B5375A',
                '#912D45',
                '#6E2331',
                '#4B192C',
                '#280F18',
              ],
            },
            primaryColor: 'tanya-pink',
            primaryShade: 3,

            fontFamily: 'Inter, sans-serif',
          }}
        >
          <Notifications />

          <App {...props} />
        </MantineProvider>
      </RouteContext.Provider>,
    );
  },
});
