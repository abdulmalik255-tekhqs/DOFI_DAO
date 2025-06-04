import React, { useEffect, useState, Suspense } from 'react';
import cn from '@/utils/cn';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import CollectionCard from '@/components/ui/collection-card';
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
    setLeasedDomainNFTs(leasingData);
  }, [data]);

  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              'flex flex-col gap-[12px] sm:flex-row sm:flex-wrap',
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
                    No Domain NFT Found
                  </p>
                </div>
              </>
            )}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <>
            {toogle && (
              <>
                <FractionAmount />
              </>
            )}
            <div
              className={cn(
                'flex flex-col gap-[12px] sm:flex-row sm:flex-wrap',
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
                      No Fraction NFT Found
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
              'flex flex-col gap-[12px] sm:flex-row sm:flex-wrap',
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
                    No Lease Domain NFT Found
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
