'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/button';
import TransactionInfo from '@/components/ui/transaction-info';
import cn from '@/utils/cn';
import { config } from '@/app/shared/wagmi-config';
import { waitForTransactionReceipt } from 'viem/actions';
import { coinList } from '@/data/static/coin-list';
import { BeatLoader } from 'react-spinners';
import { parseUnits } from 'viem';
import { fractionDaoABI } from '@/utils/abi';
import { useDispatch, useSelector } from 'react-redux';
import ArbitrageCoinInput from './arbitrage-coin-input';
import Arrow from '@/assets/images/dao/arbitragearrow.png';
import Image from 'next/image';
import { useArbitrage, useFetchNFTARBITRAGE } from '@/hooks/livePricing';
import { useAccount, useWriteContract } from 'wagmi';
import ToastNotification from './toast-notification';
import { idoActions } from '@/store/reducer/ido-reducer';

const ArbitragePage = () => {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [selectedFromSwapCoin, setSelectedFromSwapCoin] = useState<any>(null);
  const { mutate: submitArbitrage } = useArbitrage(setSelectedFromSwapCoin);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.ido);
  const [fromAmount, setFromAmount] = useState<any>(null);
  const excangeRate = (value: any) => {
    const multiply = value * 0.05;
    return value - multiply;
  };
  const { NFTAbritrage, isLoading }: any = useFetchNFTARBITRAGE();
  const updatedCoinList: any = (NFTAbritrage as any)?.data;
  console.log(updatedCoinList, 'NFTAbritrage');

  const handleSwap = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!selectedFromSwapCoin) {
        ToastNotification('error', 'Select Nft!');
        return;
      } else {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          address: process.env.NEXT_PUBLIC_FRACTIONDAO_TOKEN as `0x${string}`,
          abi: fractionDaoABI,
          functionName: 'safeTransferFrom',
          args: [
            address,
            '0xA50673D518847dF8A5dc928B905c54c35930b949',
            updatedCoinList?.path[0]?.tokenId,
            parseUnits(updatedCoinList?.path[0]?.amount?.toString(), 0),
            '0x',
          ],
        });
        const recipient = waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        submitArbitrage({
          address: address,
          nftName: selectedFromSwapCoin?.tokenName,
          profit: updatedCoinList?.path[3]?.amount?.toString(),
        });
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  useEffect(() => {
    if (
      NFTAbritrage &&
      NFTAbritrage.data &&
      Object.keys(NFTAbritrage.data).length > 0
    ) {
      const rawPath = (NFTAbritrage as any)?.data?.path[0];
      const updatedCoinList: any[] = rawPath ? [rawPath] : [];
      dispatch(idoActions.setArbitrageRoute(updatedCoinList));
    }
  }, [NFTAbritrage]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // time between each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-[500]">Swap Domain Fractions</h1>
        <div className="flex items-center gap-[5px]">
          {coinList?.map((coin, index) => (
            <div key={index} className="h-4 w-4">
              {React.cloneElement(coin.icon, { className: 'w-full h-full' })}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[24px] border border-[#CBD5E1]"></div>
      <div className="mb-6 mt-[24px]">
        <div className={cn('relative flex flex-col gap-3')}>
          <ArbitrageCoinInput
            label={'From'}
            exchangeRate={excangeRate(fromAmount?.value)}
            defaultCoinIndex={20}
            getCoinValue={(data: any) => setFromAmount(data)}
            onSelectCoin={(coin: any) => setSelectedFromSwapCoin(coin)}
            value={selectedFromSwapCoin}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 xs:gap-[18px]">
        <TransactionInfo
          label={'Dex 1 Rate'}
          value={selectedFromSwapCoin ? updatedCoinList?.dex1Price : '--'}
        />
        <TransactionInfo
          label={'Dex 2 Rate'}
          value={selectedFromSwapCoin ? updatedCoinList?.dex2Price : '--'}
        />
        <TransactionInfo
          label={'Net Profit (DOFI)'}
          value={
            selectedFromSwapCoin ? `$${updatedCoinList?.profitInDofi}` : '--'
          }
        />
      </div>
      <div className="mt-4 border-b border-[#E2E8F0] border-gray-200 dark:border-gray-800"></div>
      {selectedFromSwapCoin && (
        <>
          <motion.div
            className="mt-[24px] flex justify-between gap-[10px]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {updatedCoinList?.path?.map((item: any, index: number) => {
              const isLast = index === updatedCoinList?.path?.length - 1;
              const isBuy = item?.buy;

              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-[10px]"
                  variants={itemVariants}
                >
                  <div className="flex flex-col gap-[10px]">
                    <div
                      className={`flex h-[150px] w-[107px] flex-col items-center justify-center rounded-[10px] border ${
                        isBuy
                          ? 'border-[#BBF7D0] bg-[#F0FDF4]'
                          : 'border-[#FECACA] bg-[#FEF2F2]'
                      }`}
                    >
                      <img
                        src={item?.image}
                        alt={item?.tokenName}
                        width={50}
                        height={65}
                      />
                      <h2
                        className={`m-0 p-0 text-[11px] font-[500] ${
                          isBuy ? 'text-[#00C10D]' : 'text-[#FF0000]'
                        }`}
                      >
                        {isBuy ? 'Buy' : 'Sell'}{' '}
                      </h2>
                      <h2
                        className={`m-0 p-0 text-[11px] font-[500] ${
                          isBuy ? 'text-[#00C10D]' : 'text-[#FF0000]'
                        }`}
                      >
                        {item?.amount}{' '}
                      </h2>
                      <h2
                        title={
                          item?.tokenName?.length > 11
                            ? item.tokenName
                            : undefined
                        }
                        className={`text-[11px] font-[500] ${
                          isBuy ? 'text-[#00C10D]' : 'text-[#FF0000]'
                        }`}
                      >
                        {item?.tokenName?.length > 11
                          ? `${item.tokenName.substring(0, 11)}...`
                          : item.tokenName}
                      </h2>
                    </div>
                    <div className="flex h-[41px] w-[107px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
                      <p className="text-[16px] font-[500] text-black">
                        {isLast ? 'Profit' : item?.dex}
                      </p>
                    </div>
                  </div>

                  {!isLast && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 1) * 0.3 }}
                      className="flex items-center justify-center"
                    >
                      <Image src={Arrow} alt="arrow" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </>
      )}

      <div className="flex justify-end">
        <Button
          size="medium"
          shape="rounded"
          fullWidth={true}
          className="mt-6 bg-[#0F172A] xs:mt-8 xs:tracking-widest"
          onClick={() => handleSwap()}
          disabled={loading}
        >
          {loading ? (
            <>
              <BeatLoader color="#fff" />
            </>
          ) : (
            'Swap'
          )}
        </Button>
      </div>
    </>
  );
};

export default ArbitragePage;
