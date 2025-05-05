'use client';
import { useSelector } from 'react-redux';
import Button from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { HashLoader } from 'react-spinners';
import { Copy } from '@/components/icons/copy';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useAccount } from 'wagmi';
import { Coins, Globe, Hash, User, Wallet } from 'lucide-react';

export default function BuyTransaction({ data }: any) {
    console.log(data,"dataaaa");
    
    const { loading, buyTransactionhash } = useSelector((state: any) => state.ido);
    const {address} = useAccount()
    let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
    let [_, copyToClipboard] = useCopyToClipboard();
    const handleCopyToClipboard = () => {
        copyToClipboard(buyTransactionhash?.transactionHash);
        setCopyButtonStatus('Copied!');
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 1000);
    };
    const dispatch = useDispatch();
    const handleBuy = async () => {
        dispatch(idoActions.nextStep());
    }
    return (
        <>

            <div className='w-full justify-between flex'>
                <h2 className="mb-2 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
                    Buy Confirmation
                </h2>
            </div>
            {/* <div
                className={
                    'flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-300 p-4 border-[#14161A] border-b-4 dark:bg-light-dark'
                }
            >
                {
                    loading ? <>

                        <HashLoader />
                    </> : <>
                        <div className="flex w-full justify-between">
                            
                            <h3>Asset</h3>
                            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                DO.FI Domain ERC721
                            </h3>
                        </div>
                        <div className="flex w-full justify-between">
                            
                            <h3>Domain</h3>
                            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                {data?.name}
                            </h3>
                        </div>
                        <div className="flex w-full justify-between">
                            <h3>Total Fee</h3>
                            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                               ${data?.price + 0.48}
                            </h3>
                        </div>
                        <div className="flex w-full justify-between">
                            <h3>Purchased By</h3>
                            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                            {address?.slice(0, 6)}
                                {'...'}
                                {address?.slice(address?.length - 6)}
                            </h3>
                        </div>
                        <div className="flex w-full justify-between">
                            <h3>Transaction Hash</h3>
                            <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white flex justify-center items-center gap-4">

                                {buyTransactionhash?.transactionHash?.slice(0, 6)}
                                {'...'}
                                {buyTransactionhash?.transactionHash?.slice(buyTransactionhash?.transactionHash?.length - 6)}
                                <span
                                    onClick={handleCopyToClipboard}
                                    className="text-md flex h-2 w-2 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400 xl:h-4 xl:w-4">
                                    <Copy className="h-2 w-2 lg:h-4 lg:w-4" />
                                </span>
                            </h3>
                        </div>
                    </>
                }
            </div> */}
            <div
  className={
    'flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-300 p-4 border-[#14161A] border-b-4 dark:bg-light-dark'
  }
>
  {loading ? (
    <HashLoader />
  ) : (
    <>
      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-gray-700 dark:text-white" />
          <h3>Asset</h3>
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          DO.FI Domain ERC721
        </h3>
      </div>

      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-700 dark:text-white" />
          <h3>Domain</h3>
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {buyTransactionhash?.name}
        </h3>
      </div>

      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-gray-700 dark:text-white" />
          <h3>Total Fee</h3>
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          ${buyTransactionhash?.price + 0.48}
        </h3>
      </div>

      <div className="flex w-full justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-700 dark:text-white" />
          <h3>Purchased By</h3>
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
          {address?.slice(0, 6)}...{address?.slice(address?.length - 6)}
        </h3>
      </div>

      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <Hash className="w-4 h-4 text-gray-700 dark:text-white" />
          <h3>Transaction Hash</h3>
        </div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white flex items-center gap-2">
          {buyTransactionhash?.transactionHash?.slice(0, 6)}...
          {buyTransactionhash?.transactionHash?.slice(-6)}
          <span
            onClick={handleCopyToClipboard}
            className="text-md flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-400"
          >
            <Copy className="h-4 w-4" />
          </span>
        </h3>
      </div>
    </>
  )}
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

                    Next

                </Button>
            </div>
        </>
    );
}
