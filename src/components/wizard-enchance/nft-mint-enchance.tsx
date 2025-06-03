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
import { formatNumber } from '@/utils/cn';
import { useModal } from '../modal-views/context';

export default function NFTMintEnchance({ data }: any) {
  const { address } = useAccount();
  const { closeModal } = useModal();
  const [tokenBalance, setTokenBalance] = useState<string | null>(null);
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
      if (Number(tokenBalance) < Number(data?.price)) {
        ToastNotification('error', 'You do not have enough DOFI token!');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
          parseUnits(data?.price?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
        pollingInterval: 2000,
      });
      if (recipient.status === 'success') {
        dispatch(idoActions.setBuytransactionHash(recipient));
        dispatch(idoActions.nextStep());
        const result = await submitBuyAsync({ id: data?._id });
      } else {
        dispatch(idoActions.setLoading(false));
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
      <div className="flex w-full items-center justify-center">
        <h2 className="mb-6 text-[32px] font-[700] tracking-[-0.5px] text-[#0F172A] dark:text-white ltr:text-left rtl:text-right">
          Register Domain
        </h2>
      </div>
      <div className="mb-[24px] flex w-full items-start justify-between">
        <h3 className="flex items-center gap-2 text-[24px] font-[500] tracking-[-0.5px] text-[#0F172A] drop-shadow-sm dark:text-white">
          <Globe className="text-text-[#0F172A] h-5 w-5 dark:text-white" />
          {data?.name}
          <Image
            src={data?.name?.endsWith('.eth') ? Eth : Shib}
            alt="Domain extension"
            className="h-5 w-5"
          />
        </h3>
        <div>
          <h4 className="flex items-center gap-2 text-[24px] font-[500] tracking-[-0.5px] text-[#0F172A] drop-shadow-sm dark:text-white">
            Balance: $DOFI {formatNumber(tokenBalance)}
          </h4>
        </div>
      </div>
      <div className="flex w-full cursor-pointer flex-col items-center rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 dark:bg-gray-700 dark:text-white">
        <div className="mb-[12px] flex w-full justify-between">
          <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A]">
            1 year registration
          </h3>
          <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A]">
            $DOFI {formatNumber(data?.price)}
          </h3>
        </div>

        <div className="mb-[24px] flex w-full justify-between">
          <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A]">
            Est. network fee
          </h3>
          <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A]">
            $0.48
          </h3>
        </div>
        <div className="w-full border border-[#CBD5E1]"></div>
        <div className="mt-[24px] flex w-full justify-between">
          <h3 className="text-[16px] font-[500] tracking-[-0.5px] text-[#0F172A]">
            Estimated total
          </h3>
          <h3 className="text-[16px] font-[500] tracking-[-0.5px] text-[#0F172A]">
            ${formatNumber(data?.price + 0.48)}
          </h3>
        </div>
      </div>
      <div className="mt-[32px] box-border flex w-full justify-between gap-3">
        <Button
          onClick={() => closeModal()}
          shape="rounded"
          className="bg-transparnet w-[49%] border border-[#E2E8F0] text-[#0F172A]"
        >
          Cancel
        </Button>
        <Button
          shape="rounded"
          className="w-[49%] bg-[#0F172A]"
          onClick={() => handleBuy()}
          disabled={loading}
          fullWidth={true}
        >
          {loading ? (
            <>
              <BeatLoader color="#fff" />
            </>
          ) : (
            'BUY'
          )}
        </Button>
      </div>
    </>
  );
}
