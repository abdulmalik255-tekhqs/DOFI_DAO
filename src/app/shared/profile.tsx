'use client';
import Image from '@/components/ui/image';
import Profile from '@/components/profile/profile';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import CleanShortIcon from '@/assets/images/dao/cleanshort.png';
import Bg from '@/assets/images/dao/BG.png';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import ToastNotification from '@/components/ui/toast-notification';

const AuthorProfilePage = () => {
  const { address } = useAccount();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(address as string);
    setCopyButtonStatus(true);
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <>
      <div className="relative mt-4 h-[200px] w-full overflow-hidden rounded-lg">
        <Image
          src={Bg}
          placeholder="blur"
          className="no-repeat h-full w-full object-cover"
          alt="Cover Image"
        />
      </div>
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-2 3xl:max-w-[1700px]">
        <div className="z-10 mx-auto -mt-12 flex w-[10%] justify-center sm:-mt-14 md:mx-0 md:-mt-24 xl:mx-0 3xl:-mt-24">
          <Image src={CleanShortIcon} alt="no-icon" />
        </div>
        {address && (
          <>
            <h3 className="z-10 ml-6 mt-2 flex items-start justify-start text-[24px] font-[500] uppercase tracking-wide text-white">
              {address?.slice(0, 6)}
              {'...'}
              {address?.slice(address?.length - 6)}
              <div
                title="Copy Address"
                className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => handleCopyToClipboard()}
              >
                {copyButtonStatus ? (
                  <Check className="z-10 mt-2 h-[22px] w-[22px] text-white" />
                ) : (
                  <Copy className="z-10 mt-2 h-[22px] w-[22px] text-white" />
                )}
              </div>
            </h3>
          </>
        )}
      </div>
      <Profile />
    </>
  );
};

export default AuthorProfilePage;
