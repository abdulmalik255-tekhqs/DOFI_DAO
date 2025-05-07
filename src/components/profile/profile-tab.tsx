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

const tabMenu = [
  {
    title: 'Domain NFTS',
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

export default function ProfileTab({ data }: any) {
  const { layout } = useLayout();
  const [domain, setDomain] = useState([]);
  const [fraction, setFraction] = useState([]);

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
  }, [data]);

  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              'grid gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
              layout === LAYOUT_OPTIONS.RETRO
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1',
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
          {/* <div className="space-y-8 md:space-y-10 xl:space-y-12"> */}
          <div
            className={cn(
              'grid gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
              layout === LAYOUT_OPTIONS.RETRO
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1',
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
          {/* <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
                Protocols
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {authorProtocols?.map((protocol) => (
                  <ListCard
                    item={protocol}
                    key={`protocol-key-${protocol?.id}`}
                    variant="large"
                  />
                ))}
              </div>
            </div>
            <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
                Networks
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                {authorNetworks?.map((network) => (
                  <ListCard
                    item={network}
                    key={`network-key-${network?.id}`}
                    variant="medium"
                  />
                ))}
              </div>
            </div> */}
          {/* </div> */}
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              'grid gap-4 xs:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4',
              layout === LAYOUT_OPTIONS.RETRO
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1',
            )}
          >
            {fraction?.length > 0 ? (
              fraction?.map((fraction: any, index: number) => (
                <LeaseDomainCard
                  item={fraction}
                  key={`fraction-key-${fraction?._id}`}
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
