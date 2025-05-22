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
      className="mt-4 md:mt-0 border-[#E2E8F0] border flex flex-col p-[12px] rounded-[10px] transition-all duration-200 bg-white cursor-pointer  max-h-[330px] "
      onClick={goToDetailPage}
    > 
      <img
         src={image}
        alt={`NFT #${tokenID}`}
        className="object-contain max-h-[254px] max-w-[185px]"
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
            <p className='text-[13px] text-[#3D4A5F] font-[500] mt-[16px]'
            title={name?.length > 18 ? name : undefined}
            > {name?.length > 18 ? `${name?.substring(0, 15)}..` : name} #{tokenID}</p> 
            <p className='font-[700] text-[17px] text-[#161F2E] mt-[3.5px] flex justify-between items-center'>({formatNumber(price)} DO.FI) 
              <span><Image src={RightArrow} alt="no-icon"/></span></p>
          </div>
        </AnchorLink>
      </div>
    </div>
  );
}
