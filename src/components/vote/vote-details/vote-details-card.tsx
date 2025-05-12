'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
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
import { usePostVote, usePostVoteUpdated } from '@/hooks/livePricing';
import { useQueryClient } from '@tanstack/react-query';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';
import ToastNotification from '@/components/ui/toast-notification';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

function VoteActionButton({ vote, data }: any) {
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const { loading } = useSelector((state: any) => state.ido);
  const dispatch = useDispatch();
  const params = usePathname();

  const { writeContractAsync } = useWriteContract();
  const { mutate: submitCreate, isError, error } = usePostVote(params);
  const { mutate: submitCreateupdated } = usePostVoteUpdated(params);

  // For Dofi Dao vote Cast
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
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0xA50673D518847dF8A5dc928B905c54c35930b949',
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
  // For Domain Dao vote Cast
  const handleSubmitUpdated = async (isFavour: any) => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect your wallet first!');
        return;
      }
      dispatch(idoActions.setLoading(true));
      submitCreateupdated({
        //@ts-ignore
        inFavor: isFavour,
        proposalId: vote?._id,
        address: address?.toLowerCase(),
      });



    } catch (error) {
      dispatch(idoActions.setLoading(false));
      console.log(error);
    }
  };
  console.log("data--->", data)
  return (
    <div className="mt-4 flex flex-col items-center gap-3 xs:mt-6 xs:inline-flex md:mt-10">
      {(vote?.status == 'active' && data?.votePower < 1 && !vote?.hasVoted) && (
        <div className="">
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
        size="medium"
        fullWidth={true}
        className="flex-1 xs:flex-auto"
        disabled={vote?.status != 'active' || vote?.hasVoted || loading}
        onClick={() => {
          if (data?.votePower > 1) {
            handleSubmitUpdated('yes')
          } else {
            handleSubmit('yes')
          }
        }}
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
        size="medium"
        fullWidth={true}
        className="flex-1 xs:flex-auto"
        disabled={vote?.status != 'active' || vote?.hasVoted}
        onClick={() => handleSubmit('no')}
      >
        Reject
      </Button>
    </div>
  );
}

export default function VoteDetailsCard({ vote, data }: any) {
  console.log(vote, "votevote");

  const [isExpand, setIsExpand] = useState(false);
  const { layout } = useLayout();
  const getRemainingallocation = () => {
    const allocationvalue = Math.floor((vote?.totalFractions) - (vote?.amountRaised / vote?.pricePerFraction));
    return allocationvalue;
  }
  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-[12px]  bg-white p-5 transition-shadow duration-200 dark:bg-light-dark xs:p-6 xl:p-4',
        isExpand ? 'border-[#E2E8F0] border' : 'border-[#E2E8F0] border',
      )}
    >
      <motion.div
        layout
        className={cn('flex w-full flex-col-reverse mb-[32px] justify-between', {
          'md:grid md:grid-cols-3': layout !== LAYOUT_OPTIONS.RETRO,
          'lg:grid lg:grid-cols-3': layout === LAYOUT_OPTIONS.RETRO,
        })}
      >

        <div className="self-start md:col-span-2">
          <div
            className={`hidden md:flex mb-[32px] flex gap-[8px] capitalize h-[33px] w-[120px] items-center justify-center rounded-[50px] text-[16px] font-[400] 
              ${vote?.status === 'approved'
                ? 'bg-[#DBEAFE] text-[#3B82F6] border border-[#3B82F6]'
                : vote?.status === 'rejected'
                  ? 'bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]'
                  : vote?.status === 'active'
                    ? 'bg-[#DCFCE7] text-[#22C55E] border border-[#22C55E]'
                    : 'bg-gray-100 text-gray-800 border border-gray-300'
              }`}
          >
            <span className="h-[8px] w-[8px] rounded-full bg-current"></span>
            {vote?.status}
          </div>
          <div className='flex items-center flex-wrap'>
            <span
              onClick={() => setIsExpand(!isExpand)}
              className="capitalize cursor-pointer text-[#000000] font-[500] leading-normal text-[16px] md:text-[20px] pr-[12px] md:pr-[16px]"
            >
              {vote?.name}
            </span>
            <span className="border-l border-l-[#64748B] text-[14px] md:text-[16px] text-[#475569] font-[400] pl-[12px] md:pl-[16px] pr-[12px] md:pr-[16px]">
              {" "}DAO: {vote?.parentDAO?.name || vote?.childDAO?.name}
            </span>
            <span className="border-l border-l-[#64748B] text-[14px] md:text-[16px] text-[#475569] font-[400] pl-[12px] md:pl-[16px]">
              {" "}{vote?.nftId?.name}
            </span>
          </div>


          {/* <p className="mt-2 text-gray-600 dark:text-gray-400">
            DAO: {vote?.parentDAO?.name || vote?.childDAO?.name}
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {vote?.nftId?.name}
          </p> */}
          <h3 className="mt-[20px] flex justify-start text-[#1E293B] md:text-base font-[400] 2xl:text-[16px]">
            Time Remaining:
          </h3>
          {vote.status == 'active' ? (
            <div
              className={cn(
                "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b  before:border-gray-200 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ltr:before:left-0 rtl:before:right-0",
                // {
                //   'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 ltr:xl:pl-3 rtl:md:pr-5 rtl:xl:pr-3':
                //     layout !== LAYOUT_OPTIONS.RETRO,
                //   'mb-5 pb-5 before:h-[1px] before:w-full lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:pl-0 ltr:lg:pl-3 rtl:lg:pr-3':
                //     layout === LAYOUT_OPTIONS.RETRO,
                // },
              )}
            >
              <AuctionCountdown
                date={new Date(vote?.expirationDate.toString())}
              />
            </div>
          ) : (
            <div
              className={cn(
                "before:content-[' '] relative grid h-full gap-2 before:absolute before:bottom-0 before:border-b  before:border-gray-200 dark:border-gray-700 dark:before:border-gray-700 xs:gap-2.5 ltr:before:left-0 rtl:before:right-0",
                // {
                //   'mb-5 pb-5 before:h-[1px] before:w-full md:mb-0 md:pb-0 md:before:h-full md:before:w-[1px] ltr:md:pl-5 ltr:xl:pl-3 rtl:md:pr-5 rtl:xl:pr-3':
                //     layout !== LAYOUT_OPTIONS.RETRO,
                //   'mb-5 pb-5 before:h-[1px] before:w-full lg:mb-0 lg:pb-0 lg:before:h-full lg:before:w-[1px] ltr:pl-0 ltr:lg:pl-3 rtl:lg:pr-3':
                //     layout === LAYOUT_OPTIONS.RETRO,
                // },
              )}
            >
              <h3 className="mt-[8px]  flex justify-start text-[#1E293B] md:text-base md:font-[500]  2xl:text-[20px">
                Voting Ended
              </h3>
              {/* <AuctionCountdown date={undefined} /> */}
            </div>
          )}
        </div>


        <div className='flex flex-col justify-between items-start md:items-end mb-10 md:mb-0'>
          <div className='flex md:hidden w-full flex justify-between'>
            <div
              className={` mb-[32px] flex gap-[8px] capitalize h-[33px] w-[120px] items-center justify-center rounded-[50px] text-[16px] font-[400] 
              ${vote?.status === 'approved'
                  ? 'bg-[#DBEAFE] text-[#3B82F6] border border-[#3B82F6]'
                  : vote?.status === 'rejected'
                    ? 'bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444]'
                    : vote?.status === 'active'
                      ? 'bg-[#DCFCE7] text-[#22C55E] border border-[#22C55E]'
                      : 'bg-gray-100 text-gray-800 border border-gray-300'
                }`}
            >
              <span className="h-[8px] w-[8px] rounded-full bg-current"></span>
              {vote?.status}
            </div>
            <div>
            <p className='text-[#475569] text-[16px] font-[400] '>{formatDistanceToNow(new Date(vote?.creationDate), { addSuffix: true })}</p>
            {/* <p className='text-[#475569] text-[16px] font-[400] '>{vote?.creationDate}</p> */}
          </div>
          </div>

          <div className='hidden md:flex'>
            <p className='text-[#475569] text-[16px] font-[400] '>{formatDistanceToNow(new Date(vote?.creationDate), { addSuffix: true })}</p>
            {/* <p className='text-[#475569] text-[16px] font-[400] '>{vote?.creationDate}</p> */}
          </div>
          {
            !isExpand ? (<>
              <div className=''>
                <VotePoll title={''} vote={vote} />
              </div>

            </>) : null
          }
          {!isExpand ? (
            <Button
              onClick={() => setIsExpand(!isExpand)}

              className="w-full  xs:w-auto"
              shape="rounded"
            >
              Vote Now
            </Button>
          ) : (
            <VoteActionButton vote={vote} data={data} />
          )}
        </div>
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
            <hr />
            <div
              className={cn('flex flex-col md:flex-row w-full mt-[28px] mb-[28px] justify-between')}
            >
              <div className='md:border-r md:border-r-[#CBD5E1] w-full md:w-[48%]' >
                <div className="mt-4 text-[#64748B] text-[14px] font-[400] ">
                  Proposed by:{' '}
                  <span className="font-[400] text-black">
                    <a
                      // href={vote.proposed_by.link}
                      className="ml-1 inline-flex items-center gap-3 font-[400] text-black hover:underline hover:opacity-90 focus:underline focus:opacity-90 dark:text-gray-100"
                    >
                      {vote?.creatorAddress
                        ? `${vote.creatorAddress.slice(0, 5)}...${vote.creatorAddress.slice(-5)}`
                        : ''}
                      {/* <ExportIcon className="h-auto w-3" /> */}
                    </a>
                  </span>
                </div>

                {vote?.parentDAO ? (
                  <>
                    {/* <div className="mt-4 text-[#64748B] text-[14px] font-[400] ">
                      Leasing Address:{' '}
                      <span className="font-[400] text-black">
                        {vote?.leasingAddress || "0x"}
                      </span>
                    </div>
                    <div className="mt-4 text-[#64748B] text-[14px] font-[400]">
                      Percentage Yield :{' '}
                      <span className="font-[400] text-black">
                        {vote?.percentageYield || "0"}
                      </span>
                    </div> */}
                    <div className="mt-4 text-[#64748B] text-[14px] font-[400]">
                      Acceptacnce Criteria:{' '}
                      <span className="font-[400] text-black">
                        {"$DOFI 100"}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-4 text-[#64748B] text-[14px] font-[400]">
                      Leasing address:{' '}
                      <span className="font-[400] text-black">
                      {vote?.leasingAddress.slice(0, 5)}...
                      {vote?.leasingAddress.slice(-5)}
                      </span>
                    </div>
                    <div className="mt-4">
                      Yield percentage:{' '}
                      <span className="font-[400] text-black">
                        {vote?.yieldPercentage || 3}
                      </span>
                    </div>
                    {data?.votePower > 1 ? <>  <div className="mt-4">
                      Vote Weightage:{' '}
                      <span className="font-[400] text-black">
                        {/* {((data?.votePower / data?.totalSupply) * 100)?.toPrecision(3) || 0}% */}
                        {data?.votePower}
                      </span>
                    </div>
                      <div className="mt-4">
                        Acceptance Criteria <span className='text-[12px]'>(70%)</span>:{' '}
                        <span className="font-[400] text-black">
                          {/* {data?.quorum} Quorum (Total Supply {data?.totalSupply}) */}
                          {data?.quorum}
                        </span>
                      </div>
                      <div className="mt-4">
                        Total Supply:
                        <span className="font-[400] text-black">
                          {/* {data?.quorum} Quorum (Total Supply {data?.totalSupply}) */}
                          {data?.totalSupply || 0}
                        </span>
                      </div>
                    </> : <div className="mt-4">
                      Acceptance Criteria:{' '}
                      <span className="font-[400] text-black">
                        $DOFI 100
                      </span>
                    </div>}
                  </>
                )}
              </div>
              <div className=' w-full md:w-[48%] mt-4 md:mt-0'>
                <VotePoll title={'Votes'} vote={vote} />
                <VoterTable votes={vote?.votes || []} price={vote?.pricePerFraction} />
              </div>
            </div>
            <hr />
            <div
              className={cn('flex w-full flex-col-reverse justify-between mt-[32px]', {
                'md:grid md:grid-cols-3': layout !== LAYOUT_OPTIONS.RETRO,
                'lg:grid lg:grid-cols-3': layout === LAYOUT_OPTIONS.RETRO,
              })}
            >
              {/* <h4 className="mb-6 uppercase dark:text-gray-100">Description</h4> */}
              {/* <div className="mb-2">
                <RevealContent defaultHeight={250}>
                  <h5 className="mb-6 text-[#64748B] font-[400] text-[14px]">
                    Description:
                  </h5>
                  <div
                    className="dynamic-html grid gap-2 leading-relaxed text-black text-[14px] font-[400]"
                    dangerouslySetInnerHTML={{ __html: vote?.description ?? '-' }}
                  />
                </RevealContent>
              </div> */}
              <div className="mb-2">
                <RevealContent defaultHeight={250}>
                  <h5 className="mb-6 text-[#64748B] font-[400] text-[14px]">
                    Motivation:
                  </h5>
                  <div
                    className="dynamic-html grid gap-2 leading-relaxed text-black text-[14px] font-[400]"
                    dangerouslySetInnerHTML={{ __html: vote?.motivation ?? '' }}
                  />
                </RevealContent>
              </div>
              <div className="mt-2">
                <RevealContent defaultHeight={250}>
                  <h5 className="mb-6 text-[#64748B] font-[400] text-[14px]">Summary:</h5>
                  <div
                    className="dynamic-html grid gap-2 leading-relaxed text-black text-[14px] font-[400]"
                    dangerouslySetInnerHTML={{ __html: vote?.summary ?? '' }}
                  />
                </RevealContent>
              </div>
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
