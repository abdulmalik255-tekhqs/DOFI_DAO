import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTable, usePagination } from 'react-table';
import cn from '@/utils/cn';
import Button from '@/components/ui/button';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { ExportIcon } from '@/components/icons/export-icon';

const COLUMNS = [
  {
    Header: 'Voter',
    accessor: 'user.wallet',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div>
        {value ? `${value?.slice(0, 8)}...${value?.slice(-8)}` : ''}
      </div>
    ),
  },
  {
    Header: 'Voting weight',
    accessor: 'amount',
  },
  {
    Header: 'Decision',
    accessor: 'inFavor',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <span
        className={cn(
          'text-[13px] uppercase sm:text-inherit font-medium',
          value ? 'text-green-600' : 'text-red-600',
        )}
      >
        {value ? 'Approved' : 'Rejected'}
      </span>
    ),
  },
];

interface VoterTableTypes {
  votes: {
    voter: {
      id: string;
      link: string;
    };
    voting_weight: number;
    status: string[];
  }[];
  price:number
}

export default function VoterTable({ votes,price }: VoterTableTypes) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = votes || []
  const columns = useMemo(() => [
    {
      Header: 'Voter',
      accessor: 'user.wallet',
      Cell: ({ cell: { value } }: any) => (
        <div>
          {value ? `${value?.slice(0, 8)}...${value?.slice(-8)}` : ''}
        </div>
      ),
    },
    {
      Header: 'Vote Amount',
      accessor: 'amount',
      Cell: ({ cell: { value } }: any) => (
        // <div>{price && value ? (value / price).toFixed(2) : 'N/A'}</div>
        <div>{value.toFixed(2)}</div>
      ),
    },
    {
      Header: 'Decision',
      accessor: 'inFavor',
      Cell: ({ cell: { value } }: any) => (
        <span
          className={cn(
            'text-[13px] uppercase sm:text-inherit font-medium',
            value ? 'text-green-600' : 'text-red-600',
          )}
        >
          {value ? 'Approved' : 'Rejected'}
        </span>
      ),
    },
  ], [price]);
  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    setPageSize,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    usePagination,
  );
  let { pageIndex } = state;
  useEffect(() => {
    setPageSize(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      layout
      className=""
    >
      <table
        {...getTableProps()}
        className="w-full border-separate border-0 sm:pb-1"
      >
        <thead className="hidden sm:table-header-group">
          {headerGroups.map((headerGroup, idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  key={idx}
                  className={cn(
                    'pb-1 font-normal text-black font-[400] text-[14px] dark:text-gray-300',
                    column.id === 'status'
                      ? 'ltr:text-right rtl:text-left'
                      : 'ltr:text-left rtl:text-right',
                    column.id === 'voting_weight' && 'w-2/5',
                  )}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="text-sm text-gray-900 dark:text-gray-100"
        >
          {data.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="py-4 text-center text-black font-[400] text-[14px]">
                No records found.
              </td>
            </tr>
          ) : (
            page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={idx}
                  className="mb-3 grid md:border-b border-gray-200 pb-3 dark:border-gray-700 sm:mb-0 sm:table-row sm:border-b-0 sm:pb-0"
                >
                  {row.cells.map((cell, idx) => (
                    <td
                      {...cell.getCellProps()}
                      key={idx}
                      className="px-0 py-1 sm:py-2"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* <div className="flex w-full items-center justify-center text-sm xs:justify-end sm:mt-3">
        <div className="flex items-center gap-4">
          <Button
            size="mini"
            shape="rounded"
            variant="transparent"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
          </Button>
          <div className="uppercase dark:text-gray-100">
            Page {pageIndex + 1}{' '}
            <span className="text-gray-500 dark:text-gray-400">
              of {pageOptions.length}
            </span>
          </div>
          <Button
            size="mini"
            shape="rounded"
            variant="transparent"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <LongArrowRight className="h-auto w-4 rtl:rotate-180" />
          </Button>
        </div>
      </div> */}
    </motion.div>
  );
}
