import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import routes from '@/config/routes';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import Detail from '@/assets/images/dao/detail.png';
import ToastNotification from './toast-notification';


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
        <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-4">
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
          <div className="inline-flex mt-2 items-center  text-[14px] font-[500] tracking-wide">
            Token ID : <span className='ml-2 font-bold'>{item?.tokenId}</span>
          </div>
          <div
            className="z-[5] mt-2 inline-flex cursor-pointer items-center  text-[14px] font-[500] tracking-wide text-black cursor-pointer"
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
