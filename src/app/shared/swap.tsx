'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import cn from '@/utils/cn';
import { usePostCaculate } from '@/hooks/livePricing';

const SwapPage = () => {
  let [toggleCoin, setToggleCoin] = useState(false);
  const [fromAmount, setFromAmount] = useState<any>(null);
  const [toAmount, setToAmount] = useState<any>(null);
  const [selectedFromSwapCoin, setSelectedFromSwapCoin] = useState<any>(null);
  const [selectedToSwapCoin, setSelectedToSwapCoin] = useState<any>(null);
  const { mutate: submitCreate, data: calculationResult } = usePostCaculate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fromPricePerFraction = selectedFromSwapCoin?.pricePerToken;
      const toPricePerFraction = selectedToSwapCoin?.pricePerToken;
      const fromAmountValue = Number(fromAmount?.value);

      if (
        fromPricePerFraction &&
        toPricePerFraction &&
        fromAmount?.value &&
        !isNaN(fromAmountValue)
      ) {
        submitCreate({
          fromPricePerFraction,
          fromAmount: fromAmountValue,
          toPricePerFraction,
        });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [fromAmount, selectedFromSwapCoin, selectedToSwapCoin]);

  useEffect(() => {
    setToAmount(calculationResult || 0.00)
  }, [calculationResult])

  const excangeRate = (value: any) => {
    const multiply = value * 0.05
    return value - multiply
  }
  return (
    <>
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div
            className={cn(
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col',
            )}
          >
            <CoinInput
              label={'From'}
              exchangeRate={excangeRate(fromAmount?.value)}
              defaultCoinIndex={20}
              getCoinValue={(data: any) => setFromAmount(data)}
              onSelectCoin={(coin: any) => setSelectedFromSwapCoin(coin)}

            />
            <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
              <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                // onClick={() => setToggleCoin(!toggleCoin)}
              >
                <SwapIcon className="h-auto w-3" />
              </Button>
            </div>
            <CoinInput
              label={'To'}
              exchangeRate={excangeRate(toAmount?.data?.toAmount)}
              defaultCoinIndex={20}
              getCoinValue={(data) => console.log('To coin value:', data)}
              onSelectCoin={(coin: any) => setSelectedToSwapCoin(coin)}
              toAmount={toAmount}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px]">
          {/* <TransactionInfo label={'Min. Received'} /> */}
          <TransactionInfo label={'Rate'} />
          <TransactionInfo label={'Offered by'} />
          {/* <TransactionInfo label={'Price Slippage'} value={'1%'} /> */}
          <TransactionInfo label={'Network Fee'} value={"0.35"} />
          {/* <TransactionInfo label={'Criptic Fee'} /> */}
        </div>
        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          SWAP
        </Button>
      </Trade>
    </>
  );
};

export default SwapPage;
