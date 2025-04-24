import Image from '@/components/ui/image';
import cn from '@/utils/cn';
import { StaticImageData } from 'next/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

type ItemType = {
  id?: string | number;
  name: string;
  slug: string;
  title: string;
  cover_image: StaticImageData;
  image?: StaticImageData;
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
  const { name, slug, title, cover_image, image, number_of_artwork, user } =
    item ?? {};
  const { layout } = useLayout();
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg transition-transform hover:-translate-y-1',
        className,
      )}
    >
      <div className="relative flex aspect-[8/11] w-full justify-center overflow-hidden rounded-lg">
        <Image
          src={cover_image}
          placeholder="blur"
          width={600}
          priority
          quality={100}
          alt={name}
        />
      </div>
      <div className="absolute left-0 top-0 z-[5] flex h-full w-full flex-col justify-between bg-gradient-to-t from-black p-5 md:p-6">
        <AnchorLink
          href={
            '/' + (layout === LAYOUT_OPTIONS.MODERN ? '' : layout + '/') + slug
          }
          className="absolute left-0 top-0 z-10 h-full w-full"
        />
        <div className="flex justify-end gap-3">
          <div className="inline-flex h-8 shrink-0 items-center rounded-2xl bg-white/20 px-4 text-xs font-medium uppercase -tracking-wide text-white backdrop-blur-[40px]">
            Detail View
          </div>
        </div>
      </div>
    </div>
  );
}
