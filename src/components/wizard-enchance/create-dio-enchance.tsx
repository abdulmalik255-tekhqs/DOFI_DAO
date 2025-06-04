import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWriteContract } from 'wagmi';
import { Listbox } from '@headlessui/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { Copy } from '@/components/icons/copy';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { useCreateIDOWizard } from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';
import Eth from '@/assets/images/dao/eth.png';
import Shib from '@/assets/images/dao/shib.png';
import DAO from '@/assets/images/dao/dao1.png';
import Image from 'next/image';
import RevenueSharing from '@/assets/images/dao/revenueSharing.svg';
import DomainUtility from '@/assets/images/dao/domainUtility.svg';
import NameService from '@/assets/images/dao/nameService.svg';
import TokenGated from '@/assets/images/dao/tokenGated.svg';
import { useCopyToClipboard } from 'react-use';
import ToastNotification from '../ui/toast-notification';
import { useModal } from '../modal-views/context';

interface CreateIDOProps {
  data: any;
}
export default function CreateIDOWizardEnhance({ data }: CreateIDOProps) {
  const coinListDIO = [
    {
      icon: DAO,
      code: 'DOFI',
      name: 'DOFI',
    },
    {
      icon: Eth,
      code: 'ETH',
      name: 'Ethereum',
    },
    {
      icon: Shib,
      code: 'SHIB',
      name: 'SHIB',
    },
  ];
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { closeModal } = useModal();
  const { writeContractAsync } = useWriteContract();
  const { loading } = useSelector((state: any) => state.ido);
  const [totalFraction, setTotalfraction] = useState('');
  const [currentStepButton, setCurrentStepButton] = useState(0);
  const [nextLoader, setNextLoader] = useState(false);
  const [priceFraction, setPricefraction] = useState('');
  const { mutate: submitCreate } = useCreateIDOWizard(setCurrentStepButton);
  const [mintedHash, setMindedHash] = useState('');
  const [selectedExpand, setSelectedExpand] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(coinListDIO[0]);
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const steps = ['Purchase', 'Mint Domain'];
  const handleBuy = async () => {
    try {
      if (!totalFraction) {
        ToastNotification('error', 'Enter total fraction');
        return;
      }
      if (!priceFraction) {
        ToastNotification('error', 'Enter price per fraction');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_DAO_TOKEN as `0x${string}`,
        abi: daoTokenABI,
        functionName: 'transferFrom',
        args: [
          address,
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
          data?.tokenId,
        ],
      });
      const recipientRaw = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      const recipient = {
        ...recipientRaw,
        totalFraction,
        priceFraction,
      };
      if (recipientRaw.status === 'success') {
        dispatch(idoActions.setBuytransactionHash(recipient));
        setMindedHash(recipient?.transactionHash);
        submitCreate({
          nftID: data?._id,
          name: `${data?.name} DIO`,
          tokenSymbol: 'DAO NFT',
          totalSupply: totalFraction,
          pricePerToken: priceFraction,
          startTime: 1745600400000,
          endTime: 1745600400000,
          creator: address,
          address: address,
          description: 'token',
        });
      } else {
        dispatch(idoActions.setLoading(false));
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  function goToAllProposalPage() {
    setNextLoader(true);
    setTimeout(() => {
      dispatch(idoActions.nextStep());
      setNextLoader(false);
    }, 4500);
  }
  const handleCopyToClipboard = () => {
    copyToClipboard(mintedHash);
    setCopyButtonStatus('Copied!');
    ToastNotification('success', 'Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  const hanldeExpand = () => {
    setSelectedExpand(!selectedExpand);
  };
  return (
    <>
      <div className="w-full max-w-5xl gap-10">
        {/* === DIO FORM CARD === */}
        <div className="p-2">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-[24px] font-[700] tracking-[-0.5px] text-[#0F172A] dark:text-white md:text-[32px] ltr:text-left rtl:text-right">
              Fractionalize Domain
            </h2>
            <h3 className="mt-[8px] text-[16px] font-[400] text-[#64748B] dark:text-gray-400">
              {data?.name} - Token ID {data?.tokenId}
            </h3>
          </div>

          <div className="gap-2 py-[24px] md:flex">
            {/* Total Fraction */}
            <label className="block">
              <span className="text-[20px] font-[500] text-[#0F172A] dark:text-gray-300">
                Total Fractions
              </span>
              <input
                type="number"
                value={totalFraction || ''}
                onChange={(e) => setTotalfraction(e.target.value)}
                placeholder="Enter total fraction"
                className="mt-[12px] h-[62px] w-full rounded-lg border border-[#E2E8F0] bg-[#FBFCFE] text-[20px] text-[#334155] placeholder:text-[#94A3B8] focus:border-none focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </label>

            {/* Price Per Fraction */}
            <label className="block">
              <span className="text-[20px] font-[500] text-[#0F172A] dark:text-gray-300">
                Price Per Fraction
              </span>
              <input
                type="number"
                value={priceFraction || ''}
                onChange={(e) => setPricefraction(e.target.value)}
                placeholder="Enter price per fraction"
                className="mt-[12px] h-[62px] w-full rounded-lg border border-[#E2E8F0] bg-[#FBFCFE] text-[20px] text-[#334155] placeholder:text-[#94A3B8] focus:border-none focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </label>
          </div>
          <div>
            <div className="w-full">
              <label className="mb-[12px] block text-[20px] font-[500] text-[#0F172A] dark:text-white">
                SELECT TOKEN
              </label>
              <Listbox value={selectedCoin} onChange={setSelectedCoin}>
                <div className="relative w-full">
                  <Listbox.Button className="h-[62px] w-full rounded-[8px] border border-[#E2E8F0] bg-[#FBFCFE] px-4 py-2 text-[20px] font-[400] text-[#0F172A] focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={selectedCoin.icon}
                          alt={selectedCoin.name}
                          className="h-6 w-6 rounded-full"
                        />
                        {selectedCoin.name}
                      </div>
                      <ChevronDown className="text-text-[#0F172A] w-[20px] dark:text-white" />
                    </div>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-900 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    {coinListDIO.map((coin) => (
                      <Listbox.Option
                        key={coin.code}
                        value={coin}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Image
                          src={coin.icon}
                          alt={coin.name}
                          className="h-6 w-6 rounded-full"
                        />
                        {coin.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="flex w-full items-center justify-between gap-2 py-2">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStepButton;
                  const isActive = index === currentStepButton;
                  return (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center"
                    >
                      <div
                        className={`h-2 w-full rounded-full transition-all duration-500 ${
                          isCompleted || isActive
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}
                      />
                    </div>
                  );
                })}
              </div> */}
              <div className="mt-[24px] box-border flex w-full justify-between gap-3">
                <Button
                  onClick={() => closeModal()}
                  shape="rounded"
                  className="bg-transparnet w-[49%] border border-[#E2E8F0] text-[#0F172A]"
                >
                  Cancel
                </Button>
                {currentStepButton === 0 && (
                  <>
                    <Button
                      shape="rounded"
                      onClick={() => handleBuy()}
                      fullWidth
                      disabled={loading}
                      className="w-[49%] bg-[#0F172A]"
                    >
                      {loading ? (
                        <BeatLoader color="#fff" />
                      ) : (
                        'Send NFT to escrow'
                      )}
                    </Button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  {currentStepButton === 1 && (
                    <div className="w-full">
                      <motion.div
                        key="step-1-button"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }} // Slower and smoother
                      >
                        <Button
                          shape="rounded"
                          onClick={goToAllProposalPage}
                          fullWidth
                          disabled={nextLoader}
                          className="w-[100%]"
                        >
                          {nextLoader ? (
                            <BeatLoader color="#000" />
                          ) : (
                            'Tokenize'
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <p className="mt-4 text-left text-[13px] font-[400] leading-relaxed text-[#64748B] dark:text-gray-400">
              <span className="text-[13px] font-[500] text-red-500">Note:</span>{' '}
              This action will create the Domain Initial Offering for the
              purchased domain. Upon successful DIO completion, a separate
              domain sub-DAO is created where fraction holders can participate
              and vote using their ERC-1155 fraction assets.
            </p>
            <div className="py-4">
              <AnimatePresence>
                {mintedHash && (
                  <motion.div
                    key="minted-popup"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }} // Slower & smooth
                    className="rounded-2xl bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 p-4 shadow-xl"
                  >
                    <h3 className="flex items-center justify-between text-sm font-medium uppercase tracking-wide text-white">
                      {mintedHash?.slice(0, 6)}...
                      {mintedHash?.slice(-6)}
                      <div className="flex gap-2">
                        <span
                          onClick={handleCopyToClipboard}
                          className="text-md flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-400"
                        >
                          <Copy className="h-4 w-4 cursor-pointer text-white" />
                        </span>
                        <a
                          href={`https://sepolia.basescan.org/tx/${mintedHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex cursor-pointer items-center gap-1 text-blue-600 hover:underline"
                        >
                          <FaExternalLinkAlt color="#fff" />
                        </a>
                      </div>
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* === PRIVILEGES CARD === */}
        <div className="rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
          <h2
            onClick={() => hanldeExpand()}
            className="flex cursor-pointer items-center justify-between text-center text-[18px] font-[700] text-[#0F172A] dark:text-white md:text-[32px]"
          >
            Domain DAO Privileges{' '}
            <span>
              {selectedExpand ? (
                <ChevronUp className="text-text-[#0F172A] w-[20px] dark:text-white" />
              ) : (
                <ChevronDown className="text-text-[#0F172A] w-[20px] dark:text-white" />
              )}
            </span>
          </h2>
          {selectedExpand && (
            <>
              <div className="space-y-6">
                {[
                  {
                    icon: RevenueSharing,
                    title: 'Revenue Sharing',
                    desc: 'Earn a share of revenue generated from domain monetization, leasing, or resales.',
                  },
                  {
                    icon: DomainUtility,
                    title: 'Domain Utility Decisions',
                    desc: 'Vote on how the ENS domain is used across dApps, marketplaces, or DAOs.',
                  },
                  {
                    icon: NameService,
                    title: 'Name Service Innovation',
                    desc: 'Collaborate on experiments like subdomain leasing, identity use cases, or zk integrations.',
                  },
                  {
                    icon: TokenGated,
                    title: 'Token-Gated Access',
                    desc: 'Get exclusive access to token-holder-only tools, chats, and community calls.',
                  },
                ].map(({ icon, title, desc }, i, arr) => (
                  <div
                    key={i}
                    className={`flex items-start justify-between gap-3 pb-[12px] ${
                      i !== arr.length - 1 ? 'border-b border-[#E2E8F0]' : ''
                    }`}
                  >
                    <div className="flex w-[40%] gap-2 pt-1">
                      <Image src={icon} alt="no-icon" />
                      <h3 className="text-[16px] font-[500] text-[#0F172A] dark:text-gray-100">
                        {title}
                      </h3>
                    </div>
                    <div className="w-[60%]">
                      <p className="text-[16px] font-[400] text-[#475569] dark:text-gray-400">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
