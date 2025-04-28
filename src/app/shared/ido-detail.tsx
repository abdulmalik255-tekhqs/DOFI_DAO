'use client';

import { useRouter } from 'next/navigation';
// import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import routes from '@/config/routes';
import Image from '@/components/ui/image';
import NFT8 from '@/assets/images/coin/usdt.svg';
// static data
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import cn from '@/utils/cn';
import AuctionCountdown from '@/components/nft/auction-countdown';
import VotePoll from '@/components/vote/vote-details/vote-poll';

const IDODetailPage = () => {
  const router = useRouter();
  // const { idoDetailData } = useSelector((state: any) => state.ido);
  // console.log(idoDetailData, 'idoDetailData');

  const { layout } = useLayout();
  const vote = [
    {
      id: '1',
      title: 'PTIP 50 - Treasury Assets Management #1',
      accepted: {
        vote: 10303,
        percentage: 90,
      },
      rejected: {
        vote: 303,
        percentage: 10,
      },
      executed_at: '2022-10-01T01:02:03',
      proposed_by: {
        id: '0x9aba...0bd8',
        link: '#',
      },
      status: 'active',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1160px] text-sm md:pt-14 4xl:pt-24">
      <div>
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.015 }}
          onClick={() =>
            router.push(
              (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
                routes.proposals,
            )
          }
          className={cn(
            'flex w-[50%] cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
          )}
        >
          <div className="w-full">
            <div className="flex w-full items-center justify-between border-b border-black p-2">
              <div>
                <p>Total Raised</p>
                <div className="flex justify-center">
                  <Image alt="Vote Pool" src={NFT8} width={20} />
                  -- USDT
                </div>
              </div>
              <div className="rouned-lg bg-gray-400 p-4 text-white">
                0.001 USDT
              </div>
            </div>
            <div className="w-full">
              <div className="flex w-full items-center justify-between p-2">
                <p>0 / 100,000 USDT</p>
                <p>Progress %</p>
              </div>
              <div>
                <VotePoll
                  title={''}
                  //@ts-ignore
                  accepted={vote?.accepted}
                  //@ts-ignore
                  rejected={vote?.rejected}
                />
              </div>
              <div className="flex w-full items-center justify-between p-2">
                <p>Limited</p>
                <p>PARTICIPANTS:</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start p-2">
                <p>Total Allocation: 0</p>
                <p>Remaining Allocation: 0</p>
              </div>
              <div className="flex w-full flex-col items-start justify-start p-2">
                <h3 className="text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
                  IDO starts in
                </h3>
                <AuctionCountdown date={new Date(Date.now() + 172800000)} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div
        className={cn('grid', {
          'grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3':
            layout !== LAYOUT_OPTIONS.RETRO,
          'grid-cols-2 gap-6 xs:grid-cols-4 lg:grid-cols-6 3xl:grid-rows-1':
            layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <div>
          <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
            Token Information
          </h2>
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.015 }}
            onClick={() =>
              router.push(
                (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
                  routes.proposals,
              )
            }
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
              {
                'xs:col-span-2 sm:col-auto sm:row-span-2':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
                  layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                TOKEN TICKER
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                AIVAX
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                TOKENS FOR SALE
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                100,000,000
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                NETWORK
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                AVAX
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="dark:text-gray-100g text-[12px] font-medium uppercase text-gray-800">
                TOKEN ADDRESS
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                TBA
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                DECIMALS
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                18
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                INITIAL MARKET CAP
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                $1,000,000
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                INITIAL CIRCULATING SUPPLY
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                1,000,000,000
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                TOTAL TARGET RAISE AT SEEDIFY
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                $100,000
              </p>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
            Pool Information
          </h2>
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.015 }}
            onClick={() =>
              router.push(
                (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
                  routes.proposals,
              )
            }
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
              {
                'xs:col-span-2 sm:col-auto sm:row-span-2':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
                  layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                TOKEN DISTRIBUTION
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                Linear
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                MIN ALLOCATION
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                $0 USDT
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                MAX ALLOCATION
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                $0 USDT
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="dark:text-gray-100g text-[12px] font-medium uppercase text-gray-800">
                ACCESS TYPE
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                Public
              </p>
            </div>
          </motion.div>
        </div>

        <div>
          <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
            Vesting Information
          </h2>
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.015 }}
            onClick={() =>
              router.push(
                (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
                  routes.proposals,
              )
            }
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
              {
                'xs:col-span-2 sm:col-auto sm:row-span-2':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
                  layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                TGE
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                06/02/2025 00:00 UTC
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                AMOUNT UNLOCKED AT TGE
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                100%
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                VESTING PERCENTAGE
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                0%
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="dark:text-gray-100g text-[12px] font-medium uppercase text-gray-800">
                VESTING TIME (MONTHS)
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                --
              </p>
            </div>
            <div className="flex w-full justify-between">
              <h3 className="text-[12px] font-medium uppercase text-gray-800 dark:text-gray-100">
                CLIFF (MONTHS)
              </h3>
              <p className="leading-loose text-gray-600 dark:text-gray-400">
                --
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default IDODetailPage;
