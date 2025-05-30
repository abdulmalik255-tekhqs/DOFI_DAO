import React, { useEffect, useState, Suspense } from 'react';
import cn from '@/utils/cn';
import ListCard from '@/components/ui/list-card';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
// static data
import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import Loader from '@/components/ui/loader';
import FractionCard from '../ui/fraction-card';
import LeaseDomainCard from '../ui/lease-domian';
import { useSelector } from 'react-redux';
import FractionAmount from '../ui/fraction-amount';

const tabMenu = [
  {
    title: 'Domain NFTs',
    path: 'collection',
  },
  {
    title: 'Fractions',
    path: 'portfolio',
  },
  {
    title: 'Lease Domain',
    path: 'leasedomain',
  },
];

export default function ProfileTab({ data, leasingData }: any) {
const { toogle } = useSelector((state: any) => state.ido);
  const { layout } = useLayout();
  const [domain, setDomain] = useState([]);
  const [fraction, setFraction] = useState([]);
  const [leasedDomainNFTs, setLeasedDomainNFTs] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const domainArr: any = [];
      const fractionArr: any = [];

      data.forEach((item) => {
        if (item.amount > 1) {
          fractionArr.push(item);
        } else {
          domainArr.push(item);
        }
      });

      setDomain(domainArr);
      setFraction(fractionArr);
    }
    setLeasedDomainNFTs(leasingData)
  }, [data]);

  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:flex-wrap gap-[12px]',
              // grid gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-4 3xl:grid-cols-4 4xl:grid-cols-4
            )}
          >
            {domain?.length > 0 ? (
              domain?.map((collection: any, index: number) => (
                <CollectionCard
                  item={collection}
                  key={`collection-key-${collection?._id}`}
                />
              ))
            ) : (
              <>
                <div>
                  <p className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
                    No Domain NFT
                  </p>
                </div>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <>
          {toogle && <>
          <FractionAmount/>
          </>}
            <div
              className={cn(
                'flex flex-col sm:flex-row sm:flex-wrap gap-[12px]',
                // grid gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-4 3xl:grid-cols-4 4xl:grid-cols-4
              )}
            >
              {fraction?.length > 0 ? (
                fraction?.map((fraction: any, index: number) => (
                  <FractionCard
                    item={fraction}
                    key={`fraction-key-${fraction?._id}`}
                  />
                ))
              ) : (
                <>
                  <div>
                    <p className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
                      No Fraction NFT
                    </p>
                  </div>
                </>
              )}
            </div>
          </>

        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              'flex flex-col sm:flex-row sm:flex-wrap gap-[12px]',
              // grid gap-4 xs:grid-cols-2 lg:grid-cols-4 lg:gap-4 xl:gap-4 3xl:grid-cols-4 4xl:grid-cols-4
            )}
          >
            {leasingData?.length > 0 ? (
              leasingData?.map((leasingData: any, index: number) => (
                <LeaseDomainCard
                  item={leasingData}
                  key={`fraction-key-${leasingData?._id}`}
                />
              ))
            ) : (
              <>
                <div>
                  <p className="flex shrink-0 items-start justify-start text-start text-[20px] font-medium uppercase tracking-tighter text-gray-900 dark:text-white md:pl-0">
                    No Lease Domain NFT
                  </p>
                </div>
              </>
            )}
          </div>
        </TabPanel>
      </ParamTab>
    </Suspense>
  );
}
