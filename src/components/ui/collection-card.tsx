'use client';
import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import Detail from '@/assets/images/dao/detail.png';
import ToastNotification from './toast-notification';
import { useCopyToClipboard } from 'react-use';
import { useState } from 'react';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';

export default function CollectionCard({ item, className = '' }: any) {
  const { imageUrl, contractAddress, amount } = item ?? {};
  const dispatch = useDispatch();
  const [_, copyToClipboard] = useCopyToClipboard();
  const { openModal } = useModal();
  const router = useRouter();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [copyAddressStatus, setCopyAddressStatus] = useState(false);
  function goToNFTDetailPage() {
    dispatch(idoActions.setNFTDetail(item));
    router.push(`${routes.nftDetails}/${item?._id}`);
  }
  function handleCopyTokenIDToClipboard() {
    copyToClipboard(item?.tokenId);
    setCopyButtonStatus(true);
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  function handleCopyAddressToClipboard() {
    copyToClipboard(contractAddress);
    setCopyAddressStatus(true);
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyAddressStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <>
      <div
        className={cn(
          'group relative max-w-[220px] overflow-hidden rounded-lg',
          className,
        )}
      >
        <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
          <img src={imageUrl} alt={`NFT #${item?.tokenId}`} width={600} />
        </div>
        <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-4">
          <div className="flex justify-end">
            <div
              onClick={() => goToNFTDetailPage()}
              className="cursor-pointer"
              // className="inline-flex h-8 shrink-0 border border-white cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
            >
              <Image src={Detail} alt="no-icon" />
            </div>
          </div>
        </div>
        <div className="z-[10] flex flex-col">
          <div className="z-[5] flex justify-between">
            <div>
              <span className="mt-2 inline-flex items-center text-[14px] font-[500] tracking-wide">
                Token ID :
              </span>
              <span className="ml-2 font-bold">{item?.tokenId}</span>
            </div>

            <div
              title="Copy ID"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => handleCopyTokenIDToClipboard()}
            >
              {copyButtonStatus ? (
                <Check className="z-10 mt-2 h-[15px] w-[15px] text-[#0F172A]" />
              ) : (
                <Copy className="z-10 mt-2 h-[15px] w-[15px] text-[#0F172A]" />
              )}
            </div>
          </div>
          <div
            className="z-[5] mt-2 flex cursor-pointer items-center justify-between text-[14px] font-[500] tracking-wide text-black"
            // title="Click to copy"
            // onClick={() => {
            //   if (contractAddress) {
            //     ToastNotification("success", "Copied!")
            //     navigator.clipboard.writeText(contractAddress);
            //   }
            // }}
          >
            {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-6)}
            <div
              title="Copy Address"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => handleCopyAddressToClipboard()}
            >
              {copyAddressStatus ? (
                <Check className="z-10 h-[15px] w-[15px] text-[#0F172A]" />
              ) : (
                <Copy className="z-10 h-[15px] w-[15px] text-[#0F172A]" />
              )}
            </div>
          </div>
        </div>
        {amount && amount <= 1 && (
          <>
            <div
              onClick={(e) => openModal('CREATE_IDO', item)}
              className="relative z-[5] mt-[10px] flex h-[47px] cursor-pointer items-center justify-center rounded-[12px] bg-[#0F172A] px-4 text-xs font-medium uppercase tracking-wide text-white"
            >
              create DIO
            </div>
          </>
        )}
      </div>
    </>
  );
}
