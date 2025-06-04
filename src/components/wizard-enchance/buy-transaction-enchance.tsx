'use client';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { HashLoader } from 'react-spinners';
import TokenType from '@/assets/images/dao/tokentype.svg';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useAccount } from 'wagmi';
import { Globe, Hash, User, WalletCards, AtSign } from 'lucide-react';
import ToastNotification from '../ui/toast-notification';
import { formatNumber } from '@/utils/cn';
import Share from '@/assets/images/dao/redirect.png';
import CopyIcon from '@/assets/images/dao/copyicon.png';
import { useModal } from '../modal-views/context';

export default function BuyTransactionEnchance({ data }: any) {
  const { loading, buyTransactionhash } = useSelector(
    (state: any) => state.ido,
  );
  const { address } = useAccount();
  const { closeModal } = useModal();
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(buyTransactionhash?.transactionHash);
    setCopyButtonStatus('Copied!');
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  const handleCopyToClipboardNFT = () => {
    copyToClipboard(data?.contractAddress);
    setCopyButtonStatus('Copied!');
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  const dispatch = useDispatch();
  const handleBuy = async () => {
    dispatch(idoActions.nextStep());
  };
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <h2 className="mb-6 text-[24px] font-[700] tracking-[-0.5px] text-[#0F172A] dark:text-white md:text-[32px] ltr:text-left rtl:text-right">
          Mint Domain
        </h2>
      </div>
      <div
        className={
          'flex w-full cursor-pointer flex-col items-center rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 dark:bg-light-dark'
        }
      >
        {loading ? (
          <HashLoader />
        ) : (
          <>
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src={TokenType} alt="no-icon" width={20} />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Asset
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                DO.FI Domain ERC721
              </h3>
            </div>

            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Domain
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                {data?.name}
              </h3>
            </div>
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Token ID
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                {data?.tokenId}
              </h3>
            </div>
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <AtSign className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  NFT Address
                </h3>
              </div>
              <h3 className="flex items-center gap-2 text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                {data?.contractAddress?.slice(0, 6)}...
                {data?.contractAddress?.slice(-6)}
                <span
                  onClick={handleCopyToClipboardNFT}
                  className="cursor-pointer transition"
                >
                  <Image src={CopyIcon} alt="no-icon" width={20} />
                </span>
                <a
                  href={`https://sepolia.basescan.org/address/${data?.contractAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1 text-blue-600 hover:underline"
                >
                  <Image src={Share} alt="no-icon" width={15} />
                </a>
              </h3>
            </div>
            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <WalletCards className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Total Fee
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                ${formatNumber(data?.price + 0.48)}
              </h3>
            </div>

            <div className="mb-2 flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Purchased By
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
              </h3>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-2">
                <Hash className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                  Minted Hash
                </h3>
              </div>
              <h3 className="flex items-center gap-2 text-[16px] font-[400] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                {buyTransactionhash?.transactionHash?.slice(0, 6)}...
                {buyTransactionhash?.transactionHash?.slice(-6)}
                <span
                  onClick={handleCopyToClipboard}
                  className="cursor-pointer transition"
                >
                  <Image src={CopyIcon} alt="no-icon" width={20} />
                </span>
                <a
                  href={`https://sepolia.basescan.org/tx/${buyTransactionhash?.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-1 text-blue-600 hover:underline"
                >
                  <Image src={Share} alt="no-icon" width={15} />
                </a>
              </h3>
            </div>
          </>
        )}
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
          Fractionalize
        </Button>
      </div>
    </>
  );
}
