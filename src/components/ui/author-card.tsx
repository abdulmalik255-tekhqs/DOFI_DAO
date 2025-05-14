import Avatar from '@/components/ui/avatar';
import cn from '@/utils/cn';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

type AuthorCardProps = {
  image: StaticImageData;
  name?: string;
  role?: string;
  onClick?: () => void;
};

export default function AuthorCard({
  image,
  name,
  role,
  onClick,
}: AuthorCardProps) {
  const { address } = useAccount();
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  const { data } = useBalance({
    address,
  });
  function handleCopyToClipboard() {
    //@ts-ignore
    copyToClipboard(address);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <>
      {address && (
        <div
          className={cn(
            'flex cursor-pointer items-center rounded-lg p-4',
            name
              ? 'bg-gray-100 dark:bg-light-dark'
              : 'ml-3 justify-center bg-none dark:mr-3 dark:bg-none',
          )}
          onClick={onClick ? () => onClick() : undefined}
        >
          {/* <Avatar
        image={image}
        alt={name ? name : ''}
        className="dark:border-gray-400"
      /> */}
          <div className="ltr:pl-3 rtl:pr-3">
            <h3 className="text-sm flex justify-between items-center font-medium uppercase tracking-wide text-gray-900 dark:text-white">
              {address?.slice(0, 6)}
              {'...'}
              {address?.slice(address?.length - 6)}
              <div
                title="Copy Address"
                className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => handleCopyToClipboard()}
              >
                {copyButtonStatus ? (
                  <Check className="h-auto w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-auto w-3.5" />
                )}
              </div>
            </h3>
            {/* <span className="mt-1 block text-xs text-gray-600 dark:text-gray-400">
          {role}
        </span> */}
          </div>
        </div>
      )}
    </>
  );
}
