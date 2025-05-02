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
import Image from '@/components/ui/image';
import { ExportIcon } from '@/components/icons/export-icon';
import { Close as CloseIcon } from '@/components/icons/close';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox, { ListboxOption } from '@/components/ui/list-box';
import { useLayout } from '@/lib/hooks/use-layout';
import FileInput from '@/components/ui/file-input';
// static data
import votePool from '@/assets/images/vote-pool.svg';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { Switch } from '@/components/ui/switch';
import PriceType from '@/components/create-nft/price-types-props';
import cn from '@/utils/cn';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Avatar from '@/components/ui/avatar';
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import {
  useCreatePropsals,
  useGetALLPropsalNFTS,
  useGetNFTS,
} from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from '@/components/ui/toast-notification';
import { idoActions } from '@/store/reducer/ido-reducer';

const actionOptions = [
  {
    name: 'Custom Contact',
    value: 'custom_contact',
  },
  {
    name: 'CRIPTIC Token',
    value: 'criptic_token',
  },
  {
    name: 'Reserve',
    value: 'reserve',
  },
];

const reserveOptions = [
  {
    name: 'Renounce Ownership',
    value: 'renounceOwnership',
  },
  {
    name: 'Set Rate Mantissa',
    value: 'setRateMantissa',
  },
  {
    name: 'Transfer Ownership',
    value: 'transferOwnership',
  },
  {
    name: 'Withdraw Reverse',
    value: 'withdrawReverse',
  },
];

const cripticTokenOptions = [
  {
    name: 'Approve',
    value: 'approve',
  },
  {
    name: 'Delegated',
    value: 'delegated',
  },
  {
    name: 'Mint',
    value: 'mint',
  },
  {
    name: 'Set Minter',
    value: 'setMinter',
  },
  {
    name: 'Transfer',
    value: 'transfer',
  },
  {
    name: 'Transfer From',
    value: 'transferFrom',
  },
];

