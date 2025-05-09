'use client';

import React, { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import GlobalFilter from '@/components/cryptocurrency-pricing-table/global-filter';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table';

import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import CryptocurrencyDrawer from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer';
import routes from '@/config/routes';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch } from 'react-redux';
import { idodetailActions } from '@/store/reducer/dio-detail.reducer';

function CryptocurrencyAccordionTable({
  // @ts-ignore
  columns,
  // @ts-ignore
  data,
  // @ts-ignore
  isLoading,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      // @ts-ignore
      data,
      initialState: { pageSize: 17 },
    },
    useGlobalFilter,
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination,
  );
  const { pageIndex } = state;
  const { globalFilter } = state;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  function goToAllProposalPage(data: any) {
    setTimeout(() => {
      localStorage.setItem('dioId', JSON.stringify(data?.original));
      dispatch(idodetailActions.saveIDOdata(data?.original));
      dispatch(idoActions.setIsConfetti(false));
      router.push(`${routes.idoDetail}/${data?.original?._id}`);
    }, 500);
  }
  return (
    <div className="relative z-20 mt-11 flex flex-col overflow-hidden rounded-lg  lg:flex-row">
      <div className="w-full transform transition duration-300 ease-in">
        <GlobalFilter />
        <div className="border border-[#E2E8F0] rounded-[12px] overflow-hidden">
          <div className="-mx-0.5 shadow-card dark:[&_.os-scrollbar_.os-scrollbar-track_.os-scrollbar-handle:before]:!bg-white/50">
            <div className="bg-white pt-6 dark:bg-light-dark  md:pt-8">
              <div
                className={`flex md:px-3 items-center justify-between gap-4 border-b border-[#E2E8F0] pb-5 dark:border-gray-700 ${!isOpen ? 'rounded-tr-lg' : ''
                  }`}
              >
                <h2 className="shrink-0 pl-[10px] text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:pl-0 2xl:text-xl 3xl:text-2xl">
                  Domain Initial Offering
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="flex w-full items-center justify-center">
                <MoonLoader />
              </div>
            ) : (
              <>
                <Scrollbar style={{ width: '100%' }} autoHide="never">
                  <div className="relative z-10">
                    <table {...getTableProps()} className="w-full">
                      <thead className="pricing-table-head block bg-[#F8FAFC] text-sm text-gray-500 ">
                        {headerGroups.map((headerGroup, idx) => (
                          <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={idx}
                            className="border-b border-[#E2E8F0]"
                          >
                            {headerGroup.headers.map((column, idx) => (
                              <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                key={idx}
                                className="group  md:px-5 py-3 font-normal first:!w-7 "
                              >
                                <div className="flex items-center text-[12px] text-[#64748B] justify-center">
                                  {column.render('Header')}
                                  {column.canResize && (
                                    <div
                                      {...column.getResizerProps()}
                                      className={`resizer ${column.isResizing ? 'isResizing' : ''
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
                              className=" md:px-3  h-[50px] max-h-[50px] cursor-pointer items-center uppercase transition-all last:mb-0 hover:bg-[#F3F4F6] dark:bg-light-dark hover:dark:bg-gray-700 border-b border-[#E2E8F0] dark:border-gray-700"
                              onClick={() => goToAllProposalPage(row)}
                            >
                              {row.cells.map((cell, idx) => (
                                <td
                                  {...cell.getCellProps()}
                                  key={idx}
                                  className={`flex h-[50px] items-center px-3 tracking-[1px] ${idx > 1 ? 'justify-center' : ''
                                    }`}
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
              </>
            )}
          </div>

          <div className="flex items-center justify-center bg-white text-sm shadow-card dark:bg-light-dark border-t border-[#E2E8F0] dark:border-gray-700">
            <div className="flex items-center gap-5 py-4">
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
        </div>


      </div>

      <CryptocurrencyDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <div
          className="absolute top-1/2 left-0 z-20 flex h-[60px] w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-tr-lg rounded-br-lg border border-slate-200 bg-gray-100 dark:border-brand dark:bg-brand"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ArrowRight />
        </div> */}
    </div>
  );
}

export default CryptocurrencyAccordionTable;
