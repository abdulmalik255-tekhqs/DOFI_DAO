import cn from '@/utils/cn';
import { NFTList } from '@/data/static/nft-list';
import NFTGrid from '@/components/ui/nft-card';
import { useGridSwitcher } from '@/lib/hooks/use-grid-switcher';

export default function Feeds({
  data,
  isLoading,
  className,
}: {
  data?: any;
  isLoading?: boolean;
  className?: string;
}) {
  const filteredData = data?.filter((nft: any) => {
    return Number(nft.amount) <= 1;
  });
  const { isGridCompact } = useGridSwitcher();
  return (
    <>
      {filteredData?.length > 0 ? <div
        className={cn(
          'flex flex-col sm:flex-row sm:flex-wrap gap-[12px] mt-[20px]',
          className,
        )}
      >
        {/* grid gap-[12px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-[20px] */}
        
        {filteredData?.map((nft: any) => (
          <div> 
            <NFTGrid
              key={nft._id}
              name={nft.name}
              image={nft.imageUrl}
              author={nft.owner}
              price={nft.price}
              tokenID={nft.tokenId}
              completeNFT={nft}
            />
          </div>
        ))}
      </div> : <div className='w-full flex justify-center items-center'>
        <h2 className="text-[#0F172A] font-[400] uppercase xl:text-[24px]  py-5 px-4">
          No Explore Domains Found
        </h2>
      </div>}


    </>
  );
}
