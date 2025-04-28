'use client';

import {
  projectId,
  wagmiAdapter,
  wagmiMetaData,
} from '@/app/shared/wagmi-config';
import { baseSepolia } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider, cookieToInitialState } from 'wagmi';

const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig);

createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseSepolia],
  metadata: wagmiMetaData,
  projectId,
  features: {
    analytics: true,
  },
});

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      {children}
    </WagmiProvider>
  );
}
