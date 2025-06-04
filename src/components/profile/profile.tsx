'use client';

import { useEffect } from 'react';
import ProfileTab from '@/components/profile/profile-tab';
import { idoActions } from '@/store/reducer/ido-reducer';
import { useDispatch } from 'react-redux';
import { useFetchOwnerAllNfts } from '@/hooks/livePricing';

export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(idoActions.setPreviousRoute(false));
  }, []);
  const { ownerNFT }: any = useFetchOwnerAllNfts();

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-6 lg:flex-row 3xl:pt-10">
      <div className="grow pb-9 pt-6 md:-mt-2.5 md:pb-0 md:pt-1.5 md:ltr:pl-1 lg:ltr:pl-1 3xl:ltr:pl-1 md:rtl:pr-7 lg:rtl:pr-10 3xl:rtl:pr-14">
        <ProfileTab
          data={ownerNFT?.data}
          leasingData={ownerNFT?.leasedDomainNFTs}
        />
      </div>
    </div>
  );
}
