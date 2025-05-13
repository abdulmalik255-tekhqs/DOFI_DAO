'use client';
import { useSelector } from 'react-redux';
import { Copy } from '@/components/icons/copy';
import { FaExternalLinkAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
import { Coins, Globe, Hash, User, Wallet, PartyPopper } from 'lucide-react';
import { useCopyToClipboard } from 'react-use';
import routes from '@/config/routes';
import { FaCube, FaDollarSign, FaGlobe, FaLayerGroup, FaLink } from 'react-icons/fa6';
import ToastNotification from '../ui/toast-notification';

export default function DIOTransaction({ data }: any) {
  console.log(data, "data");

  const { loading, buyTransactionhash } = useSelector((state: any) => state.ido);
  const { idoDetaildata } = useSelector((state: any) => state.idodeatil);
  const router = useRouter();
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(buyTransactionhash?.transactionHash);
    setCopyButtonStatus('Copied!');
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  const handleBuy = async () => {
    router.push(`${routes.idoDetail}/${idoDetaildata?._id}`);
  };
  const handleCopyToClipboardNFT = () => {
    copyToClipboard(data?.contractAddress);
    setCopyButtonStatus('Copied!');
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  return (
    <>
      <div className='w-full justify-between flex'>
        <h2 className="flex gap-2 mb-2 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
          <PartyPopper color='green' />  Congratulations  Domain Is Tokenized
        </h2>
      </div>
      <div className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-100 p-4 dark:bg-light-dark">
        <div className="flex w-full flex-col items-center rounded-lg border-b-4 border-[#14161A] bg-gray-300 p-4 dark:bg-light-dark">
          {loading ? (
            <HashLoader />
          ) : (
            <>
              {/* Asset */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaLayerGroup className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Asset</h3>
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  DO.FI Fraction ERC1155
                </h3>
              </div>

              {/* Domain */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaGlobe className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Domain</h3>
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {data?.name}
                </h3>
              </div>

              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-700 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Token ID</h3>
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {data?.tokenId}
                </h3>
              </div>
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaLink className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">NFT Address</h3>
                </div>
                <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {data?.contractAddress?.slice(0, 6)}...{data?.contractAddress?.slice(-6)}
                  <span
                    onClick={handleCopyToClipboardNFT}
                    className="cursor-pointer rounded-full border border-gray-200 p-1 text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <Copy className="h-4 w-4" />
                  </span>
                  <a
                    href={`https://sepolia.basescan.org/address/${data?.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </h3>
              </div>
              {/* Total Fraction */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaCube className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Total Fraction</h3>
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {buyTransactionhash?.totalFraction}
                </h3>
              </div>

              {/* Price Per Fraction */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaDollarSign className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Price Per Fraction</h3>
                </div>
                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  $DOFI {buyTransactionhash?.priceFraction}
                </h3>
              </div>

              {/* Transaction Hash */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaLink className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Fractionalize Hash</h3>
                </div>
                <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {buyTransactionhash?.transactionHash?.slice(0, 6)}...{buyTransactionhash?.transactionHash?.slice(-6)}
                  <span
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer rounded-full border border-gray-200 p-1 text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <Copy className="h-4 w-4" />
                  </span>
                  <a
                    href={`https://sepolia.basescan.org/tx/${buyTransactionhash?.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </h3>
              </div>
            </>
          )}
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
          Complete
        </Button>
      </div>
    </>
  );
}
