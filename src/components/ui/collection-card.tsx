import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/image';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import Detail from '@/assets/images/dao/detail.png';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
  image: StaticImageData;
  imageUrl?: any;
  amount?: number;
  tokenId?:any;
  contractAddress?:any;
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

export default function CollectionCard({ item, className = '' }: CardProps) {
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

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <img src={imageUrl} width={600} alt="no-image" />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-6">
        <div className="flex justify-end">
          <div
            onClick={() => goToNFTDetailPage()}
            className='cursor-pointer'
            // className="inline-flex h-8 shrink-0 border border-white cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
          >
           <Image src={Detail} alt="no-icon"/>
          </div>
        </div>
       
      </div>
       <div className="flex flex-col">
          <div className="inline-flex mt-2 items-center px-4 text-[14px] font-[500] tracking-wide">
            Token ID : <span className='ml-2 font-bold'>{item?.tokenId}</span>
          </div>
          <div
            className="ml-4 mt-2 inline-flex cursor-pointer items-center  text-[14px] font-[500] tracking-wide text-black cursor-pointer"
            title="Click to copy"
            onClick={() => {
              if (contractAddress) {
                navigator.clipboard.writeText(contractAddress);
              }
            }}
          >
            {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-6)}
          </div>

           {amount && amount <= 1 && (
            <>
              <div
                onClick={() => openModal('CREATE_IDO', item)}
                className="flex h-[47px] justify-center cursor-pointer items-center rounded-[12px] bg-[#0F172A] px-4 text-xs font-medium uppercase tracking-wide text-white mt-[10px]"
              >
                create DIO
              </div>
            </>
          )}
        </div>
    </div>
  );
}
