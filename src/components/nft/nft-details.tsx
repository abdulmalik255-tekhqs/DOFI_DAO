'use client';

import { Suspense } from 'react';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits,  } from 'viem';
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
  const { mutate: submitBuyAsync } = useBuyQuery();
  const { writeContractAsync } = useWriteContract();
  const handleBuy = async () => {
    try {
      dispatch(idoActions.setLoading(true));
      const priceInWei = parseUnits(nftDetail?.price?.toString() || '0', 18);
      const hash = await writeContractAsync({
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
      }

      // openModal('CREATE_IDO', result);
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
       

       
      </div>
    </div>
  );
}
