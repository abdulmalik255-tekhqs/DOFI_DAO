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
  const { domainData, isLoading }:any = useLatestDomain();
  

  useEffect(() => {
    dispatch(idoActions.setPreviousRoute(true));
  }, []);
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
          <div className="">
            <h2 className="mb-2 text-[24px] font-[700] text-[#1E293B] uppercase dark:text-gray-100  bg-white py-5 px-4 rounded-[10px] border border-[#E2E8F0]">
              Explore Domains
            </h2>
            <div className="">
              <Feeds
                data={
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
