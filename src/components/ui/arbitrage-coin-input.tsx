import { ChevronDown } from '@/components/icons/chevron-down';
import { coinList } from '@/data/static/coin-list';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import cn from '@/utils/cn';
import { useRef, useState } from 'react';
import { useModal } from '../modal-views/context';

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: any;
  defaultCoinIndex?: number;
  className?: string;
  toAmount?: any;
  getCoinValue?: (param: { coin: string; value: string }) => void;
  onSelectCoin?: (coin: any) => void;
}

export default function ArbitrageCoinInput({
  label,
  getCoinValue,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  toAmount,
  onSelectCoin,
  ...rest
}: CoinInputTypes) {
  const { openModal } = useModal();
  let [selectedCoin, setSelectedCoin] = useState(coinList[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });

  useLockBodyScroll(visibleCoinList);

  function handleArbitrageSelectedCoin(coin: any) {
    setSelectedCoin(coin);
    onSelectCoin?.(coin);
  }
  return (
    <>
      <div
        className={cn(
          'group flex min-h-[70px] rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] transition-colors duration-200 hover:border-gray-900',
          className,
        )}
      >
        <div className="min-w-[80px] border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-[10px] text-center text-[16px] font-[400] uppercase text-[#94A3B8]">
            {label}
          </span>
          <button
            onClick={() =>
              openModal('ARBITRAGE_COIN_SELECT', {
                handleArbitrageSelectedCoin,
              })
            }
            className="mt-3 flex items-center font-medium outline-none dark:text-gray-100"
          >
            {selectedCoin?.imageUrl && (
              <img
                className="h-6 w-6 rounded-full"
                src={
                  'https://crimson-implicit-eel-562.mypinata.cloud/ipfs/bafybeicmjwhonuqleim7ququyfjjc25mlggyrlfar4qmywn7q4vecv4zi4/01.png'
                }
              />
            )}
            {selectedCoin?.name ? (
              <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.name} </span>
            ) : (
              <span className="text-[16px] font-[400] text-[#334155]">
                Select NFT
              </span>
            )}

            <ChevronDown className="text-[#334155] ltr:ml-1.5 rtl:mr-1.5" />
          </button>
        </div>
      </div>
    </>
  );
}

ArbitrageCoinInput.displayName = 'CoinInput';
