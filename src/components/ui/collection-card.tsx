import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import Detail from '@/assets/images/dao/detail.png';
import Shib1 from '@/assets/images/dao/shib1.png';
import Shib2 from '@/assets/images/dao/shib2.png';
import Shib3 from '@/assets/images/dao/shib3.png';
import Shib4 from '@/assets/images/dao/shib4.png';
import Shib5 from '@/assets/images/dao/shib5.png';
import Shib6 from '@/assets/images/dao/shib6.png';
import Shib7 from '@/assets/images/dao/shib7.png';
import Shib8 from '@/assets/images/dao/shib8.png';
import ToastNotification from './toast-notification';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
  image: StaticImageData;
  imageUrl?: any;
  amount?: number;
  tokenId?: any;
  contractAddress?: any;
  _id?: string;
  number_of_artwork: number;
  user: {
    avatar?: StaticImageData;
    name: string;
    slug: string;
  };
};
type CardProps = {
  item: ItemType;
  className?: string;
};

export default function CollectionCard({ item, className = '' }: any) {
  const {
    name,
    slug,
    title,
    imageUrl,
    image,
    number_of_artwork,
    user,
    _id,
    tokenId,
    contractAddress,
    amount,
  } = item ?? {};
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const router = useRouter();
  function goToNFTDetailPage() {
    dispatch(idoActions.setNFTDetail(item));
    router.push(routes.nftDetails);
  }
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
  const getImageByTokenID = (id: string) => {
    const numericID = parseInt(id, 10);
    const match = ShibimageList.find((item) => item.id === numericID);
    return match ? match.image.src : image;
  };
  return (
    <>

      <div
        className={cn(
          'group relative max-w-[220px] overflow-hidden rounded-lg',
          className,
        )}
      >
        <div className="relative  flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
          <img src={imageUrl}
            alt={`NFT #${item?.tokenId}`} width={600} />
        </div>
        <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-6">
          <div className="flex justify-end">
            <div
              onClick={() => goToNFTDetailPage()}
              className='cursor-pointer'
            // className="inline-flex h-8 shrink-0 border border-white cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
            >
              <Image src={Detail} alt="no-icon" />
            </div>
          </div>

        </div>
        <div className="flex flex-col">
          <div className="inline-flex mt-2 items-center px-4 text-[14px] font-[500] tracking-wide">
            Token ID : <span className='ml-2 font-bold'>{item?.tokenId}</span>
          </div>
          <div
            className="z-[5] ml-4 mt-2 inline-flex cursor-pointer items-center  text-[14px] font-[500] tracking-wide text-black cursor-pointer"
            title="Click to copy"
            onClick={() => {
              if (contractAddress) {
                ToastNotification("success","Copied!")
                navigator.clipboard.writeText(contractAddress);
              }
            }}
          >
            {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-6)}
          </div>
        </div>
        {amount && amount <= 1 && (
          <>
            <div
              onClick={(e) => openModal('CREATE_IDO', item)}
              className="relative z-[5] flex h-[47px] justify-center cursor-pointer items-center rounded-[12px] bg-[#0F172A] px-4 text-xs font-medium uppercase tracking-wide text-white mt-[10px]"
            >
              create DIO
            </div>
          </>
        )}
      </div>

    </>
  );
}
