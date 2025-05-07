'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import cn from '@/utils/cn';
import { BeatLoader } from 'react-spinners';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import Button from '@/components/ui/button';
import RevealContent from '@/components/ui/reveal-content';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { Switch } from '@/components/ui/switch';
import { ExportIcon } from '@/components/icons/export-icon';
import VotePoll from '@/components/vote/vote-details/vote-poll';
import VoteActions from '@/components/vote/vote-details/vote-actions';
import VoterTable from '@/components/vote/vote-details/voter-table';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useModal } from '@/components/modal-views/context';
import { usePostVote } from '@/hooks/livePricing';
import { useQueryClient } from '@tanstack/react-query';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';
import ToastNotification from '@/components/ui/toast-notification';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

function VoteActionButton({ vote }: any) {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const { loading } = useSelector((state: any) => state.ido);
  const dispatch = useDispatch();
  const params = usePathname();

  const { writeContractAsync } = useWriteContract();
  const { mutate: submitCreate, isError, error } = usePostVote(params);
  const handleSubmit = async (isFavour: any) => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect your wallet first!');
        return;
      }
      if (!amount) {
        ToastNotification('error', 'Enter Amount!');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0xD5062eAafdAa5e5d211Ffde0327c10D2369690b6',
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
          parseUnits(amount?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
        pollingInterval: 2000,
      });
      if (recipient.status === 'success') {
        submitCreate({
          //@ts-ignore
          inFavor: isFavour,
          amount: Number(amount),
          proposalId: vote?._id,
          address: address?.toLowerCase(),
        });
      } else {
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
      console.log(error);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-3 xs:mt-6 xs:inline-flex md:mt-10">
      {vote?.status == 'active' && !vote?.hasVoted && (
        <div className="mb-8">
          <InputLabel title="Amount" important />
          <Input
            type="number"
            placeholder="Enter DOFI Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      )}

      <Button
        shape="rounded"
        color="success"
        className="flex-1 xs:flex-auto"
        disabled={vote?.status != 'active' || vote?.hasVoted || loading}
        onClick={() => handleSubmit('yes')}
      >
        {loading ? (
          <>
            <BeatLoader color="#000" />
          </>
        ) : (
          'Vote'
        )}
      </Button>
      <Button
        shape="rounded"
        color="danger"
        className="flex-1 xs:flex-auto"
        disabled={vote?.status != 'active' || vote?.hasVoted}
        onClick={() => handleSubmit('no')}
      >
        Reject
      </Button>
    </div>
  );
}

export default function VoteDetailsCard({ vote }: any) {
  const [isExpand, setIsExpand] = useState(false);
  const { layout } = useLayout();
const getRemainingallocation = () => {
 const allocationvalue=  Math.floor((vote?.totalFractions) - (vote?.amountRaised / vote?.pricePerFraction));
  return allocationvalue;
}
  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 transition-shadow duration-200 dark:bg-light-dark xs:p-6 xl:p-4',
        isExpand ? 'shadow-large' : 'shadow-card hover:shadow-large',
      )}
    >
      <motion.div
        layout
        className={cn('flex w-full flex-col-reverse justify-between', {
          'md:grid md:grid-cols-3': layout !== LAYOUT_OPTIONS.RETRO,
          'lg:grid lg:grid-cols-3': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >
        <div className="self-start md:col-span-2">
          <h3
            onClick={() => setIsExpand(!isExpand)}
            className="cursor-pointer text-base font-medium leading-normal dark:text-gray-100 2xl:text-lg capitalize"
          >
            {vote?.name}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            DAO: {vote?.parentDAO?.name || vote?.childDAO?.name}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {vote?.nftId?.name}
          </p>
          {!isExpand ? (
            <Button
              onClick={() => setIsExpand(!isExpand)}
              className="mt-4 w-full xs:mt-6 xs:w-auto md:mt-10"
              shape="rounded"
            >
              Vote Now
            </Button>
          ) : (
            <VoteActionButton vote={vote} />
          )}
        </div>
        {vote.status == 'active' ? (
          <div
            className={cn(
              "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b before:border-r before:border-dashed before:border-gray-200 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ltr:before:left-0 rtl:before:right-0",
              {
                'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 ltr:xl:pl-3 rtl:md:pr-5 rtl:xl:pr-3':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'mb-5 pb-5 before:h-[1px] before:w-full lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:pl-0 ltr:lg:pl-3 rtl:lg:pr-3':
                  layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            <h3 className="flex justify-between text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
              Voting ends in
              <div
                className={`flex capitalize h-[40px] w-[120px] items-center justify-center rounded-lg text-sm font-medium shadow-md
    ${vote?.status === 'approved'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : vote?.status === 'rejected'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : vote?.status === 'active'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
              >
                {vote?.status}
              </div>
            </h3>
            <AuctionCountdown
              date={new Date(vote?.expirationDate.toString())}
            />
          </div>
        ) : (
          <div 
            className={cn(
              "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b before:border-r before:border-dashed before:border-gray-200 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ltr:before:left-0 rtl:before:right-0",
              {
                'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 ltr:xl:pl-3 rtl:md:pr-5 rtl:xl:pr-3':
                  layout !== LAYOUT_OPTIONS.RETRO,
                'mb-5 pb-5 before:h-[1px] before:w-full lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:pl-0 ltr:lg:pl-3 rtl:lg:pr-3':
                  layout === LAYOUT_OPTIONS.RETRO,
              },
            )}
          >
            <h3 className=" flex justify-between text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
              Voting ended


              <div
                className={`flex capitalize h-[40px] w-[120px] items-center justify-center rounded-lg text-sm font-medium shadow-md
    ${vote?.status === 'approved'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : vote?.status === 'rejected'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : vote?.status === 'active'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-800 border border-gray-300'
                  }`}
              >
                {vote?.status}
              </div>
            </h3>
            <AuctionCountdown date={undefined} />
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {isExpand && (
          <motion.div
            layout
            initial="exit"
            animate="enter"
            exit="exit"
            variants={fadeInBottom('easeIn', 0.25, 16)}
          >
            <div className="my-6 border-y border-dashed border-gray-200 py-6 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              Proposed by:{' '}
              <a
                // href={vote.proposed_by.link}
                className="ml-1 inline-flex items-center gap-3 font-medium text-gray-900 hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
              >
                {vote?.creatorAddress
                  ? `${vote.creatorAddress.slice(0, 8)}...${vote.creatorAddress.slice(-8)}`
                  : ''}
                {/* <ExportIcon className="h-auto w-3" /> */}
              </a>
              {/* <div className="mt-4">
                    Total fractions:{' '}
                    <span className="font-medium text-gray-900">
                      {vote?.totalFractions || 100}
                    </span>
                  </div> */}
              {vote?.leasingAddress == '0x' ? (
                <>
                  <div className="mt-4">
                    Leasing Address:{' '}
                    <span className="font-medium text-gray-900">
                      {vote?.leasingAddress || "0x"}
                    </span>
                  </div>
                  <div className="mt-4">
                    Percentage Yield :{' '}
                    <span className="font-medium text-gray-900">
                      {vote?.percentageYield || "0"}
                    </span>
                  </div>
                  <div className="mt-4">
                  Acceptacnce Criteria:{' '}
                    <span className="font-medium text-gray-900">
                      {"50"}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4">
                    Leasing address:{' '}
                    <span className="font-medium text-gray-900">
                      {vote?.leasingAddress || '0x'}
                    </span>
                  </div>
                  <div className="mt-4">
                    Yield percentage:{' '}
                    <span className="font-medium text-gray-900">
                      {vote?.yieldPercentage || 3}
                    </span>
                  </div>
                </>
              )}
            </div>
            <VotePoll title={'Votes'} vote={vote} />
            <VoterTable votes={vote?.votes || []} price={vote?.pricePerFraction}/>
            <h4 className="mb-6 uppercase dark:text-gray-100">Description</h4>
            <div className="mb-2">
              <RevealContent defaultHeight={250}>
                <h5 className="mb-6 uppercase dark:text-gray-100">
                  Motivation
                </h5>
                <div
                  className="dynamic-html grid gap-2 leading-relaxed text-gray-600 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: vote?.motivation ?? '' }}
                />
              </RevealContent>
            </div>
            <hr />
            <div className="mt-2">
              <RevealContent defaultHeight={250}>
                <h5 className="mb-6 uppercase dark:text-gray-100">Summary</h5>
                <div
                  className="dynamic-html grid gap-2 leading-relaxed text-gray-600 dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: vote?.summary ?? '' }}
                />
              </RevealContent>
            </div>
            {/* <RevealContent
              defaultHeight={320}
              className="mt-6 border-t border-dashed border-gray-200 pt-6 dark:border-gray-700"
            >
              <VoteActions title={'Actions'} action={vote?.action} />
            </RevealContent> */}
            {/* <div className="mt-6 flex items-center justify-center border-t border-dashed border-gray-200 pt-6 dark:border-gray-700">
              <Button
                shape="rounded"
                fullWidth={true}
                className={cn({
                  'sm:w-4/6 md:w-3/6 xl:w-2/6': layout !== LAYOUT_OPTIONS.RETRO,
                  'w-full lg:w-3/6 2xl:w-[48%] 3xl:w-1/3':
                    layout === LAYOUT_OPTIONS.RETRO,
                })}
              >
                Add POOL token to MetaMask
              </Button>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
