import { ChevronDown } from '@/components/icons/chevron-down';
import { coinList } from '@/data/static/coin-list';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import type { CoinTypes } from '@/types';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '../modal-views/context';

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: any;
  defaultCoinIndex?: number;
  className?: string;
  toAmount?: any,
  getCoinValue?: (param: { coin: string; value: string }) => void;
  onSelectCoin?: (coin: any) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
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
  let [value, setValue] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(coinList[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const integerPattern = /^[0-9]*$/;
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });

  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(integerPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      getCoinValue && getCoinValue(param);
    }
  };
  function handleSelectedCoin(coin: any) {
    setSelectedCoin(coin);
    onSelectCoin?.(coin);
  }

  useEffect(() => {
    if (label === 'To') {
      setValue(toAmount?.data?.toAmount);
    }
  }, [toAmount, label]);
  return (
    <>
      <div
        className={cn(
          'group flex min-h-[70px] bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] transition-colors duration-200 hover:border-gray-900',
          className,
        )}
      >
        <div className="min-w-[80px] border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-[10px] text-[16px] uppercase text-[#94A3B8] text-center font-[400]">
            {label}
          </span>
          <button
            onClick={() =>
              openModal('SWAP_COIN_SELECT', { handleSelectedCoin })
            }
            className="flex mt-3 items-center font-medium outline-none dark:text-gray-100"
          >
            {selectedCoin?.imageUrl && <img className="h-6 w-6 rounded-full" src={"https://crimson-implicit-eel-562.mypinata.cloud/ipfs/bafybeicmjwhonuqleim7ququyfjjc25mlggyrlfar4qmywn7q4vecv4zi4/01.png"} />}
            {selectedCoin?.name ? <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.name} </span> : <span className='text-[16px] font-[400] text-[#334155] '>Select Token</span>}
            
            <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5 text-[#334155]" />
          </button>
        </div>
        <div className="flex flex-1 flex-col text-right">
          <input
            type="text"
            value={value}
            placeholder="0"
            inputMode="numeric"
            disabled={label === 'To'}
            onChange={handleOnChange}
            onKeyDown={(e) => {
              if (e.key === '.' || e.key === ',' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            className="w-full bg-[#F8FAFC] rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 placeholder:text-[#334155]"
            {...rest}
          />
          <span className="font-xs px-3 text-gray-400">
            = ${exchangeRate ? exchangeRate : '0.00'}
          </span>
        </div>
      </div>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
