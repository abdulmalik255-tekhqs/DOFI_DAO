'use client';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import DrawersContainer from '@/components/drawer-views/container';
import ModalsContainer from '@/components/modal-views/container';
import SettingsButton from '@/components/settings/settings-button';
import SettingsDrawer from '@/components/settings/settings-drawer';

import { QueryProvider } from './query-client-provider';
import { JotaiProvider } from './jotai-provider';
import WalletProvider from './wallet-provider';
import { ThemeProvider } from './theme-provider';
import { Provider } from 'react-redux';
import store from '@/store/store';

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <Provider store={store}>
        <QueryProvider>
          <ThemeProvider>
            <JotaiProvider>
              {/* <SettingsButton /> */}
              <SettingsDrawer />
              <Toaster position="top-center" reverseOrder={false} />
              {children}
              <Suspense fallback={null}>
                <ModalsContainer />
                <DrawersContainer />
              </Suspense>
            </JotaiProvider>
          </ThemeProvider>
        </QueryProvider>
      </Provider>
    </WalletProvider>
  );
}
