'use client';

import { useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { fractionDaoABI, tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import cn from '@/utils/cn';
import { usePostCaculate, useSwap } from '@/hooks/livePricing';
import { BeatLoader } from 'react-spinners';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@/components/modal-views/context';
import ToastNotification from '@/components/ui/toast-notification';


const SwapPage = () => {
  const { mutate: submitSwap, isError, error } = useSwap();
  const { loading } = useSelector((state: any) => state.ido);
  const { openModal } = useModal();
  const { address } = useAccount();
  const dispatch = useDispatch();
  const { writeContractAsync } = useWriteContract();
  let [toggleCoin, setToggleCoin] = useState(false);
  const [fromAmount, setFromAmount] = useState<any>(null);
  const [toAmount, setToAmount] = useState<any>(null);
  const [selectedFromSwapCoin, setSelectedFromSwapCoin] = useState<any>(null);
  const [selectedToSwapCoin, setSelectedToSwapCoin] = useState<any>(null);
  const { mutate: submitCreate, data: calculationResult } = usePostCaculate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const fromPricePerFraction = selectedFromSwapCoin?.pricePerToken || 1;
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
    setToAmount(calculationResult || 0.0);
  }, [calculationResult]);

  const excangeRate = (value: any) => {
    const multiply = value * 0.05;
    return value - multiply;
  };

  const handleSwap = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (!fromAmount) {
        ToastNotification('error', 'Enter Amount!');
        return;
      }
      if (selectedFromSwapCoin?.tokenType === 'ERC20') {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          //@ts-ignore
          address: '0xD5062eAafdAa5e5d211Ffde0327c10D2369690b6',
          abi: tetherABI,
          functionName: 'transfer',
          args: [
            '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
            parseUnits(fromAmount?.value?.toString(), 18),
          ],
        });
        const recipient = await waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        if (recipient.status === 'success') {
          submitSwap({
            //@ts-ignore
            nftID: selectedToSwapCoin?._id,
            amountToMint: Number(fromAmount?.value),
          });
        } else {
          dispatch(idoActions.setLoading(false));
        }
      } else {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          //@ts-ignore
          address: '0xd2C0C989B44Ce73c65E4c974271823A873fE738a',
          abi: fractionDaoABI,
          functionName: 'safeTransferFrom',
          args: [
            address,
            '0x1357331C3d6971e789CcE452fb709465351Dc0A1',
            selectedFromSwapCoin?.tokenId,
            parseUnits(fromAmount?.value?.toString(), 0),
            '0x',
          ],
        });
        const recipient = await waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        if (recipient.status === 'success') {
          if (selectedToSwapCoin.tokenType === 'ERC20') {
            submitSwap({
              //@ts-ignore
              type: 'USDT',
              amountToMint: Number(fromAmount?.value),
            });
          } else {
            submitSwap({
              //@ts-ignore
              nftID: selectedFromSwapCoin?._id,
              amountToMint: Number(fromAmount?.value),
            });
          }
        } else {
          dispatch(idoActions.setLoading(false));
        }
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(selectedFromSwapCoin,selectedToSwapCoin,"coins");

  //   setIsButtonDisabled(Number(selectedFromSwapCoin?.tokenId) === Number(selectedToSwapCoin?.tokenId) || loading);
  // }, [selectedFromSwapCoin, selectedToSwapCoin, loading]);
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
            <div className="absolute left-1/2 top-1/2 z-[1] transform -translate-x-1/2 -translate-y-1/2 
                rounded-full bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 
                shadow-lg dark:bg-gray-600 p-2 flex items-center justify-center">
              <SwapIcon className="w-4 h-4 text-white" />
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
          <TransactionInfo label={'Network Fee'} value={'0.35'} />
          {/* <TransactionInfo label={'Criptic Fee'} /> */}
        </div>
        <div className="border-b border-dashed border-gray-200 dark:border-gray-800 mt-4"></div>
        <div className="flex justify-end">
          <Button
            size="medium"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
            onClick={() => handleSwap()}
            disabled={loading}
          >
            {loading ? (
              <>
                <BeatLoader color="#000" />
              </>
            ) : (
              'SWAP'
            )}
          </Button>
        </div>
      </Trade>
    </>
  );
};

export default SwapPage;
