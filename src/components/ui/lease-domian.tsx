import Image from '@/components/ui/image';
import cn from '@/utils/cn';
import { useModal } from '@/components/modal-views/context';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import routes from '@/config/routes';
import { useRouter } from 'next/navigation';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
  imageUrl: any;
  image?: StaticImageData;
  amount?: number;
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

export default function LeaseDomainCard({ item, className = '' }: CardProps) {
  const {
    name,
    slug,
    title,
    imageUrl,
    image,
    number_of_artwork,
    user,
    amount,
  } = item ?? {};
  const router = useRouter();
  const { layout } = useLayout();
  const { openModal } = useModal();
  function goToNFTDetailPage() {
    setTimeout(() => {
      router.push(routes.nftDetails);
    }, 800);
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
        {/* <AnchorLink
          href={
            '/' + (layout === LAYOUT_OPTIONS.MODERN ? '' : layout + '/') + slug
          }
          className="absolute left-0 top-0 z-10 h-full w-full"
        /> */}
        <div className="flex justify-between gap-3">
          <div
            onClick={() => openModal('PAY_TOKEN_AMOUNT')}
            className="inline-flex h-8 shrink-0 cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white backdrop-blur-[40px]"
          >
            Pay
          </div>
          {/* <div
            onClick={() => goToNFTDetailPage()}
            className="inline-flex h-8 shrink-0 cursor-pointer items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white backdrop-blur-[40px]"
          >
            Detail View
          </div> */}
        </div>
      </div>
    </div>
  );
}
