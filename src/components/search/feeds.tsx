import cn from '@/utils/cn';
import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';
import { MoonLoader } from 'react-spinners';

export default function Feeds({
  data,
  isLoading,
  className,
}: {
  data?: any; // Ideally type this correctly
  isLoading?: boolean;
  className?: string;
}) {
  const filteredData = data?.filter((nft: any) => {
    return Number(nft.amount) <= 1;
  });
  const { isGridCompact } = useGridSwitcher();
  return (
    <div
      className={cn(
        'grid gap-5 sm:grid-cols-2 md:grid-cols-3',
        isGridCompact
          ? '3xl:!grid-cols-4 4xl:!grid-cols-5'
          : '3xl:!grid-cols-3 4xl:!grid-cols-4',
        className,
      )}
    >
      {isLoading ? (
        <>
          <div className="flex h-full w-full items-center justify-center p-6">
            <MoonLoader />
          </div>{' '}
        </>
      ) : (
        filteredData?.map((nft: any) => (
          <NFTGrid
            key={nft._id}
            name={nft.name}
            image={nft.imageUrl}
            author={nft.owner}
            price={nft.price}
            tokenID={nft.tokenId}
            completeNFT={nft}
          />
        ))
      )}
    </div>
  );
}
