'use client';

import { Suspense, useEffect } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import Button from '@/components/ui/button';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import FeaturedCard from '@/components/nft/featured-card';
import AnchorLink from '@/components/ui/links/anchor-link';
import Loader from '@/components/ui/loader';
import { useDispatch, useSelector } from 'react-redux';
import { useBuyQuery, useGetSingleNFTDetail } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import { BeatLoader, MoonLoader } from 'react-spinners';
import { useParams } from 'next/navigation';

export default function NftDetails() {
  const { previousRoute, loading, componentLoading } = useSelector(
    (state: any) => state.ido,
  );
  const { mutate: nftdetail, data: searchResult }: any =
    useGetSingleNFTDetail();

  const params = useParams();
  const dispatch = useDispatch();
  const { mutate: submitBuyAsync, isError, error, isSuccess } = useBuyQuery();
  const { writeContractAsync } = useWriteContract();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const priceInWei = parseUnits(
        searchResult?.data?.price?.toString() || '0',
        18,
      );
      const hash = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: [
          process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
          priceInWei,
        ],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        const result = await submitBuyAsync({ id: searchResult?.data?._id });
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };

  useEffect(() => {
    dispatch(idoActions.setComponentloading(true));
    nftdetail(params.id?.toString());
  }, []);
  return (
    <>
      {componentLoading ? (
        <>
          <div className="flex h-[100vh] w-full items-center justify-center">
            <MoonLoader />
          </div>{' '}
        </>
      ) : (
        <>
          <div className="mx-auto flex w-full flex-grow flex-col transition-all md:flex-row xl:max-w-[1360px] 4xl:max-w-[1920px]">
            <div className="relative flex flex-grow items-center justify-center">
              <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[467px]">
                <img
                  src={searchResult?.data?.imageUrl}
                  alt={`NFT #${searchResult?.data?.tokenId}`}
                  width={768}
                  className="h-[618px]"
                />
              </div>
            </div>

            <div className="relative flex h-[618px] w-full flex-col rounded-[20px] border border-[#E2E8F0] bg-white p-[32px] lg:w-[460px] xl:w-[596px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[10px]">
                  <h2 className="text-[24px] font-[500] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                    {searchResult?.data?.name} #{searchResult?.data?.tokenId}
                  </h2>
                  <p className="flex items-center text-[15px] font-[400] tracking-[-0.5px] text-[#64748B]">
                    Minted on{' '}
                    {new Date(searchResult?.data?.createdAt).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      },
                    )}
                  </p>
                </div>
                <div>
                  {' '}
                  <h2 className="text-[24px] font-[500] tracking-[-0.5px] text-[#0F172A] dark:text-white">
                    $DO.FI {searchResult?.data?.price}
                  </h2>
                </div>
              </div>
              <div className="my-[32px] border-b border-[#94A3B8]" />
              <div className="flex flex-wrap gap-2">
                <div className="w-[49%] shrink-0">
                  <h3 className="font-[500] text-[#0F172A] text-[16ox] dark:text-white">
                    Owned By
                  </h3>
                  <AnchorLink href="" className="inline-flex w-full">
                    <div className="flex w-full items-center justify-between rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-2 text-[14px] font-[500] text-[#64748B] dark:bg-light-dark">
                      {searchResult?.data?.contractAddress?.length > 30
                        ? searchResult?.data?.contractAddress.slice(0, 20) +
                          '...'
                        : searchResult?.data?.contractAddress}
                    </div>
                  </AnchorLink>
                </div>
                <div className="w-[49%] shrink-0">
                  <h3 className="font-[500] text-[#0F172A] text-[16ox] dark:text-white">
                    Collection
                  </h3>
                  <AnchorLink href="#" className="inline-flex w-full">
                    <div className="flex w-full items-center justify-between rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-2 text-[14px] font-[500] text-[#64748B] dark:bg-light-dark">
                      DAO Token
                    </div>
                  </AnchorLink>
                </div>

                <div className="mt-[32px] flex flex-col">
                  <Suspense fallback={<Loader variant="blink" />}>
                    <ParamTab
                      tabMenu={[
                        {
                          title: 'Details',
                          path: 'details',
                        },
                        // {
                        //   title: 'Bids',
                        //   path: 'bids',
                        // },
                        // {
                        //   title: 'History',
                        //   path: 'history',
                        // },
                      ]}
                    >
                      <TabPanel className="focus:outline-none">
                        <div className="space-y-6">
                          <div className="block">
                            <h3 className="mb-2 text-[14px] font-[500] text-[#0F172A] text-gray-900 dark:text-white">
                              Description
                            </h3>
                            <div className="text-[15px] font-[400] leading-6 tracking-[-0.5px] text-[#64748B] dark:text-gray-400">
                              {searchResult?.data?.description}
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel className="focus:outline-none">
                        <div className="flex flex-col-reverse">
                          {searchResult?.data?.bids?.map((bid: any) => (
                            <FeaturedCard
                              item={bid}
                              key={bid?.id}
                              className="mb-3 first:mb-0"
                            />
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="focus:outline-none">
                        <div className="flex flex-col-reverse">
                          {searchResult?.data?.history?.map((item: any) => (
                            <FeaturedCard
                              item={item}
                              key={item?.id}
                              className="mb-3 first:mb-0"
                            />
                          ))}
                        </div>
                      </TabPanel>
                    </ParamTab>
                  </Suspense>
                </div>
              </div>

              {previousRoute && (
                <>
                  <div className="absolute bottom-10 left-0 w-full px-[32px]">
                    <Button
                      shape="rounded"
                      fullWidth={true}
                      onClick={() => handleBuy()}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <BeatLoader color="#fff" />
                        </>
                      ) : (
                        'Buy'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
