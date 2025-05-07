import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/navigation';
import { StaticImageData } from 'next/image';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';

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
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <img src={imageUrl} width={600} alt="no-image" />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <div className="flex justify-between gap-3">
          {amount && amount <= 1 && (
            <>
              <div
                onClick={() => openModal('CREATE_IDO', item)}
                className="inline-flex h-8 border border-white shrink-0 cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
              >
                create DIO
              </div>
            </>
          )}

          <div
            onClick={() => goToNFTDetailPage()}
            className="inline-flex h-8 shrink-0 border border-white cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase tracking-wide text-white backdrop-blur-[40px]"
          >
            Detail View
          </div>
        </div>
        <div className="flex justify-between">
          <div className="inline-flex h-8 border border-white shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium tracking-wide text-white backdrop-blur-[40px]">
            Token ID<span className='ml-2 font-bold'>{item?.tokenId}</span>
          </div>
          <div
            className="inline-flex cursor-pointer h-8 border border-white shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium tracking-wide text-white backdrop-blur-[40px] cursor-pointer"
            title="Click to copy"
            onClick={() => {
              if (contractAddress) {
                navigator.clipboard.writeText(contractAddress);
              }
            }}
          >
            {contractAddress?.slice(0, 6)}...{contractAddress?.slice(-6)}
          </div>
        </div>
      </div>
    </div>
  );
}
