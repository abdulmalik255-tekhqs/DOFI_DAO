'use client';

import AnchorLink from '@/components/ui/links/anchor-link';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useRouter } from 'next/navigation';
import Shib1 from '@/assets/images/dao/shib1.png';
import Shib2 from '@/assets/images/dao/shib2.png';
import Shib3 from '@/assets/images/dao/shib3.png';
import Shib4 from '@/assets/images/dao/shib4.png';
import Shib5 from '@/assets/images/dao/shib5.png';
import Shib6 from '@/assets/images/dao/shib6.png';
import Shib7 from '@/assets/images/dao/shib7.png';
import Shib8 from '@/assets/images/dao/shib8.png';


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
 const ShibimageList = [
    { id: 1, image: Shib1 },
    { id: 2, image: Shib2 },
    { id: 3, image: Shib3 },
    { id: 4, image: Shib4 },
    { id: 5, image: Shib5 },
    { id: 6, image: Shib6 },
    { id: 7, image: Shib7 },
    { id: 8, image: Shib8 },
  ];
    // Function to get the filtered image based on tokenID
  const getImageByTokenID = (id: string) => {
    const numericID = parseInt(id, 10);
    const match = ShibimageList.find((item) => item.id === numericID);
    return match ? match.image.src : image;
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
        alt={`NFT #${tokenID}`}
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
