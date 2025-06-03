import { useEffect, useState } from 'react';
import { useModal } from '@/components/modal-views/context';
import { MoonLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

interface CoinSelectViewTypes {
  onSelect: (selectedCoin: any) => void;
}

export default function CoinSelectView({ onSelect }: CoinSelectViewTypes) {
  const { closeModal } = useModal();
  const { arbitrageRoutedata } = useSelector((state: any) => state.ido);
  const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);
  return (
    <div className="w-full rounded-lg bg-white text-sm shadow-large dark:bg-dark xs:w-[400px]">
      <h2 className="p-6 text-lg font-medium uppercase text-[#0F172A] dark:text-white">
        Select NFT
      </h2>
      {loading ? (
        <>
          <div className="flex w-full items-center justify-center py-3">
            <MoonLoader />
          </div>
        </>
      ) : (
        <>
          <ul role="listbox" className="py-2">
            {arbitrageRoutedata?.length > 0 ? (
              arbitrageRoutedata?.map((item: any, index: any) => (
                <li
                  key={Number(item.tokenId)}
                  role="listitem"
                  tabIndex={index}
                  onClick={() => handleArbitrageSelectedCoin(item)}
                  onKeyDown={(event) =>
                    handleSelectedCoinOnKeyDown(event, item)
                  }
                  className="flex cursor-pointer items-center gap-2 px-6 py-3 outline-none hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
                >
                  <img className="h-6 w-6 rounded-full" src={item?.image} />
                  <span className="uppercase">{item?.tokenName}</span>
                </li>
              ))
            ) : (
              <li className="px-6 text-center">
                <h3 className="text-[#0F172A">Ops! not found</h3>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
