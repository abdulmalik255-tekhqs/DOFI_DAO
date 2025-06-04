'use client';
import { useSelector } from 'react-redux';
import { Copy } from '@/components/icons/copy';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
import {
  Coins,
  Globe,
  Hash,
  User,
  Wallet,
  PartyPopper,
  AtSign,
  WalletCards,
} from 'lucide-react';
import { useCopyToClipboard } from 'react-use';
import routes from '@/config/routes';
import {
  FaCube,
  FaDollarSign,
  FaGlobe,
  FaLayerGroup,
  FaLink,
} from 'react-icons/fa6';
import ToastNotification from '../ui/toast-notification';
import { formatNumber } from '@/utils/cn';
import Image from 'next/image';
import TokenType from '@/assets/images/dao/tokentype.svg';
import Share from '@/assets/images/dao/redirect.png';
import CopyIcon from '@/assets/images/dao/copyicon.png';

export default function DIOTransactionEnchance({ data }: any) {
  const { loading, buyTransactionhash } = useSelector(
    (state: any) => state.ido,
  );
  const { idoDetaildata } = useSelector((state: any) => state.idodeatil);
  const router = useRouter();
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
  const handleBuy = async () => {
    router.push(`${routes.idoDetail}/${idoDetaildata?._id}`);
  };
  const handleCopyToClipboardNFT = () => {
    copyToClipboard(data?.contractAddress);
    setCopyButtonStatus('Copied!');
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-[24px] font-[700] tracking-[-0.5px] text-[#0F172A] dark:text-white md:text-[32px] ltr:text-left rtl:text-right">
          Congratulations!
        </h2>
        <p className="text-[16px] font-[400] tracking-[-0.5px] text-[#64748B]">
          Your Domain is tokenized.
        </p>
      </div>

      <div className="mt-[24px] flex w-full flex-col items-center rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 dark:bg-light-dark">
        {loading ? (
          <HashLoader />
        ) : (
          <>
            {/* Asset */}
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <Image src={TokenType} alt="no-icon" width={20} />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Asset
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                DO.FI Fraction ERC1155
              </h3>
            </div>

            {/* Domain */}
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <Globe className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Domain
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                {data?.name}
              </h3>
            </div>

            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <Hash className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Token ID
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                {data?.tokenId}
              </h3>
            </div>
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <AtSign className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  NFT Address
                </h3>
              </div>
              <h3 className="flex gap-[12px] text-[16px] font-[400] text-[#0F172A] dark:text-white">
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
            {/* Total Fraction */}
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <WalletCards className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Total Fraction
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                {buyTransactionhash?.totalFraction}
              </h3>
            </div>

            {/* Price Per Fraction */}
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <FaDollarSign className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Price Per Fraction
                </h3>
              </div>
              <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                $DOFI {formatNumber(buyTransactionhash?.priceFraction)}
              </h3>
            </div>

            {/* Transaction Hash */}
            <div className="flex w-full items-center justify-between gap-2 py-1">
              <div className="flex items-center gap-2">
                <Hash className="text-text-[#0F172A] h-4 w-4 dark:text-white" />
                <h3 className="text-[16px] font-[400] text-[#0F172A] dark:text-white">
                  Fractionalize Hash
                </h3>
              </div>
              <h3 className="flex gap-[12px] text-[16px] font-[400] text-[#0F172A] dark:text-white">
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

      <div className="mt-4">
        <Button
          shape="rounded"
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
