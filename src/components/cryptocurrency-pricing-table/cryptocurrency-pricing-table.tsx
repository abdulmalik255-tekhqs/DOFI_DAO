'use client';

import React, {  useState } from 'react';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyAccordionTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-accordion-table';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';
import { useIDO } from '@/hooks/livePricing';
import ToastNotification from '../ui/toast-notification';
import routes from '@/config/routes';
import { useCopyToClipboard } from 'react-use';
import Image from 'next/image';
import Share from '@/assets/images/dao/share.png';
import { formatNumber } from '@/utils/cn';

const COLUMNS = [
  {
    Header: '#',
    accessor: 'Token ID',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">{row?.index + 1}</div>
      </div>
    ),
    minWidth: 40,
    maxWidth: 20,
  },
  {
    Header: () => <div className="">DIO Name</div>,
    accessor: 'name',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">
          {row?.original?.name?.length > 15 ? `${row?.original?.name.substring(0, 15)}...` : row?.original?.name}
        </div>
      </div>
    ),
    minWidth: 70,
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Price</div>,
    accessor: 'current_price',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div className="">{row?.original?.nftID?.price ? `$${formatNumber(row?.original?.nftID?.price)}` : `$${formatNumber("3641")}`}</div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Investors</div>,
    accessor: 'currentw_price',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div className="flex w-auto items-center justify-center">
          {row?.original?.investors?.length}
        </div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 70,
  },
  {
    Header: () => <div className="">Soft Cap</div>,
    accessor: 'price_change_percentage_1h_in_currency',
    Cell: ({ row }:any) => (
      <div className="flex items-center">
        <div className="flex w-auto items-center justify-center">
          ${formatNumber(row?.original?.softCap)}
        </div>
      </div>
    ),
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Total Supply</div>,
    accessor: 'price_change_percentage_24h_in_currency',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center ltr:text-left rtl:text-left">
          {row?.original?.totalSupply}
        </div>
      </div>
    ),
    maxWidth: 100,
  },
  
  {
    Header: () => <div className="">Status</div>,
    accessor: 'total_volume',
    Cell: ({ row }:any) => (
      <div className="flex items-center gap-2">
        <div
          className={`flex h-auto w-[140px] capitalize items-center justify-center rounded-full px-4 py-1 text-sm font-medium shadow-md
    ${row?.original?.status === 'successful'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : row?.original?.status === 'failed'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : row?.original?.status === 'active'
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-800 border border-gray-300'
            }`}
        >
          {row?.original?.status}
        </div>
      </div>
    ),
    maxWidth: 90,
    minWidth: 90,
  },
  {
    Header: () => <div className="">Share</div>,
    accessor: 'share',
    Cell: ({ row }:any) => {
      const [copyButtonStatus, setCopyButtonStatus] = useState(false);
      const [_, copyToClipboard] = useCopyToClipboard();
      const shareUrl = `${process.env.NEXT_PUBLIC_FRONT_END_ENDPOINT}${routes.idoDetail}/${row?.original?._id}`;
      function handleCopyToClipboard(e: React.MouseEvent) {
        e.stopPropagation(); // prevent row redirect
        copyToClipboard(shareUrl);
        setCopyButtonStatus(true);
        ToastNotification('success', 'Now you can share DIO!');
        setTimeout(() => {
          setCopyButtonStatus(false); // ✅ reset correctly
        }, 2500);
      }
      return (
        <div
          className="flex items-center justify-center gap-2 cursor-pointer"
          onClick={handleCopyToClipboard}
        >
          <Image src={Share} alt="no-icon" />
        </div>
      );
    },
    maxWidth: 90,
  },
];

export default function CryptocurrencyPricingTable() {
  const { ido, isLoading }: any = useIDO();
  const data = React.useMemo(() => ido?.data ?? [], [ido?.data]);
  const columns = React.useMemo(() => COLUMNS, []);
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  return isMounted &&
    ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
    <CryptocurrencyDrawerTable columns={columns} data={data} />
  ) : (
    <CryptocurrencyAccordionTable
      columns={columns}
      data={data}
      isLoading={isLoading}
    />
  );
}
