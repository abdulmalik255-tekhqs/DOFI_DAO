'use client';

import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';

function RewardAccordionTable({ columns, data, isLoading }: any) {
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
    previousPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
  );

  const { pageIndex } = state;

  return (
    <div className="relative z-20 mt-[20px] flex flex-col overflow-hidden rounded-lg lg:flex-row">
      <div className="w-full transform transition duration-300 ease-in">
        <div className="overflow-hidden rounded-[12px] border border-[#CBD5E1]">
          <div className="-mx-0.5 shadow-card dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
            <div className="bg-white py-[16px] pl-[20px]">
              <h2 className="shrink-0 pl-[10px] text-[20px] font-[500] uppercase text-[#0F172A] dark:text-white md:pl-0">
                Revenue Distribution
              </h2>
            </div>
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-5">
                <MoonLoader />
              </div>
            ) : (
              <>
                <Scrollbar style={{ width: '100%' }} autoHide="never">
                  <div className="relative z-10">
                    <table {...getTableProps()} className="w-full">
                      <thead className="pricing-table-head block bg-[#F8FAFC] text-sm text-gray-500">
                        {headerGroups.map((headerGroup, idx) => (
                          <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={idx}
                            className="border border-[#E2E8F0]"
                          >
                            {headerGroup.headers.map((column, idx) => (
                              <th
                                {...column.getHeaderProps(
                                  column.getSortByToggleProps(),
                                )}
                                key={idx}
                                className="group py-3 font-normal first:!w-7 md:px-[20px]"
                              >
                                <div className="flex items-start justify-start text-[12px] text-[#64748B]">
                                  {column.render('Header')}
                                  {column.canResize && (
                                    <div
                                      {...column.getResizerProps()}
                                      className={`resizer ${
                                        column.isResizing ? 'isResizing' : ''
                                      }`}
                                    />
                                  )}
                                </div>
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>

                      <tbody
                        {...getTableBodyProps()}
                        className="pricing-table-body grid bg-white text-xs font-medium text-gray-900 dark:bg-light-dark dark:text-white 3xl:text-sm"
                      >
                        {page?.map((row, idx) => {
                          prepareRow(row);
                          return (
                            <tr
                              {...row.getRowProps()}
                              key={idx}
                              className="h-[50px] max-h-[50px] cursor-pointer items-start border-b border-[#E2E8F0] uppercase transition-all last:mb-0 hover:bg-[#F3F4F6] dark:border-gray-700 dark:bg-light-dark hover:dark:bg-gray-700 md:px-1"
                            >
                              {row.cells.map((cell, idx) => (
                                <td
                                  {...cell.getCellProps()}
                                  key={idx}
                                  className="flex h-[50px] items-center justify-start px-5 text-left text-[16px] font-[400] tracking-[1px] text-[#0F172A]"
                                >
                                  {cell.render('Cell')}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Scrollbar>
                {data?.length > 0 ? (
                  <div className="flex items-center justify-center border-t border-[#E2E8F0] bg-white text-sm shadow-card dark:border-gray-700 dark:bg-light-dark">
                    <div className="flex items-center gap-5 py-2">
                      <Button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        title="Previous"
                        shape="circle"
                        variant="transparent"
                        size="small"
                        className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
                      >
                        <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
                      </Button>
                      <div>
                        Page{' '}
                        <strong className="font-semibold">
                          {pageIndex + 1} of {pageOptions.length}
                        </strong>
                      </div>
                      <Button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        title="Next"
                        shape="circle"
                        variant="transparent"
                        size="small"
                        className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
                      >
                        <LongArrowRight className="h-auto w-4 rtl:rotate-180" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center border-t border-[#E2E8F0] bg-white py-4 text-sm shadow-card dark:border-gray-700 dark:bg-light-dark">
                    <h2 className="shrink-0 pl-[10px] text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:pl-0 2xl:text-xl 3xl:text-2xl">
                      No Data Found
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardAccordionTable;
