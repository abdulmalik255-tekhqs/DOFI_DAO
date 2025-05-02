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
import { useModal } from '../modal-views/context';
import { usePostPayToken } from '@/hooks/livePricing';

export default function PayTokenAmount() {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { mutate: submitCreate, isError, error } = usePostPayToken();
  const { loading } = useSelector((state: any) => state.ido);
  const { closeModal } = useModal();
  const [tokenAmount, setTokenamount] = useState('');
  const handlePay = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!tokenAmount) {
        ToastNotification('error', 'Enter Amount!');
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
          parseUnits(tokenAmount?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        const addressArray = ['0x1357331C3d6971e789CcE452fb709465351Dc0A1'];
        const amountArray=[Number(tokenAmount)];
        submitCreate({
          //@ts-ignore
          amount: amountArray,
          addresses: addressArray,
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
      <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
        <h2 className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
          Token Amount
        </h2>
        <input
          type="number"
          value={tokenAmount || ''}
          onChange={(e) => setTokenamount(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
          placeholder="enter token amount"
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
