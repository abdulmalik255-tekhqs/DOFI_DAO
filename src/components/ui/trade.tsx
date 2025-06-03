'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import cn from '@/utils/cn';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import ActiveLink from '@/components/ui/links/active-link';
import AnchorLink from '@/components/ui/links/anchor-link';
import { RangeIcon } from '@/components/icons/range-icon';
import { ExportIcon } from '@/components/icons/export-icon';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useLayout } from '@/lib/hooks/use-layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { coinList } from '@/data/static/coin-list';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ArbitragePage from './arbitrage';
// dynamic import
const Listbox = dynamic(() => import('@/components/ui/list-box'));

const tradeMenu: any = [
  // {
  //   name: 'Liquidity',
  //   value: routes.liquidity,
  // },
  // {
  //   name: 'Vote',
  //   value: routes.vote,
  // },
];

function ActiveNavLink({ href, title, isActive, className }: any) {
  const { layout } = useLayout();
  return (
    <ActiveLink
      href={{
        pathname:
          (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) + href,
      }}
      className={cn(
        'relative z-[1] inline-flex items-center px-3 py-1.5',
        className,
      )}
      activeClassName="font-medium text-white"
    >
      <span>{title}</span>
      {isActive && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 -z-[1] h-full w-full rounded-lg bg-brand shadow-large"
          layoutId="activeNavLinkIndicator"
        />
      )}
    </ActiveLink>
  );
}

export default function Trade({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { layout } = useLayout();
  const pathname =
    routes.home +
    usePathname()
      ?.split('/')
      .slice(layout === LAYOUT_OPTIONS.MODERN ? 1 : 2)
      .join('/');
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const currentPath = tradeMenu.findIndex(
    (item: any) => item.value === pathname,
  );
  let [selectedMenuItem, setSelectedMenuItem] = useState(tradeMenu[0]);
  function handleRouteOnSelect(path: string) {
    router.push(path);
  }
  useEffect(() => {
    setSelectedMenuItem(tradeMenu[currentPath]);
  }, [currentPath]);
  const tabMenu = [
    {
      title: 'Swap',
      path: 'swap',
    },
    {
      title: 'Arbitrage',
      path: 'arbitrage',
    },
  ];
  return (
    <div>
      <div className="pt-8 text-sm xl:pt-10">
        <div className="mb-[32px] flex flex-col items-center justify-center">
          <h2 className="mb-2 text-[36px] font-[700] uppercase text-[#0F172A]">
            DOFI DEX
          </h2>
          <p className="mt-[12px] flex items-center text-[14px] font-[400] text-[#334155]">
            Seamlessly swap NFTs across multiple blockchain networks with
            real-time
          </p>
          <p className="flex items-center text-[14px] font-[400] text-[#334155]">
            valuation and gas fee optimization to ensure accurate and secure
          </p>
          <p className="flex items-center text-[14px] font-[400] text-[#334155]">
            transactions.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[658px] rounded-[20px] border border-[#E2E8F0] bg-white p-5 xs:p-6 xs:pt-5">
          <ParamTab tabMenu={tabMenu}>
            <TabPanel className="focus:outline-none">
              <div className="flex items-center justify-between">
                <h1 className="mb-6 text-[20px] font-[500]">
                  Swap Domain Fractions
                </h1>
                <div className="mb-6 flex items-center gap-[5px]">
                  {coinList?.map((coin, index) => (
                    <div key={index} className="h-4 w-4">
                      {React.cloneElement(coin.icon, {
                        className: 'w-full h-full',
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <AnimatePresence mode={'wait'}>
                <motion.div
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  variants={fadeInBottom('easeIn', 0.25)}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </TabPanel>
            <TabPanel className="focus:outline-none">
              <div className="flex items-center justify-between"></div>
              <AnimatePresence mode={'wait'}>
                <motion.div
                  initial="exit"
                  animate="enter"
                  exit="exit"
                  variants={fadeInBottom('easeIn', 0.25)}
                >
                  <ArbitragePage />
                </motion.div>
              </AnimatePresence>
            </TabPanel>
          </ParamTab>
        </div>
      </div>
    </div>
  );
}
