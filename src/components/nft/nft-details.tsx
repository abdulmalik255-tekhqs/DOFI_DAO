'use client';

import { Suspense } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits, formatEther } from 'viem';
import { tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import { StaticImageData } from 'next/image';
import Button from '@/components/ui/button';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import FeaturedCard from '@/components/nft/featured-card';
import AnchorLink from '@/components/ui/links/anchor-link';
import { nftData } from '@/data/static/single-nft';
import Avatar from '@/components/ui/avatar';
import Loader from '@/components/ui/loader';
import { useDispatch, useSelector } from 'react-redux';
import { useBuyQuery } from '@/hooks/livePricing';
import { idoActions } from '@/store/reducer/ido-reducer';
import { BeatLoader } from 'react-spinners';

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};

type NftDetailsProps = {
  isAuction?: boolean;
  image: StaticImageData;
  name: string;
  description: string;
  minted_date: string;
  minted_slug: string;
  price: number;
  creator: Avatar;
  collection: Avatar;
  owner: Avatar;
  block_chains: Avatar[];
};

export default function NftDetails({ product }: { product: NftDetailsProps }) {
  const {
    isAuction,
    image,
    name,
    description,
    minted_date,
    minted_slug,
    price,
    creator,
    collection,
    owner,
    block_chains,
  } = product;
  const { nftDetail, previousRoute, loading } = useSelector(
    (state: any) => state.ido,
  );

  const dispatch = useDispatch();
  const { mutate: submitBuyAsync, isError, error, isSuccess } = useBuyQuery();
  const { writeContractAsync } = useWriteContract();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const priceInWei = parseUnits(nftDetail?.price?.toString() || '0', 18);
      const hash = await writeContractAsync({
        //@ts-ignore
        address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
        abi: tetherABI,
        functionName: 'transfer',
        args: ['0xA50673D518847dF8A5dc928B905c54c35930b949', priceInWei],
      });
      const recipient = await waitForTransactionReceipt(config.getClient(), {
        hash,
      });
      if (recipient.status === 'success') {
        const result = await submitBuyAsync({ id: nftDetail?._id });
      } else {
        console.log('erer');
      }

      // openModal('CREATE_IDO', result);
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] xl:w-[calc(100%-550px)] 3xl:w-[calc(100%-632px)] ltr:md:left-0 ltr:md:pl-6 ltr:lg:pl-8 ltr:xl:pl-[340px] ltr:xl:pr-12 ltr:2xl:pl-96 ltr:4xl:pl-0 rtl:md:right-0 rtl:md:pr-6 rtl:lg:pr-8 rtl:xl:pl-12 rtl:xl:pr-[340px] rtl:2xl:pr-96 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full overflow-hidden rounded-lg">
              <img
                src={nftDetail?.imageUrl}
                alt="no-image"
                width={768}
                className="h-full"
              />
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-grow flex-col justify-between lg:min-h-[calc(100vh-96px)] lg:w-[460px] xl:w-[592px] ltr:md:ml-auto ltr:md:pl-8 ltr:lg:pl-12 ltr:xl:pl-20 rtl:md:mr-auto rtl:md:pr-8 rtl:lg:pr-12 rtl:xl:pr-20">
          <div className="block">
            <div className="block">
              <div className="flex justify-between">
                <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  {nftDetail?.name} #{nftDetail?.tokenId}
                </h2>
                {/* <div className="mt-1.5 shrink-0 xl:mt-2 ltr:ml-3 rtl:mr-3">
                  <NftDropDown />
                </div> */}
              </div>
              <AnchorLink
                href=""
                className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5"
              >
                <p>
                  Minted on{' '}
                  {new Date(nftDetail?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {/* <ArrowLinkIcon className="h-3 w-3 ltr:ml-2 rtl:mr-2" /> */}
              </AnchorLink>
              <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Owned By
                  </h3>
                  <AnchorLink href="" className="inline-flex">
                    <div className="flex items-center justify-between rounded-full bg-white p-2 text-gray-400 shadow-card dark:bg-light-dark">
                      {nftDetail?.contractAddress?.length > 30
                        ? nftDetail?.contractAddress.slice(0, 20) + '...'
                        : nftDetail?.contractAddress}
                    </div>
                  </AnchorLink>
                </div>
                <div className="shrink-0 lg:px-6">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Collection
                  </h3>
                  <AnchorLink href="#" className="inline-flex">
                    <div className="flex items-center justify-between rounded-full bg-white p-2 text-gray-400 shadow-card dark:bg-light-dark">
                      DAO Token
                    </div>
                  </AnchorLink>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col pb-5 xl:mt-9">
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
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Description
                        </h3>
                        <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                          {nftDetail?.description}
                        </div>
                      </div>
                      {/* <div className="block">
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Owner
                        </h3>
                        <AnchorLink href={owner?.slug} className="inline-block">
                          <ListCard
                            item={owner}
                            className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          />
                        </AnchorLink>
                      </div>
                      <div className="block">
                        <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                          Block Chain
                        </h3>
                        <div className="flex flex-col gap-2">
                          {block_chains?.map((item: any) => (
                            <AnchorLink
                              href="#"
                              className="inline-flex"
                              key={item?.id}
                            >
                              <ListCard
                                item={item}
                                className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                              />
                            </AnchorLink>
                          ))}
                        </div>
                      </div> */}
                    </div>
                  </TabPanel>
                  <TabPanel className="focus:outline-none">
                    <div className="flex flex-col-reverse">
                      {nftData?.bids?.map((bid) => (
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
                      {nftData?.history?.map((item) => (
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
              <div className="-mx-4 border-t-2 border-gray-900 px-4 pb-5 pt-4 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pb-7 lg:pt-6">
                <div className="w-full">
                  <Button
                    shape="rounded"
                    fullWidth={true}
                    onClick={() => handleBuy()}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <BeatLoader color="#000" />
                      </>
                    ) : (
                      'BUY'
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* <NftFooter
            className="hidden md:block"
            currentBid={nftData?.bids[nftData?.bids?.length - 1]}
            auctionTime={Date.now() + 4000000 * 10}
            isAuction={isAuction}
            price={price}
          /> */}
        </div>
        {/* <NftFooter
          currentBid={nftData?.bids[nftData?.bids?.length - 1]}
          auctionTime={Date.now() + 4000000 * 10}
          isAuction={isAuction}
          price={price}
        /> */}
      </div>
    </div>
  );
}
