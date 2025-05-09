'use client';

import AnchorLink from '@/components/ui/links/anchor-link';
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
  completeNFT: any;
};

export default function NFTGrid({
  author,
  image,
  name,
  price,
  tokenID,
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
      className="relative flex flex-col overflow-hidden rounded-lg shadow-card transition-all duration-200 shadow-lg cursor-pointer max-w-[260px]"
      onClick={goToDetailPage}
    >
      {/* Image section (no background) */}
      {/* <div className="w-full h-[300px] flex items-center justify-center !bg-[inherit]"> */}
      <img
        src={image}
        alt="NFT Image"
        className="object-contain max-h-full max-w-full"
      />
      {/* </div> */}

      {/* Text section (white bg) */}
      <div className="dark:bg-light-dark p-4 pt-3">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
            routes.nftDetails
          }
          className="block text-[12px] font-medium text-black dark:text-white truncate"
        >
          <div className="flex justify-between">
            <p>{name} #{tokenID}</p> <p className='font-bold text-[14px]'>({price} USDT)</p>
          </div>
        </AnchorLink>
      </div>
    </div>
  );
}
