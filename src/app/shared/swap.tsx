'use client';

import { Suspense, useEffect, useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { parseUnits } from 'viem';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fractionDaoABI, tetherABI } from '@/utils/abi';
import { config } from '@/app/shared/wagmi-config';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import cn from '@/utils/cn';
import { useFetchNFTSWAP, usePostCaculate, useSwap } from '@/hooks/livePricing';
import { BeatLoader } from 'react-spinners';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch, useSelector } from 'react-redux';
import ToastNotification from '@/components/ui/toast-notification';

const SwapPage = () => {
  const { mutate: submitSwap, isError, error } = useSwap();
  const { loading } = useSelector((state: any) => state.ido);
  const { address } = useAccount();
  const dispatch = useDispatch();
  const { writeContractAsync } = useWriteContract();
  let [toggleCoin, setToggleCoin] = useState(false);
  const [fromAmount, setFromAmount] = useState<any>(null);
  const [toAmount, setToAmount] = useState<any>(null);
  const [selectedFromSwapCoin, setSelectedFromSwapCoin] = useState<any>(null);
  const [selectedToSwapCoin, setSelectedToSwapCoin] = useState<any>(null);
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [blockNFT, setBlocknft] = useState<boolean>(false);
  const [selectedExpand, setSelectedExpand] = useState(false);
  const { mutate: submitCreate, data: calculationResult }: any =
    usePostCaculate();
  const { NFTSwap }: any = useFetchNFTSWAP();
  useEffect(() => {
    const timer = setTimeout(() => {
      const fromPricePerFraction = selectedFromSwapCoin?.pricePerToken || 1;
      const toPricePerFraction = selectedToSwapCoin?.pricePerToken || 1;
      const fromAmountValue = Number(fromAmount?.value);
      if (
        selectedFromSwapCoin?._id &&
        selectedToSwapCoin?._id &&
        selectedFromSwapCoin._id === selectedToSwapCoin._id
      ) {
        ToastNotification('error', "Same token can't be swapped.");
        return; // stop execution here
      }

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
    if (NFTSwap?.data?.userNFTs && selectedFromSwapCoin) {
      const foundNFT = NFTSwap.data.userNFTs.find((nft: any) => {
        const nftId = nft?.name;
        const selectedId = selectedFromSwapCoin?.name;
        setBlocknft(false);
        return nftId === selectedId;
      });

      if (foundNFT) {
        setBlocknft(false);
        setSelectedNFT(foundNFT);
      } else {
        setBlocknft(true);
        setSelectedNFT(null);
      }
    }
  }, [selectedFromSwapCoin, NFTSwap]);

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
      if (selectedNFT) {
        if (Number(selectedNFT?.amount) < Number(fromAmount?.value)) {
          ToastNotification(
            'error',
            'Entered Amount is should be less the nft amount holding!',
          );
          return;
        }

        if (blockNFT) {
          ToastNotification('error', 'You are not holding this NFT!');
          return;
        }
      }

      if (
        selectedFromSwapCoin?._id &&
        selectedToSwapCoin?._id &&
        selectedFromSwapCoin._id === selectedToSwapCoin._id
      ) {
        ToastNotification('error', "Same token can't be swapped.");
        return;
      }

      if (!fromAmount?.value) {
        ToastNotification('error', 'Enter Amount!');
        return;
      }
      if (selectedFromSwapCoin?.tokenType === 'ERC20') {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
          abi: tetherABI,
          functionName: 'transfer',
          args: [
            process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
            parseUnits(fromAmount?.value?.toString(), 18),
          ],
        });
        const recipient = waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        // if (recipient.status === 'success') {
        submitSwap({
          nftID: selectedToSwapCoin?._id,
          amountToMint: Number(calculationResult?.data?.toAmount),
        });
        // } else {
        //   dispatch(idoActions.setLoading(false));
        // }
      } else {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          address: process.env.NEXT_PUBLIC_FRACTIONDAO_TOKEN as `0x${string}`,
          abi: fractionDaoABI,
          functionName: 'safeTransferFrom',
          args: [
            address,
            process.env.NEXT_PUBLIC_MASTER_WALLET as `0x${string}`,
            selectedFromSwapCoin?.tokenId,
            parseUnits(fromAmount?.value?.toString(), 0),
            '0x',
          ],
        });
        const recipient = waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        // if (recipient.status === 'success') {
        if (selectedToSwapCoin.tokenType === 'ERC20') {
          submitSwap({
            type: 'USDT',
            amountToMint: Number(toAmount?.data?.toAmount),
          });
        } else {
          submitSwap({
            nftID: selectedToSwapCoin?._id,
            amountToMint: Number(toAmount?.data?.toAmount),
          });
        }
        // } else {
        //   dispatch(idoActions.setLoading(false));
        // }
      }
    } catch (error) {
      dispatch(idoActions.setLoading(false));
    }
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsButtonDisabled(Number(selectedFromSwapCoin?.tokenId) === Number(selectedToSwapCoin?.tokenId) || loading);
  // }, [selectedFromSwapCoin, selectedToSwapCoin, loading]);
  const hanldeExpand = () => {
    setSelectedExpand(!selectedExpand);
  };
  return (
    <>
      <Suspense>
        <Trade>
          <div className="mb-4">
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
              <div className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#1E293B] p-2">
                <SwapIcon className="h-4 w-4 text-white" />
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
          <div className="mt-[24px] border-b border-[#E2E8F0] border-gray-200 dark:border-gray-800"></div>
          <div className="flex justify-end">
            <Button
              size="medium"
              shape="rounded"
              fullWidth={true}
              className="mt-[24px] bg-[#0F172A] xs:tracking-widest"
              onClick={() => handleSwap()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <BeatLoader color="#fff" />
                </>
              ) : (
                'Swap'
              )}
            </Button>
          </div>
          <div className="mt-[24px]">
            <h2
              onClick={() => hanldeExpand()}
              className="flex cursor-pointer items-center justify-between text-center text-[16px] font-[500] text-[#0F172A] dark:text-white"
            >
              Advance details
              <span>
                {selectedExpand ? (
                  <ChevronUp className="text-text-[#0F172A] w-[20px] dark:text-white" />
                ) : (
                  <ChevronDown className="text-text-[#0F172A] w-[20px] dark:text-white" />
                )}
              </span>
            </h2>
          </div>
          {selectedExpand && (
            <>
              <div className="mt-[10px] flex flex-col gap-4 xs:gap-[10px]">
                <TransactionInfo label={'Rate'} />
                <TransactionInfo label={'Offered by'} />
                <TransactionInfo label={'Network Fee'} value={'0.35'} />
              </div>
            </>
          )}
        </Trade>
      </Suspense>
    </>
  );
};

export default SwapPage;
