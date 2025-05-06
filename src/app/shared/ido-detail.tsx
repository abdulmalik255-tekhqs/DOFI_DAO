'use client';

import { useRouter, useParams } from 'next/navigation';
import { FaCube, FaDollarSign } from 'react-icons/fa6';
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
import { BeatLoader, MoonLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { useEffect, useState } from 'react';
import { useBuyShareIDO, useGetIDODetail } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import ToastNotification from '@/components/ui/toast-notification';
import { config } from '@/app/shared/wagmi-config';

const IDODetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const { isConfetti, loading,componentLoading } = useSelector((state: any) => state.ido);
  const { idoDetaildata } = useSelector((state: any) => state.idodeatil);
  const { writeContractAsync } = useWriteContract();
  console.log(componentLoading, "loading");

  const {
    mutate: idodetail,
    data: searchResult,
  } = useGetIDODetail();


console.log(searchResult,"searchResult");

  //@ts-ignore
  const { mutate: buyShareIDO } = useBuyShareIDO();
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

  useEffect(() => {
    dispatch(idoActions.setComponentloading(true))
    //@ts-ignore
    idodetail(params.id?.toString());

  }, [isConfetti]);
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
      let remaningValue = Math.floor(Number(searchResult?.data?.totalSupply) - Number(searchResult?.data?.fundsRaised));
      if (Number(inputValue) === 0) {
        ToastNotification('error', 'Cannot buy share with 0.');
        return;
      }
      if (Number(inputValue) > remaningValue) {
        ToastNotification('error', 'Cannot buy share greater then remaining allocation');
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
        address: '0xD5062eAafdAa5e5d211Ffde0327c10D2369690b6',
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
  const getRemaniningAlloction = (funds: any, price: any, supply: any) => {
    let remaningValue = Math.floor(Number(supply) - Number(funds));
    return remaningValue
  }
  const progressBarValues = (funds: number, supply: number) => {
    const percentage = (funds / supply) * 100;
    return `${percentage.toFixed(1)}%`;

  }
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
                    {
                      //@ts-ignore
                      searchResult?.data?.name}
                  </h3>
                  <p className="text-white">
                    {
                      //@ts-ignore
                      searchResult?.data?.description}
                  </p>
                </div>


                <motion.div
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.015 }}
                  className="rounded-xl bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col justify-between"
                >
                  {searchResult?.data?.status !== 'active' ? (
                    <>
                      <div>
                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-300">
                            <p>
                              <strong>Fund Raised</strong>
                            </p>
                            <span>
                              {progressBarValues(Number(searchResult?.data?.fundsRaised), Number(searchResult?.data?.totalSupply))}
                            </span>
                          </div>
                          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-black transition-all duration-500"
                              style={{
                                width: progressBarValues(
                                  //@ts-ignore
                                  Number(searchResult?.data?.fundsRaised),
                                  //@ts-ignore
                                  Number(searchResult?.data?.totalSupply)
                                ), // OR `${percentage * 2}%` if intentional
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
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                          <p>
                            <strong>Participants:</strong> {
                              //@ts-ignore
                              searchResult?.data?.investors?.length}
                          </p>
                          <p>
                            <strong>Total Allocation:</strong>{' '}
                            {
                              //@ts-ignore
                              searchResult?.data?.totalSupply}
                          </p>
                          <p>
                            <strong>Remaining Allocation:</strong>{' '}
                            {
                              //@ts-ignore
                              getRemaniningAlloction(searchResult?.data?.fundsRaised, searchResult?.data?.pricePerToken, searchResult?.data?.totalSupply)
                            }
                          </p>
                          <p>
                            <strong>Price Per Token:</strong>{' '}
                            {
                              //@ts-ignore
                              searchResult?.data?.pricePerToken}
                            {/* {totalPrice ?? searchResult?.data?.pricePerToken} */}
                          </p>
                        </div>

                        {!isExpired && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase mt-4">
                              DIO ends in:
                            </h4>
                            <AuctionCountdown
                              date={new Date(
                                //@ts-ignore
                                searchResult?.data?.endTime?.toString())}
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
                  className="rounded-xl bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 text-white shadow-lg p-6 cursor-pointer hover:shadow-2xl"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
                      <TbSticker2 color='#fff' />
                      Token Ticker
                    </h3>
                    <p className="text-sm uppercase text-white">DOFI SHARE</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
                      <FcSalesPerformance className="text-gray-800" color='#fff' />
                      Tokens for Sale
                    </h3>
                    <p className="text-sm uppercase text-white">{
                      //@ts-ignore
                      searchResult?.data?.name} Fraction</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400">
                      <FaDollarSign className="text-gray-800" color='#fff' />
                      Total Supply
                    </h3>
                    <p className="text-sm uppercase text-white">{
                      //@ts-ignore
                      searchResult?.data?.totalSupply} DFS</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-sm flex items-center gap-2 font-semibold uppercase text-gray-400"> <FaCube color='#fff' className="text-gray-800" /> Token Type</h3>
                    <p className="text-sm uppercase text-white">ERC1155</p>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold flex items-center gap-2  uppercase text-gray-400"><GiMeshNetwork color='#fff' className="text-gray-800" /> Network</h3>
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

      )}

    </>
  );
};

export default IDODetailPage;
