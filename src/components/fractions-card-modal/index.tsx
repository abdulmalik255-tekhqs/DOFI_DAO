import { useState } from 'react';
import { parseUnits } from 'viem';
import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'viem/actions';
import { daoTokenABI } from '@/utils/abi';
import Button from '@/components/ui/button';
import { FaSackDollar } from 'react-icons/fa6';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { BeatLoader } from 'react-spinners';
import { AiOutlineGlobal } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { useCreateIDO } from '@/hooks/livePricing';
import { useDispatch, useSelector } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { config } from '@/app/shared/wagmi-config';

export default function FractionCardModal({ data }: any) {
    console.log(data, "data");


    return (
        <div className="w-[752px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">

            <h1 className="flex mb-[20px] shrink-0 items-center flex gap-4 justify-start text-end text-[32px] font-[500]  tracking-tighter text-[#1E293B] dark:text-white">
                Fractions <span className='text-[20px] mt-1'>({data?.amount})</span>
            </h1>
            <div className='border border-[#CBD5E1]'></div>
            <div className='flex justify-between mt-[24px]'>
                <div className='border border-[#E2E8F0] bg-[#F1F5F9] p-[20px] flex flex-col gap-[36px] rounded-[12px] max-h-[500px] md:h-[600px] 2xl:max-h-[720px] overflow-y-auto'>
                    {Array.from({ length: data?.amount }).map((_, index) => (
                        <div key={index}>
                            <img
                                src={data.imageUrl}
                                alt={`preview-${index}`}
                                className="w-[80px] h-[106px]"
                            />
                        </div>
                    ))}
                </div>
                <div className=' w-[80%]'>
                    <img
                        src={data?.imageUrl}
                        alt={`NFT #${data.tokenId}`}
                        className="w-full max-h-[500px] md:h-[600px] 2xl:max-h-[720px]"
                    />
                </div>
            </div>


        </div>
    );
}
