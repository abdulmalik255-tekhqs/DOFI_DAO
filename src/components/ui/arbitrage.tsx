'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/button';
import TransactionInfo from '@/components/ui/transaction-info';
import cn from '@/utils/cn';
import { coinList } from '@/data/static/coin-list';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import ArbitrageCoinInput from './arbitrage-coin-input';
import Shib1 from '@/assets/images/dao/shib1.png';
import Shib2 from '@/assets/images/dao/shib2.png';
import Arrow from '@/assets/images/dao/arbitragearrow.png';
import Image from 'next/image';

const ArbitragePage = () => {
  const { loading } = useSelector((state: any) => state.ido);
  const [fromAmount, setFromAmount] = useState<any>(null);
  const excangeRate = (value: any) => {
    const multiply = value * 0.05;
    return value - multiply;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-[500]">SWAP Domain Fractions</h1>
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
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 xs:gap-[18px]">
        <TransactionInfo label={'Dex 1 Rate'} value={'--'} />
        <TransactionInfo label={'Dex 2 Rate'} value={'--'} />
        <TransactionInfo label={'Net Profit'} value={'$0.03'} />
      </div>
      <div className="mt-4 border-b border-[#E2E8F0] border-gray-200 dark:border-gray-800"></div>
      <div className="mt-[24px] flex justify-between gap-[10px]">
        {/* //1st route */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[108px] w-[107px] flex-col items-center justify-center gap-[12px] rounded-[10px] border border-[#FECACA] bg-[#FEF2F2]">
            <Image src={Shib1} alt="no-ioc" width={42} height={56} />
            <h2 className="text-[14px] font-[500] text-[#FF0000]">
              Sell NFT 1
            </h2>
          </div>
          <div className="flex h-[41px] w-[107px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-[16px] font-[500] text-black">DEX 1</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src={Arrow} alt="no-ioc" />
        </div>
        {/* 2nd route */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[108px] w-[107px] flex-col items-center justify-center gap-[12px] rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4]">
            <Image src={Shib2} alt="no-ioc" width={42} height={56} />
            <h2 className="text-[14px] font-[500] text-[#00C10D]">Buy NFT 2</h2>
          </div>
          <div className="flex h-[41px] w-[107px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-[16px] font-[500] text-black">DEX 1</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src={Arrow} alt="no-ioc" />
        </div>
        {/* 3rd route */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[108px] w-[107px] flex-col items-center justify-center gap-[12px] rounded-[10px] border border-[#FECACA] bg-[#FEF2F2]">
            <Image src={Shib2} alt="no-ioc" width={42} height={56} />
            <h2 className="text-[14px] font-[500] text-[#FF0000]">
              Sell NFT 2
            </h2>
          </div>
          <div className="flex h-[41px] w-[107px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-[16px] font-[500] text-black">DEX 2</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image src={Arrow} alt="no-ioc" />
        </div>
        {/* 4th route */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex h-[108px] w-[107px] flex-col items-center justify-center gap-[12px] rounded-[10px] border border-[#BBF7D0] bg-[#F0FDF4]">
            <Image src={Shib1} alt="no-ioc" width={42} height={56} />
            <h2 className="text-[14px] font-[500] text-[#00C10D]">Buy NFT 1</h2>
          </div>
          <div className="flex h-[41px] w-[107px] items-center justify-center rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
            <p className="text-[16px] font-[500] text-black">Profit</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="medium"
          shape="rounded"
          fullWidth={true}
          className="mt-6 bg-[#0F172A] uppercase xs:mt-8 xs:tracking-widest"
          disabled={loading}
        >
          {loading ? (
            <>
              <BeatLoader color="#000" />
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
