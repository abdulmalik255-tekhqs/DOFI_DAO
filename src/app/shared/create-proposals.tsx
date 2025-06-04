'use client';

import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import InputLabel from '@/components/ui/input-label';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import { useLayout } from '@/lib/hooks/use-layout';
// static data
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { useCreatePropsals, useGetALLPropsalNFTS } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from '@/components/ui/toast-notification';

const CreateProposalPage = () => {
  const router = useRouter();
  const { loading } = useSelector((state: any) => state.ido);
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [leasingAddress, setLeasingAddress] = useState('');
  const [percentageYield, setPercentageYield] = useState('');
  const [motivation, setMotivation] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('');
  const [totalFractions, setTotalFractions] = useState();
  const [pricePerFraction, setPricePerFraction] = useState();
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isFractionMode, setIsFractionMode] = useState(true);
  const { layout } = useLayout();
  const { all_Propsal_NFTS }: any = useGetALLPropsalNFTS();

  const { mutate: submitCreate } = useCreatePropsals('parent');
  const handleSubmit = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect your wallet first!');
        return;
      }
      const isEmpty = !name || !category || !motivation || !summary;

      if (isEmpty) {
        ToastNotification('error', 'Please fill all required fields');
        return;
      }

      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
          parseUnits((50)?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
        pollingInterval: 2000,
      });
      if (recipient.status === 'success') {
        submitCreate({
          name: name,
          summary: summary,
          motivation: motivation,
          amount: 50,
          nftId: category,
          daoId: '680a76bce48a31fb65d162dd',
          leasingAddress: !isFractionMode ? leasingAddress : '0x',
          percentageYield: !isFractionMode ? percentageYield : 1,
          totalFractions: isFractionMode ? totalFractions : 1,
          pricePerFraction: isFractionMode ? pricePerFraction : 1,
          daoType: 'parent',
          // "address": "{{wallet}}",
          expirationDate: new Date(),
        });
      } else {
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };

  function goToAllProposalPage() {
    setTimeout(() => {
      router.push(
        (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
          routes.proposals,
      );
    }, 800);
  }
  useEffect(() => {
    const generateRandomInteger = (min: any, max: any) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    setTotalFractions(generateRandomInteger(1000, 1500));
    setPricePerFraction(generateRandomInteger(1, 5));
    if (selectedNFT) {
      setAmount(selectedNFT?.price);
    }
  }, [selectedNFT]);

  return (
    <section className="mx-auto w-full max-w-[1920px] text-sm">
      <header className="mb-6 mt-4 flex flex-col gap-4 rounded-[10px] border border-[#E2E8F0] bg-white px-4 py-3 dark:bg-light-dark sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 xs:gap-3 xl:gap-4">
          <h2 className="text-lg font-semibold dark:text-white">
            Create New Proposal
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <Button
            shape="rounded"
            fullWidth={true}
            className="uppercase"
            onClick={() => goToAllProposalPage()}
          >
            All Proposal
          </Button>
        </div>
      </header>

      <div className="mb-8">
        <InputLabel title="Name" important />
        <Input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <InputLabel title="Domain" important />
        <select
          value={category}
          onChange={(e) => {
            const selectedId = e.target.value;
            setCategory(selectedId);
            const nft = all_Propsal_NFTS?.data?.find(
              (n: any) => n._id === selectedId,
            );
            setSelectedNFT(nft);
          }}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-0 dark:border-gray-700 dark:bg-light-dark dark:text-white dark:placeholder:text-gray-600"
        >
          <option value="" disabled>
            Select a domain
          </option>
          {all_Propsal_NFTS?.data?.map((nft: any) => (
            <option value={nft?._id} key={nft?._id}>
              {nft?.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <InputLabel title="Domain Value" important />
        <Input
          disabled={true}
          type="number"
          placeholder="Enter Domain Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Proposal Creation Amount" />
        <Input type="number" disabled placeholder="Enter amount" value={'50'} />
      </div>
      <div className="mb-8">
        <InputLabel title="Total Fractions" />
        <Input
          disabled={true}
          type="number"
          placeholder="Enter total fractions"
          value={totalFractions}
          onChange={(e: any) => setTotalFractions(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Price Per Fraction" />
        <Input
          disabled={true}
          type="number"
          placeholder="Enter price fraction"
          value={pricePerFraction}
          onChange={(e: any) => setPricePerFraction(e.target.value)}
        />
      </div>

      <div className="rounded-lg dark:bg-light-dark xs:pb-8">
        <h3 className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          MOTIVATION
          <sup className="ml-1 text-red-500">*</sup>
        </h3>
        <Textarea
          placeholder="Add the motivation here"
          rows={6}
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
        />
      </div>
      <div className="mb-6 rounded-lg dark:bg-light-dark xs:pb-8">
        <h3 className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          SUMMARY
          <sup className="ml-1 text-red-500">*</sup>
        </h3>
        <Textarea
          rows={6}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Add the summary here"
          inputClassName="md:h-32 xl:h-36"
        />
      </div>
      <div className="mt-6">
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="xs:w-64 md:w-72"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <BeatLoader color="#000" />
            </>
          ) : (
            'Create Proposal'
          )}
        </Button>
      </div>
    </section>
  );
};

export default CreateProposalPage;
