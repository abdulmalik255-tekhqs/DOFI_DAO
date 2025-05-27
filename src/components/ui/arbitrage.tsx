'use client';

import { useEffect, useState } from 'react';
import { Listbox } from '@headlessui/react'
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
import DoubleArrowDown from '@/assets/images/dao/doublearrowdown.svg';
import DoubleArrowUP from '@/assets/images/dao/doublearrowup.svg';
import Image from 'next/image';


const ArbitragePage = () => {
    const dex = [
        {
            code: 'DEX 1',
            name: 'DEX 1',

        },
        {
            code: 'DEX 2',
            name: 'DEX 2',
        },

    ];
    const { loading } = useSelector((state: any) => state.ido);
    const [fromAmount, setFromAmount] = useState<any>(null);
    const [selectedCoin, setSelectedCoin] = useState(dex[0]);
    const excangeRate = (value: any) => {
        const multiply = value * 0.05;
        return value - multiply;
    };


    return (
        <>
            <Listbox value={selectedCoin} onChange={setSelectedCoin}>
                <div className="relative">
                    <Listbox.Button className="w-full h-[62px] rounded-[8px] border border-[#E2E8F0] bg-[#FBFCFE] px-4 text-[20px] font-[500] text-[#334155] focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                        <div className="flex items-center gap-2 justify-between">
                            {selectedCoin.name} <span><Image src={DoubleArrowDown} alt="no-icon" /></span>
                        </div>
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-900 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                        {dex.map((coin) => (
                            <Listbox.Option
                                key={coin.code}
                                value={coin}
                                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                {coin.name}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
            <div className='border border-[#CBD5E1] mt-[24px]'></div>
            <div className="mb-6 mt-[24px]">
                <div
                    className={cn(
                        'relative flex gap-3 flex-col',
                    )}
                >
                    <CoinInput
                        label={'From'}
                        exchangeRate={excangeRate(fromAmount?.value)}
                        defaultCoinIndex={20}
                        getCoinValue={(data: any) => setFromAmount(data)}

                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 xs:gap-[18px]">
                <TransactionInfo label={'Dex 1 Rate'} value={'--'} />
                <TransactionInfo label={'Dex 2 Rate'} value={'--'} />
                <TransactionInfo label={'Net Profit'} value={"$0.03"} />
            </div>
            <div className="border-b border-[#E2E8F0] border-gray-200 dark:border-gray-800 mt-4"></div>
            <div className="flex justify-end">
                <Button
                    size="medium"
                    shape="rounded"
                    fullWidth={true}
                    className="mt-6 uppercase xs:mt-8 xs:tracking-widest bg-[#0F172A]"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <BeatLoader color="#000" />
                        </>
                    ) : (
                        'Approve'
                    )}
                </Button>
            </div>
        </>
    );
};

export default ArbitragePage;
