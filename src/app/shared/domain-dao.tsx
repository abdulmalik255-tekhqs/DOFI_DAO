'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Loader from '@/components/ui/loader';
import cn from '@/utils/cn';
import VoteListDomainDao from '@/components/vote/domain_dao_vote_list';
import { useFetchNftLeaseAddress, useGetProposalDomainDao } from '@/hooks/livePricing';
import { FaChartLine } from "react-icons/fa";
import { TbHomeStats } from "react-icons/tb";



const DomainDAOPage = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const [storedNft, setStoredNft] = useState<any>(null);
  const { proposalsDomainDao, isLoading }: any = useGetProposalDomainDao();


  const { leaseAddressInfo }: any = useFetchNftLeaseAddress(storedNft?._id);

  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createDomain);
    }, 800);
  }
  const tabMenuItems = [
    {
      title: (
        <>
          All Proposals{' '}
          <span className="ltr:ml-0.5 ltr:md:ml-1.5 ltr:lg:ml-2 rtl:mr-0.5 rtl:md:mr-1.5 rtl:lg:mr-2">
            ({proposalsDomainDao?.count || 0})
          </span>
        </>
      ),
      path: 'active',
    },
    // {
    //   title: (
    //     <>
    //       Off-Chain{' '}
    //       {totalOffChainVote > 0 && (
    //         <span className="ltr:ml-0.5 ltr:md:ml-1.5 ltr:lg:ml-2 rtl:mr-0.5 rtl:md:mr-1.5 rtl:lg:mr-2">
    //           {totalOffChainVote}
    //         </span>
    //       )}
    //     </>
    //   ),
    //   path: 'off-chain',
    // },
    // {
    //   title: (
    //     <>
    //       Executable{' '}
    //       {totalExecutableVote > 0 && (
    //         <span className="ltr:ml-0.5 ltr:md:ml-1.5 ltr:lg:ml-2 rtl:mr-0.5 rtl:md:mr-1.5 rtl:lg:mr-2">
    //           {totalExecutableVote}
    //         </span>
    //       )}
    //     </>
    //   ),
    //   path: 'executable',
    // },
    // {
    //   title: (
    //     <>
    //       Past{' '}
    //       {totalPastVote > 0 && (
    //         <span className="ltr:ml-0.5 ltr:md:ml-1.5 ltr:lg:ml-2 rtl:mr-0.5 rtl:md:mr-1.5 rtl:lg:mr-2">
    //           {totalPastVote}
    //         </span>
    //       )}
    //     </>
    //   ),
    //   path: 'past',
    // },
  ];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedNftString = localStorage.getItem('nft');
      if (storedNftString) {
        try {
          setStoredNft(JSON.parse(storedNftString));
        } catch (err) {
          console.error('Failed to parse storedNft:', err);
        }
      }
    }
  }, []);

  console.log("leaseAddressInfo--->",leaseAddressInfo)
  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <div className='flex justify-between bg-white px-4 mb-4 items-center shadow-lg rounded-md py-5'>
        <h2 className="text-base font-bold uppercase dark:text-gray-100 xl:text-[28px] flex items-center gap-2">
          {storedNft?.name}
          <span className='text-[16px] text-base '>(Domain Dao)</span>
        </h2>
        <div className="shrink-0">
          <Button
            shape="rounded"
            fullWidth={true}
            className="uppercase"
            onClick={() => goToCreateProposalPage()}
          >
            Create Proposal
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div
          className={`${proposalsDomainDao?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#14161A] border-b-4 h-[170px] sm:h-[158px] rounded-[10px] shadow-xl p-[30px] space-y-[25px] bg-white`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 p-2 rounded-full flex items-center justify-center shadow-sm">
              <TbHomeStats className="text-gray-700 text-[18px] text-white" />
            </div>
            <div className="text-xl font-bold text-[#151515] tour_Hours_tracking">
              Proposals
            </div>
          </div>

          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposalsDomainDao?.count || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Total</div>
            </div>

            {/* Active */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposalsDomainDao?.active || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Active</div>
            </div>

            {/* Sucessfull */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposalsDomainDao?.successful || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Sucessfull</div>
            </div>

            {/* Rejected */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposalsDomainDao?.rejected || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Rejected</div>
            </div>
          </div>
        </div>
        {<div
          className={`${proposalsDomainDao?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#14161A] border-b-4 h-[170px] sm:h-[158px] rounded-[10px] shadow-lg p-[30px] space-y-[25px] bg-white min-w-[360px]`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-b from-gray-600 via-gray-600 to-gray-500 p-2 rounded-full flex items-center justify-center shadow-sm">
              <FaChartLine className="text-gray-700 text-[16px] text-white" />
            </div>
            <div className="text-xl font-bold text-[#151515] tour_Hours_tracking">
              Profit
            </div>
          </div>
          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}

            <div className="text-center text-xl font-[600] text-[#151515]">
              {
                leaseAddressInfo?.leasingAddress
                  ? <div className="">
                    {leaseAddressInfo.leasingAddress.slice(0, 5)}...
                    {leaseAddressInfo.leasingAddress.slice(-5)}
                  </div>
                  : leaseAddressInfo?.payments?.[0]?.wallet
                    ? <div className="">
                      {leaseAddressInfo.payments[0].wallet.slice(0, 5)}...
                      {leaseAddressInfo.payments[0].wallet.slice(-5)}
                    </div>
                    : "0x"
              }
              <div className="text-[12px] text-grey font-[400]">Current Leasing Address1</div>
            </div>

            {/* Active */}
            <div className="text-center mt-1">
              <div className="text-xl font-[600] text-[#151515]">{leaseAddressInfo?.payments?.[0]?.totalAmount || "00"}</div>
              <div className="text-[12px] text-grey font-[400]"> Total Profit</div>
            </div>

          </div>
        </div>}


      </div>
      <div></div>
      <Suspense fallback={<Loader variant="blink" />}>
        {/* <ParamTab tabMenu={tabMenuItems}>
          <TabPanel className="focus:outline-none">
            
          </TabPanel>
        </ParamTab> */}
        <VoteListDomainDao voteStatus={'active'} />
      </Suspense>
    </section>
  );
};

export default DomainDAOPage;
