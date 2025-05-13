import cn from '@/utils/cn';
import { StaticImageData } from 'next/image';
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
  imageUrl: any;
  image?: StaticImageData;
  amount?: number;
  tokenId?: any;
  contractAddress?: string;
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

export default function FractionCard({ item, className = '' }: any) {
  const {
    name,
    slug,
    title,
    imageUrl,
    image,
    number_of_artwork,
    user,
    tokenId,
    contractAddress,
    amount,
  } = item ?? {};
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
    <div
      className={cn(
        ' relative overflow-hidden rounded-lg',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg max-w-[220px] max-h-[291px]">
        <img src={imageUrl}
          alt={`NFT #${item?.tokenId}`} width={600} />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-6">
        <div className="relative group cursor-pointer">
          {/* Default Amount Pill */}
          <div className="inline-flex h-8 items-center rounded-2xl border border-white bg-white/20 px-4 text-xs font-medium tracking-wide text-white backdrop-blur-[40px] group-hover:hidden">
            Amount: <span className="ml-1 font-bold">{amount}</span>
          </div>

          {/* Image Boxes (hover only) */}
          {amount && amount > 0 && (
            <div
              className={cn(
                "absolute top-6 inset-x-0 bg-white rounded-[12px] w-[150px] p-2 hidden group-hover:flex items-center justify-center",
                amount > 15 && "overflow-y-auto max-h-[200px]"
              )}
            >
              <div className="grid grid-cols-4 gap-1 w-[150px]">
                {Array.from({ length: amount }).map((_, index) => (
                  <div key={index}>
                    <img
                      src={imageUrl}
                      alt={`preview-${index}`}
                      className="w-12 h-12 rounded border border-white object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
    </div>
  );
}
