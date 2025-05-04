import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { FaSackDollar } from 'react-icons/fa6';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { useCreateIDO, useCreateIDOWizard } from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';
interface CreateIDOProps {
  data: any;
}
export default function CreateIDOWizard({ data }: CreateIDOProps) {
  const dispatch = useDispatch();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { loading, isConfetti } = useSelector((state: any) => state.ido);
  const [totalFraction, setTotalfraction] = useState('');
  const [priceFraction, setPricefraction] = useState('');
  const { mutate: submitCreate, isError, error } = useCreateIDOWizard();
  const handleBuy = async () => {
    try {
      // dispatch(idoActions.nextStep());
      // return
      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0x11c7f45e5dc8d090490e1ee96937e87604750331',
        abi: daoTokenABI,
        functionName: 'transferFrom',
        args: [
          address,
          '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
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
      console.log(recipient, "recipientrecipient");

      if (recipientRaw.status === 'success') {
        dispatch(idoActions.setBuytransactionHash(recipient));
        dispatch(idoActions.nextStep());
        submitCreate({
          //@ts-ignore
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
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(true));
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <h1 className="flex shrink-0 items-start justify-start text-start text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
          DIO
        </h1>
        <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
          <h2 className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white">
            Total Fraction
          </h2>
          <input
            type="number"
            value={totalFraction || ''}
            onChange={(e) => setTotalfraction(e.target.value)}
            className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
            placeholder="total fraction"
          />
        </label>

        <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
          <h2 className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
            Price Per Fraction
          </h2>
          <input
            type="number"
            value={priceFraction || ''}
            onChange={(e) => setPricefraction(e.target.value)}
            className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
            placeholder="price per fraction"
          />
        </label>

        <div className="mb-4 flex w-full flex-col">
          <h1 className="mb-2 flex shrink-0 items-center justify-center text-center text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
            Domain DAO Privilege
          </h1>
          <div className="mb-4 flex w-full flex-col">
            <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
              <FaSackDollar color="#FFFF00" /> Revenue Sharing
            </h2>
            <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
              Earn a share of revenue generated from domain monetization, leasing,
              or resales.
            </p>
          </div>
          <div className="mb-4 flex w-full flex-col">
            <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
              <AiOutlineGlobal color="#0000FF" /> Domain Utility Decisions
            </h2>
            <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
              Vote on how the ENS domain is used across dApps, marketplaces, or
              DAOs.
            </p>
          </div>
          <div className="mb-4 flex w-full flex-col">
            <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
              <GiBrain color="#FF00FF" /> Name Service Innovation
            </h2>
            <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
              Collaborate on experiments like subdomain leasing, identity use
              cases, or zk integrations.
            </p>
          </div>
          <div className="mb-4 flex w-full flex-col">
            <h2 className="justiy-center w-full items-center gap-2 text-[18px] font-medium text-black md:flex">
              <FaLock color="#FFFF00" /> Token-Gated Access
            </h2>
            <p className="justiy-center w-full items-start gap-2 text-[16px] font-normal text-black md:flex">
              Get exclusive access to token-holder-only tools, chats, and
              community calls.
            </p>
          </div>
        </div>
        <Button
          size="large"
          shape="rounded"
          onClick={() => handleBuy()}
          fullWidth={true}
          className="uppercase xs:tracking-widest"
          disabled={loading}
        >
          {loading ? (
            <>
              <BeatLoader color="#000" />
            </>
          ) : (
            'Create DIO'
          )}
        </Button>
      </div>
    </>
  );
}
