import { useState } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { FaSackDollar } from 'react-icons/fa6';
import { useAccount } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { useCreateIDOWizard } from '@/hooks/livePricing';
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
  const { loading} = useSelector((state: any) => state.ido);
  const [totalFraction, setTotalfraction] = useState('');
  const [priceFraction, setPricefraction] = useState('');
  const { mutate: submitCreate } = useCreateIDOWizard();
  const handleBuy = async () => {
    try {

      dispatch(idoActions.setLoading(true));
      const hash = await writeContractAsync({
        //@ts-ignore
        address: '0xD82955e4721F14d3Ae3cCfd551F205b6AbC87211',
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
        dispatch(idoActions.setLoading(false));
        console.log('erer');
      }
    } catch (error) {
      dispatch(idoActions.setLoading(true));
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 p-4">
        {/* === DIO FORM CARD === */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h1 className="mb-6 text-2xl font-extrabold uppercase tracking-tighter text-gray-900 dark:text-white">
            DIO Setup
          </h1>

          <div className="space-y-6">
            {/* Total Fraction */}
            <label className="block">
              <span className="text-lg font-semibold uppercase text-gray-700 dark:text-gray-300">
                Total Fraction
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

            {/* Submit Button */}
            <Button
              size="large"
              shape="rounded"
              onClick={handleBuy}
              fullWidth
              disabled={loading}
              className="uppercase xs:tracking-widest"
            >
              {loading ? <BeatLoader color="#000" /> : 'Create DIO'}
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-left text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-red-500">Note:</span> This action will create the Domain Initial Offering for the purchased domain. Upon successful DIO completion, a separate domain sub-DAO is created where fraction holders can participate and vote using their ERC-1155 fraction assets.
            </p>
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
    </>
  );
}
