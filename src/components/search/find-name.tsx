'use client';

import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import { useSelector } from 'react-redux';
import Button from '@/components/ui/button';
import { useBuyQuery } from '@/hooks/livePricing';
import { useModal } from '@/components/modal-views/context';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { idoActions } from '@/store/reducer/ido-reducer';
import { BeatLoader } from 'react-spinners';

export default function FindName({ data }: any) {
  const { mutate: submitBuyAsync, isError, error, isSuccess } = useBuyQuery();
  const { loading } = useSelector((state: any) => state.ido);
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const router = useRouter();
  const { writeContractAsync } = useWriteContract();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0x04568e30d14de553921B305BE1165fc8F9a26E94',
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
          parseUnits(data?.price?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
        pollingInterval: 2000,
      });
      console.log(recipient, 'recipient');

      if (recipient.status === 'success') {
        const result = await submitBuyAsync({ id: data?._id });
        // openModal('CREATE_IDO', data?.data);
      } else {
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
      console.error('Buy failed:', error);
    }
  };
  // const handleBuy = async () => {
  //   try {
  //     dispatch(idoActions.setLoading(true));
  //     const result = await submitBuyAsync({ id: data?._id });
  //     // openModal('CREATE_IDO', result);
  //   } catch (error) {
  //     console.error('Buy failed:', error);
  //   }
  // };

  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <div className="mb-6 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
        Register
      </div>
      <div className="mb-2 flex w-full items-end justify-end">
        {/* <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          0.66 Gwei
        </h3> */}
        <Button
          size="large"
          shape="rounded"
          className="uppercase xs:tracking-widest"
          onClick={() => handleBuy()}
          disabled={loading}
        >
          {loading ? (
            <>
              <BeatLoader color="#000" />
            </>
          ) : (
            'BUY'
          )}
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
            ${data?.price}
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
            ${data?.price + 0.48}
          </h3>
        </div>
      </div>
    </div>
  );
}