function CripticTokenAction({
  selectedOption,
  onChange,
}: {
  selectedOption: ListboxOption;
  onChange: React.Dispatch<React.SetStateAction<ListboxOption>>;
}) {
  return (
    <>
      <Listbox
        className="w-full sm:w-80"
        options={cripticTokenOptions}
        selectedOption={selectedOption}
        onChange={onChange}
      />
      {selectedOption.value === 'approve' && (
        <>
          <Input
            label="Spender address"
            useUppercaseLabel={false}
            placeholder="Enter spender address"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'delegated' && (
        <Input
          label="Delegated address"
          useUppercaseLabel={false}
          placeholder="Enter delegated address"
          className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'mint' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'setMinter' && (
        <Input
          label="Minter address"
          useUppercaseLabel={false}
          placeholder="Enter minter address"
          className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'transfer' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'transferFrom' && (
        <>
          <Input
            label="Src address"
            useUppercaseLabel={false}
            placeholder="Enter src address"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
          />
        </>
      )}
    </>
  );
}

function ActionFields() {
  let [actionType, setActionType] = useState(actionOptions[0]);
  let [reserveAction, setReserveAction] = useState(reserveOptions[0]);
  let [cripticTokenAction, setCripticTokenAction] = useState(
    cripticTokenOptions[0],
  );
  return (
    <div className="">
      <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
        <div className="-mr-2 mb-3 flex items-center justify-between">
          <h3 className="text-base font-medium dark:text-gray-100">
            Action #1
          </h3>
          <Button
            type="button"
            size="mini"
            shape="circle"
            variant="transparent"
            className="opacity-0 group-hover:opacity-100 dark:text-gray-300"
          >
            <CloseIcon className="h-auto w-[11px] xs:w-3" />
          </Button>
        </div>
        <>
          <Listbox
            className="w-full sm:w-80"
            options={actionOptions}
            selectedOption={actionType}
            onChange={setActionType}
          />
          {actionType.value === 'custom_contact' && (
            <Input
              className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12"
              useUppercaseLabel={false}
              placeholder="Enter contact address 0x1f9840a85..."
            />
          )}
          {actionType.value === 'criptic_token' && (
            <div className="rtl:xs:mlr6 rtl:sm:mlr12 mt-4 ltr:xs:ml-6 ltr:sm:ml-12">
              <CripticTokenAction
                selectedOption={cripticTokenAction}
                onChange={setCripticTokenAction}
              />
            </div>
          )}
          {actionType.value === 'reserve' && (
            <div className="mt-4 ltr:xs:ml-6 ltr:sm:ml-12 rtl:xs:mr-6 rtl:sm:mr-12">
              <Listbox
                className="w-full sm:w-80"
                options={reserveOptions}
                selectedOption={reserveAction}
                onChange={setReserveAction}
              />
            </div>
          )}
        </>
      </div>
      <Button variant="ghost" className="mt-2 dark:text-white xs:mt-3">
        Add another action
      </Button>
    </div>
  );
}

const CreateProposalPage = () => {
  const router = useRouter();
  const { writeContractAsync } = useWriteContract();
  const { loading } = useSelector((state: any) => state.ido);
  const dispatch = useDispatch();
  const { address } = useAccount();
  let [publish, setPublish] = useState(true);
  let [priceType, setPriceType] = useState('fixed');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [leasingAddress, setLeasingAddress] = useState('');
  const [percentageYield, setPercentageYield] = useState('');
  const [motivation, setMotivation] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<any>(null);
  const [totalFractions, setTotalFractions] = useState();
  const [pricePerFraction, setPricePerFraction] = useState();
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [isFractionMode, setIsFractionMode] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const { layout } = useLayout();
  const { all_Propsal_NFTS, isLoading }: any = useGetALLPropsalNFTS();

  const { mutate: submitCreate, isError, error } = useCreatePropsals('child');

  useEffect(() => {
    const storedNftString = localStorage.getItem('nft');
    if (storedNftString) {
      const storedNft: any = JSON.parse(storedNftString);
      console.log('storedNft----->', storedNft);
      setCategory(storedNft);
    }
  }, []);

  // console.log('category--->', category);

  const handleSubmit = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect your wallet first!');
        return;
      }
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0x04568e30d14de553921B305BE1165fc8F9a26E94',
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
          parseUnits(amount?.toString(), 18),
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
        pollingInterval: 2000,
      });
      if (recipient.status === 'success') {
        submitCreate({
          //@ts-ignore
          name: name,
          summary: summary,
          motivation: motivation,
          amount: amount,
          nftId: category?._id,
          daoId: localStorage.getItem('Domain_Dao'),
          leasingAddress: !isFractionMode ? leasingAddress : '0x',
          percentageYield: !isFractionMode ? percentageYield : 1,
          totalFractions: isFractionMode ? totalFractions : 1,
          pricePerFraction: isFractionMode ? pricePerFraction : 1,
          daoType: 'child',
          // "address": "{{wallet}}",
          expirationDate: new Date(),
        });
      } else {
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
      console.log(error);
    }
  };

  function goToAllProposalPage() {
    setTimeout(() => {
      router.push(
        (layout === LAYOUT_OPTIONS.MODERN ? '' : routes.home + layout) +
          routes.domain,
      );
    }, 800);
  }

  // function handleSubmit() {
  //   const formData = {
  //     name,
  //     amount,
  //     leasingAddress,
  //     percentageYield,
  //     motivation,
  //     publish,
  //     priceType,
  //     category
  //   };
  //   console.log('Form Data:', formData);

  //   // You can replace the console.log with an API call here
  // }
  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <header className="mb-10 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 xs:gap-3 xl:gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
            <Image alt="Vote Pool" src={votePool} width={32} height={32} />
          </div>
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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold dark:text-white">
          Create New Proposal
        </h2>
        {/* <div className="flex items-center gap-2 shadow-lg bg-white dark:bg-gray-800 px-6 py-4 rounded-[10px] relative">
          <div className="absolute top-2 right-2">
            <div className="group relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 7a1 1 0 112 0 1 1 0 01-2 0zm1 3a1 1 0 00-.993.883L9 11v3a1 1 0 001.993.117L11 14v-3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute right-0 mt-1 w-64 rounded-md bg-white p-3 text-xs text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                This toggle switches between Yield Percentage and Fraction modes for proposal creation.
              </div>
            </div>
          </div>

          <span
            className={cn(
              'text-sm text-gray-700 dark:text-gray-300 transition-all duration-200',
              !isFractionMode ? 'font-bold' : 'font-medium'
            )}
          >
            Yield Percentage
          </span>

          <Switch checked={isFractionMode} onChange={() => setIsFractionMode(!isFractionMode)}>
            <div
              className={cn(
                isFractionMode ? 'bg-brand dark:bg-white' : 'bg-gray-200 dark:bg-gray-700',
                'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300',
              )}
            >
              <span
                className={cn(
                  isFractionMode
                    ? 'ltr:translate-x-5 rtl:-translate-x-5'
                    : 'ltr:translate-x-0.5 rtl:-translate-x-0.5',
                  'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200',
                )}
              />
            </div>
          </Switch>

          <span
            className={cn(
              'text-sm text-gray-700 dark:text-gray-300 transition-all duration-200',
              isFractionMode ? 'font-bold' : 'font-medium'
            )}
          >
            Fractions
          </span>
        </div> */}
      </div>

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
        <InputLabel title="Amount" important />
        <Input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <InputLabel title="Domain" important />
        <Input
          type="text"
          placeholder="Enter leasing address"
          value={category?.name}
        />
      </div>
      {/* <div className="mb-8">
        <InputLabel title="Domain" important />
        <select
          value={category}
          onChange={(e) => {
            const selectedId = e.target.value;
            setCategory(selectedId);
            const nft = all_Propsal_NFTS?.data?.find((n: any) => n._id === selectedId);
            setSelectedNFT(nft);
          }}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-gray-900 focus:ring-0 dark:border-gray-700 dark:bg-light-dark dark:text-white dark:placeholder:text-gray-600"
        >
          <option value="" disabled>Select a domain</option>
          {all_Propsal_NFTS?.data?.map((nft: any) => (
            <option value={nft?._id} key={nft?._id}>
              {nft?.name}
            </option>
          ))}
        </select>
      </div> */}

      <div className="mb-8">
        <InputLabel title="Leasing Address" important />
        <Input
          type="text"
          placeholder="Enter leasing address"
          value={leasingAddress}
          onChange={(e) => setLeasingAddress(e.target.value)}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Percentage Yield" important />
        <Input
          type="number"
          placeholder="Enter percentage yield"
          value={percentageYield}
          onChange={(e) => setPercentageYield(e.target.value)}
        />
      </div>

      <div className="rounded-lg dark:bg-light-dark xs:pb-8">
        <h3 className="mb-2 block text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          MOTIVATION
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

