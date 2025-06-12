import { useState } from 'react';
import { parseUnits } from 'viem';
import Input from '@/components/ui/forms/input';
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
import CoinVertical from '@/assets/images/dao/coinvertical.svg';
import Eth from '@/assets/images/dao/eth.png';
import Shib from '@/assets/images/dao/shib.png';
import Image from 'next/image';

export default function PayTokenAmount({ data }: { data: any }) {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { mutate: submitCreate } = usePostPayToken();
  const { loading } = useSelector((state: any) => state.ido);
  const [tokenAmount, setTokenamount] = useState('');
  const isShib = data?.endsWith('.shib');
  const handlePay = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!tokenAmount) {
        ToastNotification('error', 'Enter token amount!');
        return;
      }
      if (Number(tokenAmount) === 0) {
        ToastNotification('error', 'Token amount cannot be 0.');
        return;
      }

      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
          parseUnits(tokenAmount?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        const addressArray = [
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
        ];
        const amountArray = [Number(tokenAmount)];
        const nftName = data ? data : '';
        submitCreate({
          addresses: addressArray,
          nftName,
          amounts: amountArray,
        });
      } else {
        dispatch(idoActions.setLoading(false));
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark xs:w-[500px] sm:px-7 sm:pb-8 sm:pt-6">
      <h1 className="flex shrink-0 items-center justify-center text-center text-[24px] font-[700] uppercase tracking-tighter text-[#1E293B] dark:text-white">
        Pay Token Amount
      </h1>
      <div className="w-full py-2">
        <h1 className="flex shrink-0 items-center justify-start gap-2 text-start text-[16px] font-[400] text-[#1E293B] dark:text-white">
          {data}
          <Image
            src={isShib ? Shib : Eth}
            alt="Domain extension"
            className="h-5 w-5"
          />
        </h1>
      </div>
      <label className="mb-4 w-full flex-col items-start md:flex">
        <h2 className="flex items-center justify-start text-center text-[14px] font-[400] uppercase text-[#1E293B] dark:text-white">
          <Image src={CoinVertical} alt="no-icon" /> Token Amount
        </h2>
        <div className="w-full">
          <Input
            type="number"
            placeholder="Enter token amount"
            value={tokenAmount || ''}
            onChange={(e: any) => setTokenamount(e.target.value)}
          />
        </div>
      </label>
      <Button
        size="medium"
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
