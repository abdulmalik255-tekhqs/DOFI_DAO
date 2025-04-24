'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import { useBuyQuery } from '@/hooks/livePricing';

interface Props {
  name?: string;
}
export default function FindName({ name }: Props) {
  const { mutate: submitBuy, isError, error } = useBuyQuery();
  const handleBuy = () => {
    try {
      submitBuy({
        id: 'bitcoin',
        price: 30000,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <div className="mb-6 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
        Register
      </div>
      <div className="mb-2 flex w-full items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          0.66 Gwei
        </h3>
        <Button
          size="large"
          shape="rounded"
          className="uppercase xs:tracking-widest"
          onClick={() => handleBuy()}
        >
          BUY
        </Button>
      </div>
      <div
        className={
          'flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-100 p-4 dark:bg-light-dark'
        }
      >
        <div className="flex w-full justify-between">
          <h3>1 years registration</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
            $25.01
          </h3>
        </div>
        <div className="flex w-full justify-between">
          <h3>Est. network fee</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
            $0.48
          </h3>
        </div>
        <div className="flex w-full justify-between">
          <h3>Estimated total</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
            $5.48
          </h3>
        </div>
      </div>
    </div>
  );
}
