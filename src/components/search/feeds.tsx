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
        'grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10',
        className,
      )}
    >
      {filteredData?.map((nft: any) => (
        <NFTGrid
          key={nft._id}
          name={nft.name}
          image={nft.imageUrl}
          author={nft.owner}
          price={nft.price}
          tokenID={nft.tokenId}
          completeNFT={nft}
        />
      ))}
    </div>
  );
}
