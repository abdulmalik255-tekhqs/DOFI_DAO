import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import ToastNotification from './toast-notification';


export default function LeaseDomainCard({ item, className = '' }: any) {
  const { openModal } = useModal();
  const [_, copyToClipboard] = useCopyToClipboard();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [copyAddressStatus, setCopyAddressStatus] = useState(false);
  function handleCopyTokenIDToClipboard() {
    //@ts-ignore
    copyToClipboard(item?.nft?.tokenId);
    setCopyButtonStatus(true);
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  function handleCopyAddressToClipboard() {
    //@ts-ignore
    copyToClipboard(item?.nft?.contractAddress);
    setCopyAddressStatus(true);
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyAddressStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <div
      className={cn(
        'group relative max-w-[220px] overflow-hidden rounded-lg',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <img
          src={item?.nft?.imageUrl}
          alt={`NFT #${item?.nft?.tokenId}`}
          width={600} />
      </div>
      {/* <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-6">
        <div className="flex justify-end">
          <div
            onClick={() => openModal('PAY_TOKEN_AMOUNT',item?.nft?.name)}
            className="inline-flex h-8 border border-white shrink-0 cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
          >
            Pay
          </div>
        </div>
         
      </div> */}
      <div className="flex flex-col">
        <div className='flex justify-between z-[100]' >
          <div >
            <span className="inline-flex mt-2 items-center  text-[14px] font-[500] tracking-wide">
              Token ID :
            </span>
            <span className='ml-2 font-bold'>{item?.nft?.tokenId}</span>
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
          className="z-[5]  mt-2 flex justify-between cursor-pointer items-center  text-[14px] font-[500] tracking-wide text-black cursor-pointer"
          // title="Click to copy"
          // onClick={() => {
          //   if (item?.nft?.contractAddress) {
          //     ToastNotification("success", "Copied!")
          //     navigator.clipboard.writeText(item?.nft?.contractAddress);
          //   }
          // }}
        >
          {item?.nft?.contractAddress?.slice(0, 6)}...{item?.nft?.contractAddress?.slice(-6)}
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
      <div className="w-full">
        <div
          onClick={() => openModal('PAY_TOKEN_AMOUNT', item?.nft?.name)}
          className="flex h-[47px] justify-center cursor-pointer items-center rounded-[12px] bg-[#0F172A] px-4 text-xs font-medium uppercase tracking-wide text-white mt-[10px]"
        >
          Pay
        </div>
      </div>
    </div>
  );
}
