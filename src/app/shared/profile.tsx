"use client"
import Image from '@/components/ui/image';
import Avatar from '@/components/ui/avatar';
import Profile from '@/components/profile/profile';
import { CgProfile } from 'react-icons/cg';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import CleanShortIcon from '@/assets/images/dao/cleanshort.png';
import Bg from '@/assets/images/dao/BG.png';
// static data
import { authorData } from '@/data/static/author';
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
     ToastNotification("success","Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <>
      <div className="relative w-full overflow-hidden rounded-lg h-[200px]">
        <Image
          src={Bg}
          placeholder="blur"

          className="h-full w-full object-cover no-repeat"
          alt="Cover Image"
        />
      </div>
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-2 3xl:max-w-[1700px] 3xl:px-12">
        <div className="z-10 mx-auto -mt-12 flex w-[10%] justify-center sm:-mt-14 md:mx-0 md:-mt-24 xl:mx-0 3xl:-mt-24">
          <Image src={CleanShortIcon} alt="no-icon" />
        </div>

        <h3 className="z-10 mt-2 ml-6 text-[24px] flex justify-start items-start font-[500] uppercase tracking-wide text-white">
          {address?.slice(0, 6)}
          {'...'}
          {address?.slice(address?.length - 6)}
          <div
            title="Copy Address"
            className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => handleCopyToClipboard()}
          >
            {copyButtonStatus ? (
              <Check className="z-10 h-[22px] mt-2 w-[22px] text-white" />
            ) : (
              <Copy className="z-10 h-[22px] mt-2 w-[22px] text-white" />
            )}
          </div>
        </h3>
      </div>
      <Profile />
    </>
  );
};

export default AuthorProfilePage;
