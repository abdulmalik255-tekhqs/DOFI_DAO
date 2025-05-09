import { useState } from 'react';
import { parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { tetherABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';
import ToastNotification from '../ui/toast-notification';
import { usePostPayToken } from '@/hooks/livePricing';
import { FaDollarSign } from 'react-icons/fa';

export default function PayTokenAmount({ data }: { data: any }) {
  
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { mutate: submitCreate} = usePostPayToken();
  const { loading } = useSelector((state: any) => state.ido);
  const [tokenAmount, setTokenamount] = useState('');
  const handlePay = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (Number(tokenAmount)===0) {
        ToastNotification('error', 'Amount Cannot be 0.');
        return;
      }
      if (!tokenAmount) {
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
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
          parseUnits(tokenAmount?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        const addressArray = ['0x1357331C3d6971e789CcE452fb709465351Dc0A1'];
        const amountArray=[Number(tokenAmount)];
        const nftName=data ? data : ""
        submitCreate({
          //@ts-ignore
          addresses: addressArray,
          nftName,
          amounts: amountArray,
        });
      } else {
        dispatch(idoActions.setLoading(false));
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(true));
      console.log(error);
    }
  };
  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <h1 className="flex shrink-0 items-center justify-center text-center text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
        Pay Token Amount
      </h1>
      <div className='w-full py-2'>
        <h1 className="flex shrink-0 items-start justify-start text-start text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
          {data}
        </h1>
      </div>
      <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
        <h2 className="flex items-start justify-start text-start text-[16px] font-regular uppercase tracking-tighter text-gray-900 dark:text-white">
      Token Amount
        </h2>
        <input
          type="number"
          value={tokenAmount || ''}
          onChange={(e) => setTokenamount(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
          placeholder="Enter token amount"
        />
      </label>
      <Button
        size="large"
        shape="rounded"
        onClick={() => handlePay()}
        fullWidth={true}
        className="uppercase xs:tracking-widest"
        disabled={loading}
      >
        {loading ? (
          <>
            <BeatLoader color="#000" />
          </>
        ) : (
          'PAY'
        )}
      </Button>
    </div>
  );
}
