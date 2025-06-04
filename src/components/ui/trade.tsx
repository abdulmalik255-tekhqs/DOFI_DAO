'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { coinList } from '@/data/static/coin-list';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ArbitragePage from './arbitrage';

export default function Trade({ children }: React.PropsWithChildren<{}>) {
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
            transactions.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[658px] rounded-[20px] border border-[#E2E8F0] bg-white p-5 xs:p-6 xs:pt-5">
          <ParamTab tabMenu={tabMenu}>
            <TabPanel className="focus:outline-none">
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-[500]">
                  Swap Domain Fractions
                </h1>
                <div className="flex items-center gap-[5px]">
                  {coinList?.map((coin, index) => (
                    <div key={index} className="h-4 w-4">
                      {React.cloneElement(coin.icon, {
                        className: 'w-full h-full',
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-[24px] border-b border-[#CBD5E1]"></div>
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
