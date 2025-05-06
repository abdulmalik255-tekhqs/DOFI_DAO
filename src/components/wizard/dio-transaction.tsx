'use client';
import { useSelector } from 'react-redux';
import { Copy } from '@/components/icons/copy';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { HashLoader } from 'react-spinners';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import routes from '@/config/routes';
import { FaCube, FaDollarSign, FaGlobe, FaLayerGroup, FaLink } from 'react-icons/fa6';

export default function DIOTransaction({ data }: any) {
  console.log(data,"datadata");
  
  const { loading, buyTransactionhash } = useSelector((state: any) => state.ido);
  const { idoDetaildata} = useSelector((state: any) => state.idodeatil);
  console.log(idoDetaildata,"idoDetaildataidoDetaildata");
  
  const router = useRouter();
  const dispatch = useDispatch();
  let [copyButtonStatus, setCopyButtonStatus] = useState('Copy');
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(buyTransactionhash?.transactionHash);
    setCopyButtonStatus('Copied!');
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 1000);
  };
  const handleBuy = async () => {
    // dispatch(idoActions.goToStep(0));
     router.push(`${routes.idoDetail}/${idoDetaildata?._id}`);
    // router.push(routes.idoDetail);
  };
 
  return (
    <>

      <div className='w-full justify-between flex'>
        <h2 className="mb-2 text-lg font-medium uppercase -tracking-wide text-gray-900 dark:text-white lg:text-xl ltr:text-left rtl:text-right">
          DIO Confirmation
        </h2>
      </div>
      {/* <div
                className={
                    'flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-100 p-4 dark:bg-light-dark'
                }
            >
                <div
                    className={
                        'flex w-full cursor-pointer flex-col items-center rounded-lg bg-gray-300 p-4 border-[#14161A] border-b-4 dark:bg-light-dark'
                    }
                >
                    {
                        loading ? <>

                            <HashLoader />
                        </> : <>
                        <div className="flex w-full justify-between">
                                <h3> Asset</h3>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                    DO.FI Fraction ERC1155
                                </h3>
                            </div>
                            <div className="flex w-full justify-between">
                                <h3> Domain</h3>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                    {data?.name}
                                </h3>
                            </div>
                            <div className="flex w-full justify-between">
                                <h3> Total Fraction</h3>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                    {buyTransactionhash?.totalFraction}
                                </h3>
                            </div>
                            <div className="flex w-full justify-between">
                                <h3> Price Per Fraction</h3>
                                <h3 className="text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                                    {buyTransactionhash?.priceFraction}
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
                </div>
            </div> */}
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
                  {buyTransactionhash?.priceFraction}
                </h3>
              </div>

              {/* Transaction Hash */}
              <div className="flex w-full items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2">
                  <FaLink className="text-gray-800 dark:text-white" />
                  <h3 className="font-medium text-gray-900 dark:text-white">Transaction Hash</h3>
                </div>
                <h3 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-900 dark:text-white">
                  {buyTransactionhash?.transactionHash?.slice(0, 6)}...{buyTransactionhash?.transactionHash?.slice(-6)}
                  <span
                    onClick={handleCopyToClipboard}
                    className="cursor-pointer rounded-full border border-gray-200 p-1 text-gray-600 transition hover:border-gray-300 hover:text-gray-900 dark:border-gray-700 dark:text-gray-400"
                  >
                    <Copy className="h-4 w-4" />
                  </span>
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
