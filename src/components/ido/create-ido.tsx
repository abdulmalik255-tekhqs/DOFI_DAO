import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Listbox } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { useWriteContract } from 'wagmi';
import { Copy } from '@/components/icons/copy';
import { FaSackDollar } from 'react-icons/fa6';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { useAccount, } from 'wagmi';
import { FaExternalLinkAlt } from "react-icons/fa";
import { BeatLoader } from 'react-spinners';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { useCreateIDO } from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';
import Eth from '@/assets/images/dao/eth.png';
import Shib from '@/assets/images/dao/shib.png';
import DAO from '@/assets/images/dao/dao1.png';
import Image from 'next/image';
import { useCopyToClipboard } from 'react-use';
import ToastNotification from '../ui/toast-notification';
import routes from '@/config/routes';
interface CreateIDOProps {
  data: any;
}
export default function CreateIDO({ data }: CreateIDOProps) {
  console.log(data?._id,"datat");
  
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
  const { idoDetaildata } = useSelector((state: any) => state.idodeatil);
  const router = useRouter()
  const { writeContractAsync } = useWriteContract();
  const { loading } = useSelector((state: any) => state.ido);
  const [totalFraction, setTotalfraction] = useState('');
  const [priceFraction, setPricefraction] = useState('');
  const [mintedHash, setMindedHash] = useState("");
  const [nextLoader, setNextLoader] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(coinListDIO[0]);
  const [currentStepButton, setCurrentStepButton] = useState(0);
  const { mutate: submitCreate, isError, error } = useCreateIDO(setCurrentStepButton);
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  const steps = ['Purchase', 'Mint Domain'];
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_DAO_TOKEN as `0x${string}`,
        abi: daoTokenABI,
        functionName: 'transferFrom',
        args: [
          address,
          '0xA50673D518847dF8A5dc928B905c54c35930b949',
          data?.tokenId,
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        setMindedHash(recipient?.transactionHash)
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
     router.push(`${routes.idoDetail}/${idoDetaildata?._id}`);
      setNextLoader(false);
    }, 4500);
  }
  const handleCopyToClipboard = () => {
    copyToClipboard(mintedHash);
    setCopyButtonStatus('Copied!');
    ToastNotification("success", "Copied!")
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 p-4">
        {/* === DIO FORM CARD === */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h1 className="mb-2 text-xl font-extrabold uppercase tracking-tighter text-gray-900 dark:text-white">
            Fractionalize Domain
          </h1>
          <h3 className="text-sm text-gray-700 dark:text-gray-400">
            {data?.name}
          </h3>
          <h3 className="mb-4 text-sm text-gray-700 dark:text-gray-400">
            Token ID {data?.tokenId}
          </h3>
          <div className="space-y-6">
            {/* Total Fraction */}
            <label className="block">
              <span className="text-lg font-semibold uppercase text-gray-700 dark:text-gray-300">
                Total Fractions
              </span>
              <input
                type="number"
                value={totalFraction || ''}
                onChange={(e) => setTotalfraction(e.target.value)}
                placeholder="Enter total fraction"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </label>

            {/* Price Per Fraction */}
            <label className="block">
              <span className="text-lg font-semibold uppercase text-gray-700 dark:text-gray-300">
                Price Per Fraction
              </span>
              <input
                type="number"
                value={priceFraction || ''}
                onChange={(e) => setPricefraction(e.target.value)}
                placeholder="Enter price per fraction"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
              />
            </label>

            <div className="w-full max-w-xs">
              <label className="block text-sm font-bold text-gray-700 dark:text-white mb-1">SELECT TOKEN</label>
              <Listbox value={selectedCoin} onChange={setSelectedCoin}>
                <div className="relative">
                  <Listbox.Button className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Image src={selectedCoin.icon} alt={selectedCoin.name} className='rounded-full h-6 w-6' />
                      {selectedCoin.name}
                    </div>
                  </Listbox.Button>

                  <Listbox.Options className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-900 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    {coinListDIO.map((coin) => (
                      <Listbox.Option
                        key={coin.code}
                        value={coin}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Image src={coin.icon} alt={coin.name} className='rounded-full h-6 w-6' />
                        {coin.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <div className='flex flex-col gap-2'>
              {/* progress bar */}
              <div className="w-full flex justify-between items-center py-2 gap-2">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStepButton;
                  const isActive = index === currentStepButton;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">

                      {/* Progress Bar */}
                      <div
                        className={`h-2 w-full rounded-full transition-all duration-500 ${isCompleted || isActive ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                      />
                    </div>
                  );
                })}
              </div>
              {currentStepButton === 0 && <>
                <Button
                  size="small"
                  shape="rounded"
                  onClick={handleBuy}
                  fullWidth
                  disabled={loading}
                  className="uppercase xs:tracking-widest"
                >
                  {loading ? <BeatLoader color="#000" /> : 'Send NFT to escrow'}
                </Button>
              </>}
              <AnimatePresence mode="wait">
                {currentStepButton === 1 && (
                  <motion.div
                    key="step-1-button"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }} // Slower and smoother
                  >
                    <Button
                      size="small"
                      shape="rounded"
                      onClick={goToAllProposalPage}
                      fullWidth
                      disabled={nextLoader}
                      className="uppercase xs:tracking-widest text-[1px]"
                    >
                      {nextLoader ? <BeatLoader color="#000" /> : 'Tokenize'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Submit Button */}
            </div>


            <p className="mt-4 text-xs leading-relaxed text-left text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-red-500">Note:</span> This action will create the Domain Initial Offering for the purchased domain. Upon successful DIO completion, a separate domain sub-DAO is created where fraction holders can participate and vote using their ERC-1155 fraction assets.
            </p>
            <AnimatePresence>
              {mintedHash && (
                <motion.div
                  key="minted-popup"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }} // Slower & smooth
                  className="rounded-2xl bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 shadow-xl p-4"
                >
                  <h3 className="text-sm font-medium uppercase tracking-wide text-white flex items-center gap-2">
                    {mintedHash?.slice(0, 6)}...
                    {mintedHash?.slice(-6)}
                    <span
                      onClick={handleCopyToClipboard}
                      className="text-md flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-400"
                    >
                      <Copy className="h-4 w-4 text-white cursor-pointer" />
                    </span>
                    <a
                      href={`https://sepolia.basescan.org/tx/${mintedHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  </h3>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
        {/* === PRIVILEGES CARD === */}
        <div className="rounded-2xl border border-transparent bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-inner dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
          <h2 className="mb-6 text-xl font-bold uppercase text-gray-900 dark:text-white text-center">
            Domain DAO Privileges
          </h2>
          <div className="space-y-6">
            {[
              {
                icon: <FaSackDollar className="text-yellow-400 text-lg" />,
                title: 'Revenue Sharing',
                desc: 'Earn a share of revenue generated from domain monetization, leasing, or resales.'
              },
              {
                icon: <AiOutlineGlobal className="text-blue-500 text-lg" />,
                title: 'Domain Utility Decisions',
                desc: 'Vote on how the ENS domain is used across dApps, marketplaces, or DAOs.'
              },
              {
                icon: <GiBrain className="text-pink-500 text-lg" />,
                title: 'Name Service Innovation',
                desc: 'Collaborate on experiments like subdomain leasing, identity use cases, or zk integrations.'
              },
              {
                icon: <FaLock className="text-yellow-400 text-lg" />,
                title: 'Token-Gated Access',
                desc: 'Get exclusive access to token-holder-only tools, chats, and community calls.'
              }
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="pt-1">{icon}</div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
