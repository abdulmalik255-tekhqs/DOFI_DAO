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
import { useFetchNFTSWAP, usePostCaculate, useSwap } from '@/hooks/livePricing';
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
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [blockNFT, setBlocknft] = useState<boolean>(false);
  const { mutate: submitCreate, data: calculationResult } = usePostCaculate();
  const { NFTSwap } = useFetchNFTSWAP()

console.log("toAmount--->",toAmount)
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
        ToastNotification('error', 'Same token can\'t be swapped.');
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
    // @ts-ignore
    if (NFTSwap?.data?.userNFTs && selectedFromSwapCoin) {
      // @ts-ignore
      const foundNFT = NFTSwap.data.userNFTs.find((nft: any) => {
        const nftId = nft?.name;
        const selectedId = selectedFromSwapCoin?.name;
        setBlocknft(false)
        return nftId === selectedId;
      });

      if (foundNFT) {
        setBlocknft(false)
        setSelectedNFT(foundNFT);
      } else {
        setBlocknft(true)
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
  console.log("selectedNFT--->", selectedNFT)
  const handleSwap = async () => {
    try {
      if (!address) {
        ToastNotification('error', 'Connect wallet first!');
        return;
      }
      if (selectedNFT) {
        if (Number(selectedNFT?.amount) < Number(fromAmount?.value)) {
          ToastNotification('error', 'Entered Amount is should be less the nft amount holding!');
          return;
        };

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
        ToastNotification('error', 'Same token can\'t be swapped.');
        return;
      }

      if (!fromAmount?.value) {
        ToastNotification('error', 'Enter Amount!');
        return;
      }
      if (selectedFromSwapCoin?.tokenType === 'ERC20') {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          //@ts-ignore
          address: process.env.NEXT_PUBLIC_USDT_TOKEN as `0x${string}`,
          abi: tetherABI,
          functionName: 'transfer',
          args: [
            '0xA50673D518847dF8A5dc928B905c54c35930b949',
            parseUnits(fromAmount?.value?.toString(), 18),
          ],
        });
        const recipient = waitForTransactionReceipt(config.getClient(), {
          hash,
          pollingInterval: 2000,
        });
        // if (recipient.status === 'success') {
        submitSwap({
          //@ts-ignore
           //@ts-ignore
          nftID: selectedToSwapCoin?._id,
          //@ts-ignore
          amountToMint: Number(calculationResult?.data?.toAmount),
        });
        // } else {
        //   dispatch(idoActions.setLoading(false));
        // }
      } else {
        dispatch(idoActions.setLoading(true));
        const hash = await writeContractAsync({
          //@ts-ignore
          address: process.env.NEXT_PUBLIC_FRACTIONDAO_TOKEN as `0x${string}`,
          abi: fractionDaoABI,
          functionName: 'safeTransferFrom',
          args: [
            address,
            '0xA50673D518847dF8A5dc928B905c54c35930b949',
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
            //@ts-ignore
            type: 'USDT',
            amountToMint: Number(toAmount?.data?.toAmount),
          });
        } else {
          submitSwap({
            //@ts-ignore
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
  return (
    <>
      <Trade>
        <div className="mb-6">
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
                rounded-full bg-[#1E293B] p-2 flex items-center justify-center">
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
        <div className="border-b border-[#E2E8F0] border-gray-200 dark:border-gray-800 mt-4"></div>
        <div className="flex justify-end">
          <Button
            size="medium"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest bg-[#0F172A]"
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
