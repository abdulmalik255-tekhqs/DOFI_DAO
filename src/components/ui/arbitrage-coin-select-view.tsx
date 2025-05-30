import { useState } from 'react';
import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';
import { useFetchNFTARBITRAGE, useFetchNFTSWAP } from '@/hooks/livePricing';
import { MoonLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

interface CoinSelectViewTypes {
  onSelect: (selectedCoin: any) => void;
}

export default function CoinSelectView({ onSelect }: CoinSelectViewTypes) {
  const { closeModal } = useModal();
  const { arbitrageRoutedata } = useSelector((state: any) => state.ido);

  function handleArbitrageSelectedCoin(item: any) {
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
      <ul role="listbox" className="min-h-[200px] py-3">
        {arbitrageRoutedata?.length > 0 ? (
          arbitrageRoutedata?.map((item: any, index: any) => (
            <li
              key={Number(item.tokenId)}
              role="listitem"
              tabIndex={index}
              onClick={() => handleArbitrageSelectedCoin(item)}
              onKeyDown={(event) => handleSelectedCoinOnKeyDown(event, item)}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
            >
              <img className="h-6 w-6 rounded-full" src={item?.image} />
              <span className="uppercase">{item?.tokenName}</span>
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
