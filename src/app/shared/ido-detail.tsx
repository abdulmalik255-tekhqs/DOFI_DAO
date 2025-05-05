'use client';

import { useRouter } from 'next/navigation';
import { FaCube, FaDollarSign, FaGlobe, FaLayerGroup, FaLink } from 'react-icons/fa6';
import { TbSticker2 } from "react-icons/tb";
import { GiMeshNetwork } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import Confetti from 'react-confetti';
import { Globe } from 'lucide-react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
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
import { useEffect, useState } from 'react';
import { useBuyShareIDO, useGetIDODetail } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import ToastNotification from '@/components/ui/toast-notification';
import { config } from '@/app/shared/wagmi-config';

const IDODetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const { loading } = useSelector((state: any) => state.ido);
  const { idoDetaildata, isConfetti } = useSelector((state: any) => state.ido);
  const { writeContractAsync } = useWriteContract();
  console.log(idoDetaildata, "idoDetaildata");

  const {
    mutate: idodetail,
    data: searchResult,
    isSuccess,
    isError,
    error,
  } = useGetIDODetail();
  //@ts-ignore
  const { mutate: buyShareIDO } = useBuyShareIDO();

  const { layout } = useLayout();
  //@ts-ignore
  const pricePerToken = parseFloat(searchResult?.data?.pricePerToken || '0');

  // Handle raw input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow only numeric values and optional dot
    if (/^\d*\.?\d*$/.test(raw)) {
      setInputValue(raw);
    }
  };

  const totalPrice = (parseFloat(inputValue) || 0) * pricePerToken;
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

  useEffect(() => {
    if (idoDetaildata?._id) {
      idodetail(idoDetaildata._id);
    }
  }, [idoDetaildata?._id]);
  useEffect(() => {
    //@ts-ignore
    const endTime = new Date(searchResult?.data?.endTime).getTime();
    const now = Date.now();
    setIsExpired(now > endTime);
  }, [searchResult]);
  const handleBuyShare = async () => {
    try {
      if (!inputValue) {
        ToastNotification('error', 'Enter Amount');
        return;
      }
      //@ts-ignore
      if (!searchResult?.data?._id) {
        ToastNotification('error', 'IDO ID is missing');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0x04568e30d14de553921B305BE1165fc8F9a26E94',
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
          parseUnits(totalPrice?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        buyShareIDO({
          //@ts-ignore
          id: idoDetaildata?._id,
          data: { amount: inputValue },
        });
      } else {
        dispatch(idoActions.setLoading(false));
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
      console.error('Buy Share failed:', error);
    }
  };
  const getRemaniningAlloction = (funds:any,price:any,supply:any) => {
    console.log(funds,"funds");
    console.log(price,"funds");
    console.log(supply,"funds");
    
    let values = Number(funds)/Number(price);    
    let remaningValue=  Math.floor(Number(supply) - Number(values))  ;    
    return remaningValue
  }
  return (
    // <>
    //   <h3 className="flex items-center justify-center text-[30px] font-bold uppercase tracking-wide text-gray-800 dark:text-gray-100">
    //     Domain Initinal Offering
    //   </h3>
    //   <div className="mx-auto w-full max-w-[1160px] text-sm md:pt-14 4xl:pt-24">
    //     <div className="flex w-full justify-between gap-6 mb-6">
    //       <div className="flex w-[40%] flex-col justify-center">
    //         <h3 className="text-sm font-bold uppercase tracking-wide text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
    //           {
    //             //@ts-ignore
    //             searchResult?.data?.name
    //           }
    //         </h3>
    //         <p className="font-regular text-gray-400 md:text-base">
    //           {
    //             //@ts-ignore
    //             searchResult?.data?.description
    //           }
    //         </p>
    //       </div>
    //       <motion.div
    //         whileTap={{ scale: 0.98 }}
    //         whileHover={{ scale: 1.015 }}
    //         // onClick={() =>
    //         //   router.push(
    //         //     (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
    //         //       routes.proposals,
    //         //   )
    //         // }
    //         className={cn(
    //           'flex w-[50%] border-[#14161A] border-b-4  rounded-[10px] shadow-xl cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
    //         )}
    //       >
    //         <div className="w-full" >
    //           {idoDetaildata?.status === 'successful' ? (
    //             <>
    //               <div className="flex w-full items-center justify-center border-b border-black p-2">
    //                 <div className="jusity-center flex w-[40%] flex-col items-center">
    //                   <p className="text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
    //                     investors
    //                   </p>
    //                 </div>
    //               </div>
    //               <div className="w-full overflow-x-auto">
    //                 <table className="min-w-full text-left text-sm">
    //                   <thead>
    //                     <tr className="border-b border-gray-300 dark:border-gray-700">
    //                       <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
    //                         Amount
    //                       </th>
    //                       <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
    //                         Wallet
    //                       </th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {idoDetaildata?.investors?.length > 0 ? (
    //                       idoDetaildata?.investors.map(
    //                         (inv: any, idx: number) => (
    //                           <tr
    //                             key={idx}
    //                             className="border-b border-gray-200 dark:border-gray-800"
    //                           >
    //                             <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
    //                               {inv.amount}
    //                             </td>
    //                             <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
    //                               {inv.user?.wallet}
    //                             </td>
    //                           </tr>
    //                         ),
    //                       )
    //                     ) : (
    //                       <tr>
    //                         <td className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
    //                           No investors found.
    //                         </td>
    //                       </tr>
    //                     )}
    //                   </tbody>
    //                 </table>
    //               </div>
    //             </>
    //           ) : (
    //             <>
    //               <div className="flex w-full items-center justify-between border-b border-black p-2">
    //                 <div className="jusity-start flex w-[40%] flex-col items-start">
    //                   <p className="text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
    //                     Total Raised
    //                   </p>
    //                   <div className="flex justify-start">
    //                     DOFI
    //                   </div>
    //                 </div>
    //                 <div className="flex gap-2">
    //                   <input
    //                     disabled={isExpired}
    //                     type="number"
    //                     value={inputValue}
    //                     onChange={handleInputChange}

    //                     className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500"
    //                     placeholder="Enter Amount"
    //                   />
    //                   <Button
    //                     size="small"
    //                     shape="rounded"
    //                     className="uppercase xs:tracking-widest"
    //                     onClick={() => handleBuyShare()}
    //                     disabled={loading || isExpired}
    //                   >
    //                     {loading ? (
    //                       <>
    //                         <BeatLoader color="#000" />
    //                       </>
    //                     ) : (
    //                       'Buy Share'
    //                     )}
    //                   </Button>
    //                 </div>
    //               </div>
    //               <div className="w-full">
    //                 {/* <div className="flex w-full items-center justify-between p-2">
    //             <p>0 / 100,000 USDT</p>
    //             <p>Progress %</p>
    //           </div>
    //           <div>
    //             <VotePoll
    //               title={''}
    //               //@ts-ignore
    //               accepted={vote?.accepted}
    //               //@ts-ignore
    //               rejected={vote?.rejected}
    //             />
    //           </div> */}
    //                 <div className="flex w-full items-center justify-between p-2">
    //                   <p className="text-base font-normal">Limited</p>
    //                   <p className="text-base font-normal">
    //                     PARTICIPANTS:{' '}
    //                     {
    //                       //@ts-ignore
    //                       searchResult?.data?.investors?.length
    //                     }
    //                   </p>

    //                 </div>
    //                 <div className="flex w-full flex-col items-start justify-start p-2">
    //                   <p className="text-base font-normal">
    //                     Total Allocation:{' '}
    //                     {
    //                       //@ts-ignore
    //                       searchResult?.data?.totalSupply *
    //                       //@ts-ignore
    //                       searchResult?.data?.pricePerToken
    //                     }
    //                   </p>
    //                   <p className="text-base font-normal">
    //                     Remaining Allocation:{' '}
    //                     {
    //                       //@ts-ignore
    //                       (searchResult?.data?.totalSupply ?? 0) *
    //                       //@ts-ignore
    //                       (searchResult?.data?.pricePerToken ?? 0) -
    //                       //@ts-ignore
    //                       (searchResult?.data?.fundsRaised ?? 0)
    //                     }
    //                   </p>
    //                   <p className="text-base font-normal">
    //                     Price Per Token:{' '}
    //                     {
    //                       //@ts-ignore
    //                       totalPrice ? totalPrice : searchResult?.data?.pricePerToken 
    //                     }
    //                   </p>
    //                 </div>
    //                 {isExpired === false && (
    //                   <>
    //                     <div className="flex w-full flex-col items-start justify-start p-2">
    //                       <h3 className="text-gray-400 md:text-base md:font-medium md:uppercase md:text-gray-900 dark:md:text-gray-100 2xl:text-lg">
    //                         DIO ends in
    //                       </h3>
    //                       <AuctionCountdown
    //                         date={
    //                           new Date(
    //                             //@ts-ignore
    //                             searchResult?.data?.endTime?.toString(),
    //                           )
    //                         }
    //                       />
    //                     </div>
    //                   </>
    //                 )}
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       </motion.div>
    //     </div>
    //     <div
    //       className={cn('grid', {
    //         'grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3':
    //           layout !== LAYOUT_OPTIONS.RETRO,
    //         'grid-cols-2 gap-6 xs:grid-cols-4 lg:grid- cols-6 3xl:grid-rows-1':
    //           layout === LAYOUT_OPTIONS.RETRO,
    //       })}
    //     >
    //       <div>
    //         <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
    //           Token Information
    //         </h2>
    //         <motion.div
    //           whileTap={{ scale: 0.98 }}
    //           whileHover={{ scale: 1.015 }}
    //           onClick={() =>
    //             router.push(
    //               (layout === LAYOUT_OPTIONS.MODERN
    //                 ? ''
    //                 : routes.home + layout) + routes.proposals,
    //             )
    //           }
    //           className={cn(
    //             'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
    //             {
    //               'xs:col-span-2 sm:col-auto sm:row-span-2':
    //                 layout !== LAYOUT_OPTIONS.RETRO,
    //               'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
    //                 layout === LAYOUT_OPTIONS.RETRO,
    //             },
    //           )}
    //         >
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               TOKEN TICKER
    //             </h3>
    //             <p className="flex items-center text-sm  uppercase font-regular text-gray-400 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               AIVAX
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               TOKENS FOR SALE
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               100,000,000
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               NETWORK
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               AVAX
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="dark:text-gray-100g text-[12px] font-semibold uppercase text-gray-800">
    //               TOKEN ADDRESS
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               TBA
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               DECIMALS
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               18
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               INITIAL MARKET CAP
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               $1,000,000
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               INITIAL CIRCULATING SUPPLY
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               1,000,000,000
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               TOTAL TARGET RAISE AT SEEDIFY
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               $100,000
    //             </p>
    //           </div>
    //         </motion.div>
    //       </div>

    //       <div>
    //         <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
    //           Pool Information
    //         </h2>
    //         <motion.div
    //           whileTap={{ scale: 0.98 }}
    //           whileHover={{ scale: 1.015 }}
    //           onClick={() =>
    //             router.push(
    //               (layout === LAYOUT_OPTIONS.MODERN
    //                 ? ''
    //                 : routes.home + layout) + routes.proposals,
    //             )
    //           }
    //           className={cn(
    //             'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
    //             {
    //               'xs:col-span-2 sm:col-auto sm:row-span-2':
    //                 layout !== LAYOUT_OPTIONS.RETRO,
    //               'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
    //                 layout === LAYOUT_OPTIONS.RETRO,
    //             },
    //           )}
    //         >
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               TOKEN DISTRIBUTION
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               Linear
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               MIN ALLOCATION
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               $0 USDT
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               MAX ALLOCATION
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               $0 USDT
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="dark:text-gray-100g text-[12px] font-semibold uppercase text-gray-800">
    //               ACCESS TYPE
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               Public
    //             </p>
    //           </div>
    //         </motion.div>
    //       </div>

    //       <div>
    //         <h2 className="mb-2 mt-6 text-center text-sm font-bold uppercase text-gray-800 dark:text-gray-100 sm:text-base 3xl:text-[25px]">
    //           Vesting Information
    //         </h2>
    //         <motion.div
    //           whileTap={{ scale: 0.98 }}
    //           whileHover={{ scale: 1.015 }}
    //           onClick={() =>
    //             router.push(
    //               (layout === LAYOUT_OPTIONS.MODERN
    //                 ? ''
    //                 : routes.home + layout) + routes.proposals,
    //             )
    //           }
    //           className={cn(
    //             'flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark',
    //             {
    //               'xs:col-span-2 sm:col-auto sm:row-span-2':
    //                 layout !== LAYOUT_OPTIONS.RETRO,
    //               'col-span-6 sm:row-span-4 md:row-span-1 3xl:col-span-2 3xl:row-span-2':
    //                 layout === LAYOUT_OPTIONS.RETRO,
    //             },
    //           )}
    //         >
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               TGE
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               06/02/2025 00:00 UTC
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               AMOUNT UNLOCKED AT TGE
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               100%
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               VESTING PERCENTAGE
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               0%
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="dark:text-gray-100g text-[12px] font-semibold uppercase text-gray-800">
    //               VESTING TIME (MONTHS)
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               --
    //             </p>
    //           </div>
    //           <div className="flex w-full justify-between">
    //             <h3 className="text-[12px] font-semibold uppercase text-gray-800 dark:text-gray-100">
    //               CLIFF (MONTHS)
    //             </h3>
    //             <p className="flex items-center text-sm font-regular text-gray-400 uppercase  transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
    //               --
    //             </p>
    //           </div>
    //         </motion.div>
    //       </div>
    //     </div>
    //   </div>
    //   {isConfetti && (
    //     <div
    //       style={{
    //         position: 'fixed',
    //         top: 0,
    //         left: 0,
    //         width: '100%',
    //         height: '100%',
    //         zIndex: 9999,
    //         pointerEvents: 'none',
    //       }}
    //     >
    //       <Confetti
    //         width={window.innerWidth}
    //         height={window.innerHeight}
    //         numberOfPieces={500}
    //       />
    //     </div>
    //   )}
    // </>
<>

    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h3 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Domain Initial Offering
        </h3>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Participate in exclusive DIOs and become an early supporter of domain-backed projects.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <div className="rounded-2xl bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 shadow-xl p-6 transition-all duration-300">
            <h3 className="text-xl flex gap-2 items-center font-bold mb-2 text-white">
              <Globe className="w-5 h-5 text-white" />
              {searchResult?.data?.name}
            </h3>
            <p className="text-white">
              {searchResult?.data?.description}
            </p>
          </div>


          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.015 }}
            className="rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between"
          >
            {idoDetaildata?.status !== 'active' ? (
              <>
                <div>
                   {/* Progress Bar */}
                   <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
                      <p>
                        <strong>Fund Raised</strong>
                      </p>
                      <span>
                        {(
                          ((searchResult?.data?.fundsRaised ?? 0) /
                            ((searchResult?.data?.totalSupply ?? 0) *
                              (searchResult?.data?.pricePerToken ?? 1))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-500"
                        style={{
                          width: `${((searchResult?.data?.fundsRaised ?? 0) /
                            ((searchResult?.data?.totalSupply ?? 0) *
                              (searchResult?.data?.pricePerToken ?? 1))) *
                            100
                            }%`,
                        }}
                      />
                    </div>
                  </div>
                  <h4 className="text-lg  mt-4 font-medium text-gray-900 dark:text-white mb-2 text-center uppercase">
                    Investors
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300 dark:border-gray-600">
                          <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                            Amount
                          </th>
                          <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200">
                            Wallet
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {idoDetaildata?.investors?.length > 0 ? (
                          idoDetaildata?.investors.map((inv: any, idx: number) => (
                            <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="px-4 py-2 text-gray-800 dark:text-white">{inv.amount}</td>
                              <td className="px-4 py-2 text-gray-800 dark:text-white">{inv.user?.wallet}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                              No investors found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-300 pb-4">
                    <div>
                      <p className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
                        Total Raised
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">DOFI</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        disabled={isExpired}
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter Amount"
                      />
                      <Button
                        size="small"
                        shape="rounded"
                        onClick={() => handleBuyShare()}
                        disabled={loading || isExpired}
                        className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                      >
                        {loading ? <BeatLoader color="#fff" size={8} /> : 'Buy Share'}
                      </Button>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
                      <p>
                        <strong>Fund Raised</strong>
                      </p>
                      <span>
                        {(
                          ((searchResult?.data?.fundsRaised ?? 0) /
                            ((searchResult?.data?.totalSupply ?? 0) *
                              (searchResult?.data?.pricePerToken ?? 1))) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-black transition-all duration-500"
                        style={{
                          width: `${((searchResult?.data?.fundsRaised ?? 0) /
                            ((searchResult?.data?.totalSupply ?? 0) *
                              (searchResult?.data?.pricePerToken ?? 1))) *
                            100
                            }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <p>
                      <strong>Participants:</strong> {searchResult?.data?.investors?.length}
                    </p>
                    <p>
                      <strong>Total Allocation:</strong>{' '}
                      {searchResult?.data?.totalSupply}
                    </p>
                    <p>
                      <strong>Remaining Allocation:</strong>{' '}
                      {
                      //@ts-ignore
                      getRemaniningAlloction(searchResult?.data?.fundsRaised,searchResult?.data?.pricePerToken,searchResult?.data?.totalSupply)
                      }
                    </p>
                    <p>
                      <strong>Price Per Token:</strong>{' '}
                      {searchResult?.data?.pricePerToken}
                      {/* {totalPrice ?? searchResult?.data?.pricePerToken} */}
                    </p>
                  </div>

                  {!isExpired && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mt-4">
                        DIO ends in:
                      </h4>
                      <AuctionCountdown
                        date={new Date(searchResult?.data?.endTime?.toString())}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-center uppercase text-dark dark:text-white mb-6">
            Token Information
          </h2>
          <motion.div
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.015 }}
            onClick={() =>
              router.push(
                (layout === 'MODERN' ? '' : routes.home + layout) + routes.proposals
              )
            }
            className="rounded-xl bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 text-white shadow-lg p-6 cursor-pointer hover:shadow-2xl"
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
              <TbSticker2 color='#fff'/>
                Token Ticker
              </h3>
              <p className="text-sm uppercase text-white">DOFI SHARE</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
              <FcSalesPerformance className="text-gray-800" color='#fff'/>
                Tokens for Sale
              </h3>
              <p className="text-sm uppercase text-white">{searchResult?.data?.name} Fraction</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
                  <FaDollarSign className="text-gray-800" color='#fff'/>
                Total Supply
              </h3>
              <p className="text-sm uppercase text-white">{searchResult?.data?.totalSupply} DFS</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400"> <FaCube color='#fff' className="text-gray-800" /> Token Type</h3>
              <p className="text-sm uppercase text-white">ERC1155</p>
            </div>
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2  uppercase text-gray-400"><GiMeshNetwork color='#fff' className="text-gray-800"/> Network</h3>
              <p className="text-sm uppercase text-white">Base Sepolia</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
      {isConfetti && (
        <div
          style={{
             position: 'fixed',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             zIndex: 9999,
             pointerEvents: 'none',
          }}
       >
          <Confetti
           width={window.innerWidth}
           height={window.innerHeight}
           numberOfPieces={500}
           />
         </div>
      )}
    </>
  );
};

export default IDODetailPage;
