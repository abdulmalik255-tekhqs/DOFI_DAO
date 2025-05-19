'use client';

import { useRouter, useParams } from 'next/navigation';
import { FaCube, FaDollarSign } from 'react-icons/fa6';
import { TbSticker2 } from "react-icons/tb";
import { readContract } from '@wagmi/core';
import { GiMeshNetwork } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import Confetti from 'react-confetti';
import { Globe } from 'lucide-react';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader, MoonLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';
import { useBuyShareIDO, useGetIDODetail } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import ToastNotification from '@/components/ui/toast-notification';
import { config } from '@/app/shared/wagmi-config';
import Image from 'next/image';
import Share from '@/assets/images/dao/Sharewhite.svg';
import CoinVertical from '@/assets/images/dao/coinvertical.svg';
import TokenSale from '@/assets/images/dao/tokensale.svg';
import TotalSupply from '@/assets/images/dao/totalsupply.svg';
import TokenType from '@/assets/images/dao/tokentype.svg';
import Network from '@/assets/images/dao/network.svg';
import { useCopyToClipboard } from 'react-use';
import routes from '@/config/routes';
import Eth from '@/assets/images/dao/eth.png';
import Shib from '@/assets/images/dao/shib.png';
import OrangeIcon from '@/assets/images/dao/orange.svg';
import BlueIcon from '@/assets/images/dao/Blue.svg';
import cn from '@/utils/cn';
import NewOrangeIcon from '@/assets/images/dao/meworange.svg';
import NewBlueIcon from '@/assets/images/dao/newblue.svg';

const IDODetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [isExpired, setIsExpired] = useState(false);
  const { isConfetti, loading, componentLoading } = useSelector((state: any) => state.ido);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const {
    mutate: idodetail,
    data: searchResult,
  }: any = useGetIDODetail();
  const { mutate: buyShareIDO } = useBuyShareIDO();
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
  useEffect(() => {
    dispatch(idoActions.setComponentloading(true))
    idodetail(params.id?.toString());
  }, [isConfetti]);
  useEffect(() => {
    const endTime = new Date(searchResult?.data?.endTime).getTime();
    const now = Date.now();
    setIsExpired(now > endTime);
  }, [searchResult]);
  const handleBuyShare = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!inputValue) {
        ToastNotification('error', 'Enter Amount');
        return;
      }
      if (Number(tokenBalance) < Number(inputValue)) {
        ToastNotification('error', 'You do not have enough DOFI token buy share!');
        return;
      }

      let remaningValue = Math.floor(Number(searchResult?.data?.totalSupply) - Number(searchResult?.data?.fundsRaised));
      if (Number(inputValue) === 0) {
        ToastNotification('error', 'Cannot buy share with 0.');
        return;
      }
      if (Number(inputValue) > remaningValue) {
        ToastNotification('error', 'Cannot buy share greater then remaining allocation');
        return;
      }

      if (!searchResult?.data?._id) {
        ToastNotification('error', 'IDO ID is missing');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({

        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0xA50673D518847dF8A5dc928B905c54c35930b949',
          parseUnits(totalPrice?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        buyShareIDO({

          id: params.id as any,
          data: { amount: inputValue },
        });
      } else {
        dispatch(idoActions.setLoading(false));
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  const getRemaniningAlloction = (funds: any, price: any, supply: any) => {
    let remaningValue = Math.floor(Number(supply) - Number(funds));
    return remaningValue
  }
  const progressBarValues = (funds: number, supply: number) => {
    const percentage = (funds / supply) * 100;
    return `${percentage.toFixed(1)}%`;

  }
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONT_END_ENDPOINT}${routes.idoDetail}/${params.id}`;
  const handleCopyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent row redirect
    copyToClipboard(shareUrl);
    ToastNotification('success', 'Now you can share DIO!');
  }
  const getTokenBalance = async (userAddress: string) => {
    try {
      const balance = await readContract(config, {
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'balanceOf',
        args: [userAddress],
      });

      const formatted = formatUnits(balance as bigint, 18);
      setTokenBalance(formatted);
    } catch (error) {
      ToastNotification('error', 'Failed to fetch token balance');
    }
  };
  useEffect(() => {
    if (address) {
      getTokenBalance(address);
    }
  }, [address]);
  const isEth = searchResult?.data?.nftID?.name?.endsWith('.eth');
  const isShib = searchResult?.data?.nftID?.name?.endsWith('.shib');
  const buttonStyles = cn(
    "w-[114px] h-[45px] rounded-[8px] px-4 py-3 text-[14px] font-[400] cursor-pointer transition-all duration-300",
    {
      // SHIB: orange-to-red gradient
      'bg-gradient-to-br from-[#DF820E] to-[#F03132] text-white border border-transparent': isShib,

      // ETH: gradient border, white background, dark text
      'bg-white text-[#221FBB]': isEth,
    }
  );
  return (
    <>
      {componentLoading ? (
        <>
          <div className="flex h-[100vh] w-full items-center justify-center">
            <MoonLoader />
          </div>{' '}
        </>
      ) : (
        <>
          <div className="min-h-screen py-6 px-4 lg:px-2">
            <div className="text-center mb-12">
              <h3 className="text-[24px] font-[700] text-[#1E293B]">
                Domain Initial Offering
              </h3>
              <p className="mt-[12px] text-[16px] text-[#1E293B] font-[400] max-w-md mx-auto">
                Participate in exclusive DIOs and become an early supporter of domain-backed projects.
              </p>
            </div>

            <div className="mx-auto w-full max-w-7xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* //changing background */}
                <div
                  className={`rounded-[12px] p-[20px] transition-all duration-300 flex flex-col justify-between bg-no-repeat ${!isEth && !isShib ? 'border border-[#E2E8F0]' : ''
                    }`}
                  style={{
                    backgroundImage: `url(${isEth ? BlueIcon.src : isShib ? OrangeIcon.src : ''})`,
                    backgroundPosition: isEth ? '100% 100%' : 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: isShib
                      ? 'linear-gradient(to bottom right, #DF820E, #F03132)' // if using gradient layer fallback
                      : undefined,
                  }}
                >
                  <div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center mb-2">
                      <h3 className="text-[14px] md:text-[20px] flex gap-2 items-center font-[500] mb-2 text-[#ffffff]">
                        <Globe className="w-5 h-5 text-white" />
                        {searchResult?.data?.name}
                        <Image
                          src={isShib ? Shib : Eth}
                          alt="Domain extension"
                          className="w-5 h-5"
                        />
                      </h3>
                      <div
                        className={`flex capitalize h-auto items-center justify-center rounded-full ${searchResult?.data?.status === 'successful'
                          ? 'bg-[#DCFCE7] text-[#22C55E] border border-[#22C55E]  text-[12px] font-[400] w-[100px] px-[12px] py-[4px]'
                          : searchResult?.data?.status === 'failed'
                            ? 'bg-[#FEE2E2] text-[#F87171] border border-[#F87171] text-[12px] font-[400] w-[68px] px-[12px] py-[4px]'
                            : searchResult?.data?.status === 'active'
                              ? 'bg-[#DBEAFE] text-[#3B82F6] border border-[#3B82F6] text-[12px] font-[400] w-[72px] px-[12px] py-[4px]'
                              : 'bg-gray-100 text-gray-800 border border-gray-300'
                          }`}
                      >
                        {searchResult?.data?.status}
                      </div>
                    </div>

                    <p className="text-[#ffffff] text-[14px] font-[400] tracking-[-1%]">
                      {searchResult?.data?.description}
                    </p>
                  </div>

                  <div
                    className="text-[#ffffff] text-[16px] font-[400] w-full flex gap-2 justify-center h-[45px] bg-transparent border border-[#FECDD3] rounded-[8px] items-center cursor-pointer"
                    onClick={handleCopyToClipboard}
                  >
                    <Image src={Share} alt="no-icon" /> Share
                  </div>
                </div>
                {/* <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-[20px] transition-all duration-300 flex justify-between flex-col">
                  <div >
                    <div className='w-full flex flex-col md:flex-row justify-between items-center mb-2'>
                      <h3 className="text-[14px] md:text-[20px] flex gap-2 items-center font-[500] mb-2 text-[#1E293B]">
                        <Globe className="w-5 h-5 text-black" />
                        {
                          searchResult?.data?.name}
                        <Image
                          src={searchResult?.data?.nftID?.name?.endsWith('.shib') ? Shib :  Eth}
                          alt="Domain extension"
                          className="w-5 h-5"
                        />
                      </h3>
                      <div
                        className={`flex capitalize h-auto  items-center justify-center rounded-full
                            ${searchResult?.data?.status === 'successful'
                            ? 'bg-[#DBEAFE] text-[#3B82F6] border border-[#3B82F6] text-[12px] font-[400] w-[100px] px-[12px] py-[4px]'

                            : searchResult?.data?.status === 'failed'
                              ? 'bg-[#FEE2E2] text-[#F87171] border border-[#F87171] text-[12px] font-[400] w-[68px] px-[12px] py-[4px]'

                              : searchResult?.data?.status === 'active'
                                ? 'bg-[#DCFCE7] text-[#22C55E] border border-[#22C55E] text-[12px] font-[400] w-[72px] px-[12px] py-[4px]'
                                : 'bg-gray-100 text-gray-800 border border-gray-300'
                          }`}
                      >
                        {
                          searchResult?.data?.status}
                      </div>
                    </div>
                    <p className="text-[#334155] text-[14px] font-[400] tracking-[-1%]">
                      {searchResult?.data?.description}
                    </p>
                  </div>

                  <div className='text-[#0F172A] text-[16px] font-[400] w-full flex gap-2 justify-center h-[45px] bg-transparent border border-[#CBD5E1] rounded-[8px] items-center cursor-pointer'
                    onClick={handleCopyToClipboard}
                  >
                    <Image src={Share} alt="no-icon" /> Share</div>
                </div> */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.015 }}
                  className="rounded-[14px] bg-white p-[20px] flex flex-col justify-between border border-[#E2E8F0]"
                >
                  {
                    searchResult?.data?.status !== 'active' ? (
                      <>
                        <div>
                          {/* Progress Bar */}
                          <div>
                            <p className="text-[20px] font-[500] uppercase text-[#1E293B] flex justify-start items-center gap-2">
                              <Image src={TokenType} alt="no-icon" width={30} />       Total Raised DOFI
                            </p>
                            {/* <p className="text-lg font-semibold text-gray-900 dark:text-white">DOFI</p> */}
                          </div>
                          <div className="space-y-1 mt-[36px]">
                            <div className="flex justify-between">
                              <span className="text-[14px] font-[500] text-[#64748B]">0%</span>
                              <span className="text-[14px] font-[500] text-[#1E293B]">
                                {progressBarValues(Number(searchResult?.data?.fundsRaised), Number(searchResult?.data?.totalSupply))}
                              </span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-black transition-all duration-500"
                                style={{
                                  width: progressBarValues(
                                    Number(searchResult?.data?.fundsRaised),
                                    Number(searchResult?.data?.totalSupply)
                                  ), // OR `${percentage * 2}%` if intentional
                                }}
                              />
                            </div>
                          </div>
                          <div className="overflow-x-auto mt-[24px]">
                            <table className="min-w-full">
                              <thead>
                                <tr className="border-b border-gray-300 dark:border-gray-600 ">
                                  <th className="px-4 py-2 font-[400] text-[#334155] text-[14px] text-left">
                                    Amount
                                  </th>
                                  <th className="px-4 py-2 font-[400] text-[#334155] text-[14px] text-left">
                                    Wallet
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {

                                  searchResult?.data?.investors?.length > 0 ? (

                                    searchResult?.data?.investors.map((inv: any, idx: number) => (
                                      <tr key={idx} className="border-b border-gray-200 ">
                                        <td className="px-4 py-2 text-[#334155] font-[500] text-[14px]">{inv.amount}</td>
                                        <td className="px-4 py-2 text-[#334155] font-[500] text-[14px]">{inv.user?.wallet}</td>
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
                              <p className="text-[20px] font-[500] uppercase text-[#1E293B] flex justify-start items-center gap-2">
                                <Image src={TokenType} alt="no-icon" width={30} />       Total Raised DOFI
                              </p>
                              {/* <p className="text-lg font-semibold text-gray-900 dark:text-white">DOFI</p> */}
                            </div>

                          </div>
                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-[14px] font-[500] text-[#64748B]">0%</span>
                              <span className="text-[14px] font-[500] text-[#1E293B]">
                                {progressBarValues(Number(searchResult?.data?.fundsRaised), Number(searchResult?.data?.totalSupply))}
                              </span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-black transition-all duration-500"
                                style={{
                                  width: progressBarValues(
                                    Number(searchResult?.data?.fundsRaised),
                                    Number(searchResult?.data?.totalSupply)
                                  ), // OR `${percentage * 2}%` if intentional
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 mt-[30px] w-full  border-b border-gray-300 pb-4">
                            <div className='w-full flex justify-between '>
                              <p className="text-[14px] font-[500] text-[#64748B]">
                                Participants:
                                <span className="ml-[12px] text-[14px] font-[500] text-black">
                                  {searchResult?.data?.investors?.length}
                                </span>
                              </p>
                              <p className="text-[14px] font-[500] text-[#64748B]">
                                Total Allocation:
                                <span className="ml-[12px] text-[14px] font-[500] text-black">{searchResult?.data?.totalSupply}</span>
                              </p>
                            </div>
                            <div className='w-full flex justify-between '>
                              <p className="text-[14px] font-[500] text-[#64748B]">
                                Remaining Allocation:
                                <span className="ml-[12px] text-[14px] font-[500] text-black">{
                                  getRemaniningAlloction(searchResult?.data?.fundsRaised, searchResult?.data?.pricePerToken, searchResult?.data?.totalSupply)
                                }</span>
                              </p>
                              <p className="text-[14px] font-[500] text-[#64748B]">
                                Price Per Token:
                                <span className="ml-[12px] text-[14px] font-[500] text-black">{
                                  searchResult?.data?.pricePerToken}</span>
                              </p>
                            </div>

                          </div>

                          {!isExpired && (
                            <div>
                              <h4 className="text-[16px] font-[400] text-[#1E293B] uppercase mt-4">
                                DIO ends in:
                              </h4>
                              <AuctionCountdown
                                date={new Date(
                                  searchResult?.data?.endTime?.toString())}
                              />
                            </div>
                          )}

                          <div className="flex gap-1 items-center justify-between">
                            <input
                              disabled={isExpired}
                              type="number"
                              value={inputValue}
                              onChange={handleInputChange}
                              className="rounded-[8px] w-[371px] h-[45px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#94A3B8] px-3 py-1 text-[15px] font-[400] focus:outline-none focus:ring-2 focus:ring-gray-500"
                              placeholder="Enter Amount"
                            />
                            {isEth ? (
                              <div className="bg-gradient-to-br from-[#221FBB] to-[#C520DE] p-[2px] rounded-[8px]">
                                <button
                                  onClick={() => handleBuyShare()}
                                  disabled={loading || isExpired}
                                  className="w-[110px] h-[41px] rounded-[6px] bg-gradient-to-br from-[#221FBB] to-[#C520DE] text-[#ffffff] text-[14px] font-[500] flex items-center justify-center"
                                >
                                  {loading ? <BeatLoader color="#221FBB" size={8} /> : 'Buy Share'}
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleBuyShare()}
                                disabled={loading || isExpired}
                                className="bg-gradient-to-br from-[#DF820E] to-[#F03132] w-[114px] h-[45px] rounded-[8px] px-4 py-3 text-white text-[14px] font-[400] flex items-center justify-center"
                              >
                                {loading ? <BeatLoader color="#fff" size={8} /> : 'Buy Share'}
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                </motion.div>
              </div>

              <div className="mt-[42px]">
                <h2 className="text-[24px] font-[700] text-center uppercase text-[#1E293B] mb-2">
                  Token Information
                </h2>
                <p className="text-[16px] font-[400] text-center text-[#1E293B] mb-6">
                  Note : after successful DIO completion random percentage <br />on fractions are minted for creating liquidity.
                </p>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.015 }}
                  className="rounded-[10px] gap-[10px] flex flex-col border border-[#E2E8F0] bg-[#F8FAFC] p-[20px]"
                >
                  <div className="flex justify-between">
                    <h3 className="text-[12px] md:text-[14px] flex items-center gap-2 font-400 uppercase text-[#64748B]">
                      <Image src={CoinVertical} alt="no-icon" />
                      Token Ticker
                    </h3>
                    <p className="text-[10px] md:text-[14px] uppercase text-[#334155] font-[500]">DOFI SHARE</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-[12px] md:text-[14px] flex items-center gap-2 font-400 uppercase text-[#64748B]">
                      <Image src={TokenSale} alt="no-icon" />
                      Tokens for Sale
                    </h3>
                    <p className="text-[10px] md:text-[14px] uppercase text-[#334155] font-[500]">{
                      searchResult?.data?.name} Fraction</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-[12px] md:text-[14px] flex items-center gap-2 font-400 uppercase text-[#64748B]">
                      <Image src={TotalSupply} alt="no-icon" />
                      Total Supply
                    </h3>
                    <p className="text-[10px] md:text-[14px] uppercase text-[#334155] font-[500]">{
                      searchResult?.data?.totalSupply} DFS</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-[12px] md:text-[14px] flex items-center gap-2 font-400 uppercase text-[#64748B]">
                      <Image src={TokenType} alt="no-icon" /> Token Type</h3>
                    <p className="text-[10px] md:text-[14px] uppercase text-[#334155] font-[500]">ERC1155</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-[12px] md:text-[14px] flex items-center gap-2 font-400 uppercase text-[#64748B]">
                      <Image src={Network} alt="no-icon" /> Network</h3>
                    <p className="text-[10px] md:text-[14px] uppercase text-[#334155] font-[500]">Base Sepolia</p>
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

      )}

    </>
  );
};

export default IDODetailPage;
