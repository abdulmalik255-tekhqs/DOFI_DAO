'use client';

import AnchorLink from '@/components/ui/links/anchor-link';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/utils/cn';
import RightArrow from '@/assets/images/dao/towardsright.svg';
import Image from 'next/image';

type NFTGridProps = {
  image: any;
  name: string;
  tokenID: string;
  price: string;
  completeNFT: any;
};

export default function NFTGrid({
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
    router.push(`${routes.nftDetails}/${completeNFT?._id}`);
  };

  return (
    <div
      className="mt-4 flex max-h-[330px] cursor-pointer flex-col rounded-[10px] border border-[#E2E8F0] bg-white p-[12px] transition-all duration-200 md:mt-0"
      onClick={goToDetailPage}
    >
      <img
        src={image}
        alt={`NFT #${tokenID}`}
        className="max-h-[254px] max-w-[185px] object-contain"
      />
      <div className="dark:bg-light-dark">
        <AnchorLink
          href={
            (layout === LAYOUT_OPTIONS.MODERN ? '' : `/${layout}`) +
            routes.nftDetails
          }
          className="block truncate"
        >
          <div className="flex flex-col">
            <p
              className="mt-[16px] text-[13px] font-[500] text-[#3D4A5F]"
              title={name?.length > 18 ? name : undefined}
            >
              {' '}
              {name?.length > 18 ? `${name?.substring(0, 15)}..` : name} #
              {tokenID}
            </p>
            <p className="mt-[3.5px] flex items-center justify-between text-[17px] font-[700] text-[#161F2E]">
              ({formatNumber(price)} DO.FI)
              <span>
                <Image src={RightArrow} alt="no-icon" />
              </span>
            </p>
          </div>
        </AnchorLink>
      </div>
    </div>
  );
}
