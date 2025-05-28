import type { CoinTypes } from '@/types';
import { useState } from 'react';
import { coinList } from '@/data/static/coin-list';
import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';
import { Tether } from '../icons/tether';
import { useFetchNFTSWAP } from '@/hooks/livePricing';
import { MoonLoader } from 'react-spinners';

interface CoinSelectViewTypes {
  onSelect: (selectedCoin: any) => void;
}

export default function CoinSelectView({ onSelect }: CoinSelectViewTypes) {
  const { closeModal } = useModal();
  let [searchKeyword, setSearchKeyword] = useState('');
  const { NFTSwap, isLoading } = useFetchNFTSWAP();

  const updatedCoinList: any[] = (NFTSwap as any)?.data?.nfts || [];

  let coinListData = updatedCoinList;

  if (searchKeyword.length > 0) {
    coinListData = updatedCoinList?.filter(function (item) {
      const name = item.name;
      return (
        name.match(searchKeyword) ||
        (name.toLowerCase().match(searchKeyword) && name)
      );
    });
  }
  function handleSelectedCoin(item: any) {
    onSelect(item);
    closeModal();
  }
  function handleSelectedCoinOnKeyDown(
    event: React.KeyboardEvent<HTMLLIElement>,
    item: any,
  ) {
    if (event.code === 'Enter') {
      onSelect(item);
      closeModal();
    }
  }
  return (
    <div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-dark xs:w-[400px]">
      <h2 className="p-6 text-lg font-medium uppercase text-gray-900 dark:text-white">
        Select NFT
      </h2>
      <div className="relative">
        <SearchIcon className="absolute left-6 h-full text-gray-700" />
        <input
          type="search"
          autoFocus={true}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search Your NFT by Name"
          className="w-full border-x-0 border-y border-dashed border-gray-200 py-3.5 pl-14 pr-6 text-sm focus:border-gray-300 focus:ring-0 dark:border-gray-700 dark:bg-light-dark focus:dark:border-gray-600"
        />
      </div>
      <ul role="listbox" className="min-h-[200px] py-3">
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-5">
            <MoonLoader />
          </div>
        ) : coinListData?.length > 0 ? (
          coinListData?.map((item, index) => (
            <li
              key={item.code}
              role="listitem"
              tabIndex={index}
              onClick={() => handleSelectedCoin(item)}
              onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, item)}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
            >
              <img
                className="h-6 w-6 rounded-full"
                src={
                  item?.name === 'DO.FI'
                    ? 'https://crimson-implicit-eel-562.mypinata.cloud/ipfs/bafybeicmjwhonuqleim7ququyfjjc25mlggyrlfar4qmywn7q4vecv4zi4/01.png'
                    : item?.imageUrl
                }
              />
              <span className="uppercase">{item?.name}</span>
            </li>
          ))
        ) : (
          // FIXME: need coin not found svg from designer
          <li className="px-6 py-20 text-center">
            <h3 className="mb-2 text-base">Ops! not found</h3>
            <p className="text-gray-500">Try another keyword for search</p>
          </li>
        )}
      </ul>
    </div>
  );
}
