'use client';


import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { formatUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import Eth from '@/assets/images/dao/eth.png';
import Shib from '@/assets/images/dao/shib.png';
import { config } from '@/app/shared/wagmi-config';
import { useSelector } from 'react-redux';
import Button from '@/components/ui/button';
import { useBuyQueryWizard } from '@/hooks/livePricing';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { BeatLoader } from 'react-spinners';
import ToastNotification from '../ui/toast-notification';
import { Globe } from 'lucide-react';
import Image from 'next/image';
import { readContract } from '@wagmi/core'; 
import { useEffect, useState } from 'react';

export default function FindName({ data }: any) {
  const { address } = useAccount();
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
  console.log(tokenBalance,"tokenBalance");
  
  const { mutate: submitBuyAsync } = useBuyQueryWizard();
  const { loading } = useSelector((state: any) => state.ido);
  const dispatch = useDispatch();
  const { writeContractAsync } = useWriteContract();
  const handleBuy = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
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
      })
      if (recipient.status === 'success') {
        dispatch(idoActions.setBuytransactionHash(recipient));
        dispatch(idoActions.nextStep());
        const result = await submitBuyAsync({ id: data?._id });
      } else {
        dispatch(idoActions.setLoading(false));
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };

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
      console.error('Failed to fetch balance:', error);
      ToastNotification('error', 'Failed to fetch token balance');
    }
  };
   // 🔁 Call on address change
   useEffect(() => {
    if (address) {
      getTokenBalance(address);
    }
  }, [address]);
  return (
    <>
      <div className='w-full justify-between flex'>
        <h2 className="mb-6 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
          Register Domain
        </h2>
      </div>
      <div className="mb-2 flex w-full items-start justify-between">
       
        <h3 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-white drop-shadow-sm">
          <Globe className="w-5 h-5 text-gray-600 dark:text-white" />
          {data?.name}
          <Image
            src={data?.name?.endsWith('.eth') ? Eth : Shib}
            alt="Domain extension"
            className="w-5 h-5"
          />
        </h3>
        <div>
          <h4 className="flex items-center gap-2 text-md font-medium tracking-wide text-gray-900 dark:text-white drop-shadow-sm">
          Balance: $DOFI {tokenBalance}
          </h4>
          
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-300 p-4 text-gray-900 shadow-md dark:bg-gray-700 dark:text-white"
      >
        <div className="flex w-full justify-between mb-2">
          <h3 className="text-sm font-medium">1 year registration</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide">
            $DOFI {data?.price}
          </h3>
        </div>

        <div className="flex w-full justify-between mb-2">
          <h3 className="text-sm font-medium">Est. network fee</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide">
            $0.48
          </h3>
        </div>

        <div className="flex w-full justify-between">
          <h3 className="text-sm font-semibold">Estimated total</h3>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            ${data?.price + 0.48}
          </h3>
        </div>
      </div>
      <div className='mt-4'>
        <Button
          size="large"
          shape="rounded"
          className="uppercase xs:tracking-widest"
          onClick={() => handleBuy()}
          disabled={loading}
          fullWidth={true}
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
    </>
  );
}
