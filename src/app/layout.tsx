import cn from '@/utils/cn';
import type { Metadata } from 'next';
import { fira_code } from './fonts';
import { RootProvider } from '@/components/providers';

// third party css files
import 'overlayscrollbars/overlayscrollbars.css';
import 'swiper/css';
import 'swiper/css/pagination';

// base css file
import '@/assets/css/range-slider.css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/globals.css';

export const metadata: Metadata = {
  title: 'DOFI DAO',
  description: 'DAO Webapp',
  icons: {
    icon: {
      url: '/dofifavicon.png',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn('light', fira_code.className)}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1 maximum-scale=1"
        />
      </head>
      <body suppressHydrationWarning>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