{
  /* <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <InputLabel title="Upload file" important />

            <FileInput multiple />
          </div>

          <div className="flex items-center justify-between gap-4">
            <InputLabel
              title="Put on marketplace"
              subTitle="Enter price to allow users instantly purchase your NFT"
            />
            <div className="shrink-0">
              <Switch checked={publish} onChange={() => setPublish(!publish)}>
                <div
                  className={cn(
                    publish
                      ? 'bg-brand dark:!bg-white'
                      : 'bg-gray-200 dark:bg-gray-700',
                    'relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300',
                  )}
                >
                  <span
                    className={cn(
                      publish
                        ? 'bg-white dark:bg-light-dark ltr:translate-x-5 rtl:-translate-x-5'
                        : 'bg-white dark:bg-light-dark ltr:translate-x-0.5 rtl:-translate-x-0.5',
                      'inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200',
                    )}
                  />
                </div>
              </Switch>
            </div>
          </div>
          {publish && <PriceType value={priceType} onChange={setPriceType} />}
        </div>
        <div className="hidden flex-col lg:flex">
          <InputLabel title="Preview" />
          <div className="relative flex flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark">
            <div className="flex items-center p-4 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400">
              <Avatar
                size="sm"
                image={AuthorImage}
                alt="Cameronwilliamson"
                className="border-white bg-gray-300 dark:bg-gray-400 ltr:mr-3 rtl:ml-3"
              />
              @Cameronwilliamson
            </div>
            <div className="relative block w-full">
              <Image
                src={NFT1}
                placeholder="blur"
                width={700}
                height={700}
                alt="Pulses of Imagination #214"
              />
            </div>
            <div className="p-5">
              <div className="text-sm font-medium text-black dark:text-white">
                Pulses Of Imagination #214
              </div>
              <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                0.40 ETH
              </div>
            </div>
          </div>
        </div>
      </div> */
}
