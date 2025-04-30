'use client';

import React, { useEffect } from 'react';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyAccordionTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-accordion-table';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';

import { useIDO } from '@/hooks/livePricing';

const COLUMNS = [
  // {
  //   Header: () => <div className="px-1"></div>,
  //   accessor: 'symbol',
  //   // @ts-ignore
  //   Cell: ({ cell: { value } }) => (
  //     <div className="">
  //       <Star />
  //     </div>
  //   ),
  //   minWidth: 40,
  //   maxWidth: 20,
  // },
  {
    Header: '#',
    accessor: 'Token ID',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">{row.index + 1}</div>
      </div>
    ),
    minWidth: 40,
    maxWidth: 20,
  },
  {
    Header: () => <div className="">IDO Name</div>,
    accessor: 'name',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="ltr:text-left rtl:text-left">{row.original.name}</div>
      </div>
    ),
    minWidth: 100,
    maxWidth: 100,
  },
  {
    Header: () => <div className="">Price</div>,
    accessor: 'current_price',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="">{row.original.nftID?.price}</div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Investors</div>,
    accessor: 'currentw_price',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex w-auto items-center justify-center">
          {row.original.investors?.length}
        </div>
      </div>
    ),
    minWidth: 80,
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Soft Cap</div>,
    accessor: 'price_change_percentage_1h_in_currency',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center">
        <div className="flex w-auto items-center justify-center">
          {row.original.softCap}
        </div>
      </div>
    ),
    maxWidth: 80,
  },
  {
    Header: () => <div className="">Total Supply</div>,
    accessor: 'price_change_percentage_24h_in_currency',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center ltr:text-left rtl:text-left">
          {row.original.totalSupply}
        </div>
      </div>
    ),
    maxWidth: 80,
  },
  {
    Header: () => <div className="">status</div>,
    accessor: 'total_volume',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="flex h-auto w-auto items-center justify-center rounded-lg bg-brand p-4 text-white shadow-large ltr:text-left rtl:text-left">
          {row.original.status}
        </div>
      </div>
    ),
    maxWidth: 300,
  },
];

export default function CryptocurrencyPricingTable() {
  const { ido, isLoading } = useIDO();
  //@ts-ignore
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
