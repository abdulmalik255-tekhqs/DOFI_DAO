'use client';


import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import { useSelector } from 'react-redux';
import Button from '@/components/ui/button';
import { useBuyQueryWizard } from '@/hooks/livePricing';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { BeatLoader } from 'react-spinners';
import ToastNotification from '../ui/toast-notification';
import { Globe } from 'lucide-react';

export default function FindName({ data }: any) {
  const { address } = useAccount();
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
        address: '0xD5062eAafdAa5e5d211Ffde0327c10D2369690b6',
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


  return (
    <>

      <div className='w-full justify-between flex'>
        <h2 className="mb-6 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
          Register
        </h2>
      </div>
      <div className="mb-2 flex w-full items-start justify-start">
        <h3 className="flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-gray-900 dark:text-white drop-shadow-sm">
          <Globe className="w-5 h-5 text-gray-600 dark:text-white" />
          {data?.name}
        </h3>
      </div>
      <div
        className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-300 p-4 text-gray-900 shadow-md dark:bg-gray-700 dark:text-white"
      >
        <div className="flex w-full justify-between mb-2">
          <h3 className="text-sm font-medium">1 year registration</h3>
          <h3 className="text-sm font-medium uppercase tracking-wide">
            ${data?.price}
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
