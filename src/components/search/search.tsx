'use client';

import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';
import { useLatestDomain } from '@/hooks/livePricing';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { MoonLoader } from 'react-spinners';

export default function Search() {
  const { openDrawer } = useDrawer();
  const dispatch = useDispatch();
  const { domainData, isLoading } = useLatestDomain();
  console.log(domainData, 'domainData');

  useEffect(() => {
    dispatch(idoActions.setPreviousRoute(true));
  }, []);
  //@ts-ignore
  const filteredData = domainData?.data?.filter((nft: any) => {
    return Number(nft.amount) <= 1;
  });
  return (
    <>
      {isLoading ? (
        <>
          <div className="flex h-[100vh] w-full items-center justify-center">
            <MoonLoader />
          </div>{' '}
        </>
      ) : (
        <>
          {' '}
          <div className="grid 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)]">
            <div className="hidden border-dashed border-gray-200 dark:border-gray-700 2xl:block ltr:border-r ltr:pr-8 rtl:border-l rtl:pl-8">
              <Filters />
            </div>
            <div className="2xl:ltr:pl-8 4xl:ltr:pl-10 2xl:rtl:pr-8 4xl:rtl:pr-10">
              <div className="relative z-10 mb-6 flex items-center justify-between">
                {isLoading ? null : (
                  <span className="text-xs font-medium text-gray-900 dark:text-white sm:text-sm">
                    {
                      //@ts-ignore
                      filteredData?.length
                    }{' '}
                    items
                  </span>
                )}

                <div className="flex gap-6 3xl:gap-8">
                  {/* <SortList /> */}
                  {/* <div className="hidden 3xl:block">
              <GridSwitcher />
            </div> */}
                  {/* <div className="hidden sm:block 2xl:hidden">
              <Button
                shape="rounded"
                size="small"
                variant="ghost"
                color="gray"
                onClick={() => openDrawer('DRAWER_SEARCH')}
                className="!h-11 !p-3 hover:!translate-y-0 hover:!shadow-none focus:!translate-y-0 focus:!shadow-none"
              >
                <OptionIcon className="relative h-auto w-[18px]" />
              </Button>
            </div> */}
                </div>
              </div>
              <Feeds
                data={
                  //@ts-ignore
                  domainData?.data
                }
                isLoading={isLoading}
              />
            </div>
          </div>
        </>
      )}

      {/* <div className="fixed bottom-6 left-1/2 z-10 w-full -translate-x-1/2 px-9 sm:hidden">
          <Button onClick={() => openDrawer('DRAWER_SEARCH')} fullWidth>
            Filters
          </Button>
        </div> */}
    </>
  );
}
