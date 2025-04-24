'use client';

import { useState } from 'react';
import { Close as CloseIcon } from '@/components/icons/close';
import Listbox, { ListboxOption } from '@/components/ui/list-box';
import { Transition } from '@/components/ui/transition';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
import Preview from '@/components/create-nft/nft-preview';

//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import PriceType from '@/components/create-nft/price-types-props';
import FileInput from '@/components/ui/file-input';
import cn from '@/utils/cn';

const BlockchainOptions = [
  {
    id: 1,
    name: 'Ethereum',
    value: 'ethereum',
    icon: <Ethereum />,
  },
  {
    id: 2,
    name: 'Flow',
    value: 'flow',
    icon: <Flow />,
  },
];
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

export default function CreateNFT() {
  let [publish, setPublish] = useState(true);
  let [explicit, setExplicit] = useState(false);
  let [unlocked, setUnlocked] = useState(false);
  let [priceType, setPriceType] = useState('fixed');
  let [blockchain, setBlockChain] = useState(BlockchainOptions[0]);
  return (
    <>
      <div className="mx-auto w-full sm:pt-0 lg:px-8 xl:px-10 2xl:px-0">
        <div className="mb-6 grid grid-cols-3 gap-12 sm:mb-10">
          <div className="col-span-3 flex items-center justify-between lg:col-span-2">
            <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
              Create New Item
            </h2>
            <Preview />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
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
        </div>

        {/* Price */}
        <div className="mb-8">
          <InputLabel title="Total Investment" important />
          <Input
            min={0}
            type="number"
            placeholder="Enter your investment"
            inputClassName="spin-button-hidden"
          />
        </div>
        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
            Actions
          </h3>
          <p className="mb-5 leading-[1.8] dark:text-gray-300">
            Enter the on-chain actions this proposal should take. Actions are
            executed in the order laid out here (ie. Action #1 fires, then
            Action #2, etc.)
          </p>
          <ActionFields />
        </div>
        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
            Title
          </h3>
          <p className="mb-5 leading-[1.8] dark:text-gray-300">
            Your title introduces your proposal to the voters. Make sure it is
            clear and to the point.
          </p>
          <Input placeholder="Enter title of your proposal" />
        </div>
        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <h3 className="mb-2 text-base font-medium dark:text-gray-100 xl:text-lg">
            Description
          </h3>
          <p className="mb-5 leading-[1.8] dark:text-gray-300">
            Your description should present in full detail what the actions of
            the proposal will do. This is where voters will educate themselves
            on what they are voting on.
          </p>
          <Textarea
            placeholder="Add the proposal details here"
            inputClassName="md:h-32 xl:h-36"
          />
        </div>
        {/* Name */}
        {/* <div className="mb-8">
          <InputLabel title="Name" important />
          <Input type="text" placeholder="Item name" />
        </div> */}

        {/* External link */}
        {/* <div className="mb-8">
          <InputLabel
            title="External link"
            subTitle="We will include a link to this URL on this item's detail page, so that users can click to learn more about it."
          />
          <Input type="text" placeholder="https://yoursite.io/item/123" />
        </div> */}

        {/* Description */}
        {/* <div className="mb-8">
          <InputLabel
            title="Description"
            subTitle="The description will be included on the item's detail page underneath its image."
          />
          <Textarea placeholder="Provide a detailed description of your item" />
        </div> */}

        {/* Unlockable content */}
        {/* <div className="mb-3">
          <ToggleBar
            title="Unlockable Content"
            subTitle="Include unlockable content that can only be revealed by the owner of the item."
            icon={<Unlocked />}
            checked={unlocked}
            onChange={() => setUnlocked(!unlocked)}
          >
            {unlocked && (
              <Textarea placeholder="Enter content (access key, code to redeem, link to a file, etc.)" />
            )}
          </ToggleBar>
        </div> */}

        {/* Explicit content */}
        {/* <div className="mb-8">
          <ToggleBar
            title="Explicit &amp; Sensitive Content"
            subTitle="Set this item as explicit and sensitive content"
            icon={<Warning />}
            checked={explicit}
            onChange={() => setExplicit(!explicit)}
          />
        </div> */}

        {/* Supply */}
        {/* <div className="mb-8">
          <InputLabel
            title="Supply"
            subTitle="The number of items that can be minted."
          />
          <Input type="number" placeholder="1" disabled />
        </div> */}

        {/* Blockchain */}
        {/* <div className="mb-8">
          <InputLabel title="Blockchain" />
          <div className="relative">
            <Listbox value={blockchain} onChange={setBlockChain}>
              <Listbox.Button className="text-case-inherit letter-space-inherit flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-900 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:border-gray-600 dark:hover:ring-gray-600 sm:h-12 sm:px-5">
                <div className="flex items-center">
                  <span className="ltr:mr-2 rtl:ml-2">{blockchain.icon}</span>
                  {blockchain.name}
                </div>
                <ChevronDown />
              </Listbox.Button>
              <Transition
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-gray-700 dark:bg-gray-800 xs:p-2">
                  {BlockchainOptions.map((option) => (
                    <Listbox.Option key={option.id} value={option}>
                      {({ selected }) => (
                        <div
                          className={`flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-gray-900 transition dark:text-gray-100 ${
                            selected
                              ? 'bg-gray-200/70 font-medium dark:bg-gray-600/60'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700/70'
                          }`}
                        >
                          <span className="ltr:mr-2 rtl:ml-2">
                            {option.icon}
                          </span>
                          {option.name}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div> */}

        <Button shape="rounded">CREATE</Button>
      </div>
    </>
  );
}
