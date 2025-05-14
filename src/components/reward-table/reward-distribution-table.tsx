'use client';

import React, { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import Image from 'next/image';
import { useReward } from '@/hooks/livePricing';
import ToastNotification from '../ui/toast-notification';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Share from '@/assets/images/dao/redirect.png';
import CopyIcon from '@/assets/images/dao/copyicon.png';
import RewardAccordionTable from './reward-accordion-table';

const COLUMNS = [
    {
        Header: '#',
        accessor: 'Token ID',
        // @ts-ignore
        Cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <div className="text-left">{row.index + 1}</div>
            </div>
        ),
        minWidth: 40,
        maxWidth: 20,
    },
    {
        Header: () => <div className="">Transaction #</div>,
        accessor: 'total_volume',
        // @ts-ignore
        Cell: ({ row }) => {
            const [_, copyToClipboard] = useCopyToClipboard();
            function handleCopyToClipboard() {
                //@ts-ignore
                copyToClipboard(row?.original?.txHash);
                ToastNotification("success", "Copied!")
            }
            return (
                <div className="flex items-start gap-1">
                    <h3
                        title={row?.original?.txHash > 9 ? row?.original?.txHash : undefined}
                        className="flex items-start justify-start text-left">

                        {row?.original?.txHash?.slice(0, 4)}
                        {'...'}
                        {row?.original?.txHash?.slice(row?.original?.txHash?.length - 5)}
                        <div
                            title="Copy Address"
                          className="flex cursor-pointer items-center justify-center ml-[5px]"
                            onClick={() => handleCopyToClipboard()}
                        >
                            <Image src={CopyIcon} alt="no-icon" width={15} />
                        </div>
                    </h3>
                </div>
            );

        },

    },
    {
        Header: () => <div className="">Domain Name</div>,
        accessor: 'name',
        // @ts-ignore
        Cell: ({ row }) => (
            <div className="flex items-start gap-2">
                <h3 className="text-left"
                    title={row?.original?.nft?.name?.length > 9 ? row?.original?.nft?.name : undefined}
                >
                    {row?.original?.nft?.name?.length > 15 ? `${row?.original?.nft?.name?.substring(0, 10)}...` : row?.original?.nft?.name}
                </h3>
            </div>
        ),

    },
    {
        Header: () => <div className="">DAO Name</div>,
        accessor: 'dao_name',
        // @ts-ignore
        Cell: ({ row }) => (
            <div className="flex items-start gap-2">
                <h3
                    title={row?.original?.childDAO?.name?.length > 9 ? row?.original?.childDAO?.name : undefined}
                    className="text-left">

                    {row?.original?.childDAO?.name?.length > 15 ? `${row?.original?.childDAO?.name?.substring(0, 10)}...` : row?.original?.childDAO?.name}
                </h3>
            </div>
        ),
    },
    {
        Header: () => <div className="">$ DOFI</div>,
        accessor: 'amount',
        // @ts-ignore
        Cell: ({ row }) => (
            <div className="flex items-start gap-2">
                <div className="flex w-auto items-start justify-start">
                    $DO.FI {row?.original?.amount}
                </div>
            </div>
        ),
    },
    {
        Header: () => <div className="">From</div>,
        accessor: 'from',
        // @ts-ignore
        Cell: ({ row }) => {
           
            const [_, copyToClipboard] = useCopyToClipboard();
            function handleCopyToClipboard() {
                //@ts-ignore
                copyToClipboard(row?.original?.from);
                ToastNotification("success", "Copied!")
            }
            return (
                <div className="flex items-start gap-1">
                    <div
                        className="flex items-start justify-start text-left"
                        title={row?.original?.from > 9 ? row?.original?.from : undefined}
                    >
                        {row?.original?.from?.slice(0, 5)}
                        {'...'}
                        {row?.original?.from?.slice(row?.original?.from?.length - 5)}
                        <div
                            title="Copy Address"
                            className="flex cursor-pointer items-center justify-center ml-[5px]"
                            onClick={() => handleCopyToClipboard()}
                        >
                              <Image src={CopyIcon} alt="no-icon" width={15}/>
                        </div>
                    </div>
                </div>
            )
        },
    },
    {
        Header: () => <div className="">To</div>,
        accessor: 'to',
        // @ts-ignore
        Cell: ({ row }) => {
            const [_, copyToClipboard] = useCopyToClipboard();
            function handleCopyToClipboard() {
                //@ts-ignore
                copyToClipboard(row?.original?.to);
                ToastNotification("success", "Copied!")
            }
            return (
                <div className="flex items-start gap-2">
                    <div
                        title={row?.original?.to > 9 ? row?.original?.to : undefined}
                        className="flex items-start justify-start text-left">
                        {row?.original?.to?.slice(0, 5)}
                        {'...'}
                        {row?.original?.to?.slice(row?.original?.to?.length - 5)}
                        <div
                            title="Copy Address"
                            className="flex cursor-pointer items-center justify-center ml-[5px]"
                            onClick={() => handleCopyToClipboard()}
                        >
                              <Image src={CopyIcon} alt="no-icon" width={15}/>
                        </div>
                    </div>
                </div>
            )
        },
    },

    {
        Header: () => <div className=""></div>,
        accessor: 'share',
        // @ts-ignore
        Cell: ({ row }) => {
            return (
                <a href={`https://sepolia.basescan.org/tx/${row?.original?.txHash}`} target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-end gap-2 cursor-pointer text-[#1D4ED8]"
                >
                    <Image src={Share} alt="no-icon" />
                </a>
            );
        },
        maxWidth: 70,
    },
];

export default function RewardDistributionTable() {
    const { reward, isLoading } = useReward();


    //@ts-ignore
    const data = React.useMemo(() => reward?.data ?? [], [reward?.data]);
    const columns = React.useMemo(() => COLUMNS, []);

    return (
        <RewardAccordionTable
            columns={columns}
            data={data}
            isLoading={isLoading}
        />
    );
}
