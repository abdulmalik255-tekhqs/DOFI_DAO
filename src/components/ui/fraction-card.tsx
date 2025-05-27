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
  const {
    imageUrl,
    tokenId,
    contractAddress,
    amount,
  } = item ?? {};
  const dispatch = useDispatch()
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [copyAddressStatus, setCopyAddressStatus] = useState(false);
  function handleCopyTokenIDToClipboard() {
    //@ts-ignore
    copyToClipboard(item?.tokenId);
    setCopyButtonStatus(true);
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  function handleCopyAddressToClipboard() {
    //@ts-ignore
    copyToClipboard(contractAddress);
    setCopyAddressStatus(true);
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyAddressStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <>
      <div
   
        className={`relative max-w-[220px] overflow-visible rounded-lg group transition-all duration-300 cursor-pointer`}
      >
        <div className="relative flex w-full justify-center items-center  max-h-[291px] z-[20]"
           onClick={() => {
            dispatch(idoActions.saveBuydomainNft(item));
            dispatch(idoActions.setToogle(true))
          }}
        >
          <div className="relative z-20 w-full h-full overflow-hidden rounded-lg transition-transform duration-300 ease-in-out">
            <img
              src={imageUrl}
              alt={`NFT #${tokenId}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="absolute left-0 top-[33%]  z-[25]  flex h-full w-[220px] flex-col justify-between"
        >
          <div className="relative group cursor-pointer" >
            <div className="flex justify-center w-full items-center text-[10px] font-[400] tracking-wide text-[#ffffff]">
              Amount: <span className="ml-1 font-[400]">{amount}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className='flex justify-between z-[100]' >
            <div >
              <span className="inline-flex mt-2 items-center  text-[14px] font-[500] tracking-wide">
                Token ID :
              </span>
              <span className='ml-2 font-bold'>{item?.tokenId}</span>
            </div>
            <div
              title="Copy ID"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => handleCopyTokenIDToClipboard()}
            >
              {copyButtonStatus ? (
                <Check className="z-10 h-[15px] mt-2 w-[15px] text-[#0F172A]" />
              ) : (
                <Copy className="z-10 h-[15px] mt-2 w-[15px] text-[#0F172A]" />
              )}
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="z-[100] mt-2 flex justify-between cursor-pointer items-center text-[14px] font-[500] tracking-wide text-black"
            title="Click to copy"
            onClick={() => {
              if (contractAddress) {
                // ToastNotification("success", "Copied!");
                navigator.clipboard.writeText(contractAddress);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
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
                <Check className="z-10 h-[15px]  w-[15px] text-[#0F172A]" />
              ) : (
                <Copy className="z-10 h-[15px]  w-[15px] text-[#0F172A]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
