'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Verified } from '@/components/icons/verified';
import Avatar from '@/components/ui/avatar';
import { StaticImageData } from 'next/image';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useRouter } from 'next/navigation';

type NFTGridProps = {
  author: string;
  image: any;
  name: string;
  tokenID: string;
  price: string;
  key: string;
  completeNFT: any;
};

export default function NFTGrid({
  author,
  image,
  name,
  price,
  tokenID,
  key,
  completeNFT,
}: NFTGridProps) {
  const dispatch = useDispatch();
  const { layout } = useLayout();
  const router = useRouter();
  const goToDetailPage = () => {
    dispatch(idoActions.setNFTDetail(completeNFT));
    router.push(routes.nftDetails);
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white shadow-card transition-all duration-200 hover:shadow-large dark:bg-light-dark"
      onClick={() => goToDetailPage()}
    >
      <div className="p-4"></div>
      <AnchorLink
        href={
          (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
          routes.nftDetails
        }
        className="relative block w-full"
      >
        <img
          src={image}
          width={450}
          height={450}
          alt="no-image"
          className="w-full"
        />
      </AnchorLink>

      <div className="p-5">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
            routes.nftDetails
          }
          className="text-sm font-medium text-black dark:text-white"
        >
          {name} #{tokenID}
        </AnchorLink>
        {/* <div className="mt-1.5 flex">
          <AnchorLink
            href={
              (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
              routes.nftDetails
            }
            className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400"
          >
            {collection}
            <Verified className="ltr:ml-1 rtl:mr-1" />
          </AnchorLink>
        </div> */}
        <div className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {price} USDT
        </div>
      </div>
    </div>
  );
}
