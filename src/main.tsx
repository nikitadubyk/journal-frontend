import 'dayjs/locale/ru';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Provider } from 'react-redux';
import '@mantine/notifications/styles.css';
import { createRoot } from 'react-dom/client';
import { DatesProvider } from '@mantine/dates';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import App from './App.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <MantineProvider>
      <DatesProvider settings={{ locale: 'ru' }}>
        <Notifications />
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </DatesProvider>
    </MantineProvider>
  </Provider>
);
