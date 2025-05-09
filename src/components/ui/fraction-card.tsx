import cn from '@/utils/cn';
import { StaticImageData } from 'next/image';
import AnchorLink from './links/anchor-link';
import Avatar from './avatar';

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

export default function FractionCard({ item, className = '' }: CardProps) {
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
  console.log(item, "item");

  return (
    <div
      className={cn(
        ' relative overflow-hidden rounded-lg',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <img src={imageUrl} width={600} alt="no-image" />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between p-5 md:p-6">
        <div className="relative group cursor-pointer">
          {/* Default Amount Pill */}
          <div className="inline-flex h-8 items-center rounded-2xl border border-white bg-white/20 px-4 text-xs font-medium tracking-wide text-white backdrop-blur-[40px] group-hover:hidden">
            Amount: <span className="ml-1 font-bold">{amount}</span>
          </div>

          {/* Image Boxes (hover only) */}
          {amount && amount > 0 && (
            <div className="absolute inset-0 flex gap-1 items-center justify-center group-hover:flex hidden">
              {Array.from({ length: amount }).map((_, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`preview-${index}`}
                  className="w-7 h-7 rounded border border-white object-cover"
                />
              ))}
            </div>
          )}
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
        </div>
    </div>
  );
}
