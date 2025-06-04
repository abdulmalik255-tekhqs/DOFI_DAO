'use client';
import ToastNotification from './toast-notification';
import { useModal } from '../modal-views/context';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';

export default function FractionCard({ item }: any) {
  const { imageUrl, tokenId, contractAddress, amount } = item ?? {};
  const dispatch = useDispatch();
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [copyAddressStatus, setCopyAddressStatus] = useState(false);
  function handleCopyTokenIDToClipboard() {
    //@ts-ignore
    copyToClipboard(item?.tokenId);
    setCopyButtonStatus(true);
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  function handleCopyAddressToClipboard() {
    //@ts-ignore
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
        className={`group relative max-w-[220px] cursor-pointer overflow-visible rounded-lg transition-all duration-300`}
      >
        <div
          className="relative z-[20] flex max-h-[291px] w-full items-center justify-center"
          onClick={(e) => {
            e.preventDefault();
            dispatch(idoActions.saveBuydomainNft(item));
            dispatch(idoActions.setToogle(true));
          }}
        >
          <div className="relative z-[20] h-full w-full overflow-hidden rounded-lg transition-transform duration-300 ease-in-out">
            <img
              src={imageUrl}
              alt={`NFT #${tokenId}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>
        <div
          className="absolute left-0 top-[40%] z-[25] flex h-full w-[220px] flex-col justify-between"
          onClick={(e) => {
            e.preventDefault();
            dispatch(idoActions.saveBuydomainNft(item));
            dispatch(idoActions.setToogle(true));
          }}
        >
          <div className="group relative cursor-pointer">
            <div className="flex w-full items-center justify-center text-[10px] font-[400] tracking-wide text-[#ffffff]">
              Amount: <span className="ml-1 font-[400]">{amount}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="z-[100] flex justify-between">
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
            role="button"
            tabIndex={0}
            className="z-[100] mt-2 flex cursor-pointer items-center justify-between text-[14px] font-[500] tracking-wide text-black"
            title="Click to copy"
            onClick={() => {
              if (contractAddress) {
                // ToastNotification("success", "Copied!");
                navigator.clipboard.writeText(contractAddress);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigator.clipboard.writeText(contractAddress);
                // ToastNotification("success", "Copied!");
              }
            }}
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
      </div>
    </>
  );
}
