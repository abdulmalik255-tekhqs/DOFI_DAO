'use client';

import { Suspense } from 'react';
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
import { useGetProposal } from '@/hooks/livePricing';

const ProposalsPage = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  const { proposals, isLoading }: any = useGetProposal();
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 800);
  }
  const tabMenuItems = [
    {
      title: (
        <>
          All Proposals{' '}
          {proposals?.count > 0 && (
            <span className="ltr:ml-0.5 ltr:md:ml-1.5 ltr:lg:ml-2 rtl:mr-0.5 rtl:md:mr-1.5 rtl:lg:mr-2">
              ({proposals?.count})
            </span>
          )}
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
  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <div className='flex justify-between bg-white px-4 mb-4 items-center shadow-lg rounded-md py-2'>
        <h2 className="mb-2 text-base font-bold uppercase dark:text-gray-100 xl:text-[28px]">
          DOFI DAO
        </h2>
        <div className="shrink-0">
          <Button
            shape="rounded"
            fullWidth={true}
            className="uppercase"
            onClick={() => goToCreateProposalPage()}
          >
            Create Proposals
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div
          className={`${proposals?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#14161A] border-b-4 h-[170px] sm:h-[158px] rounded-[10px] shadow-xl p-[30px] space-y-[25px] bg-white`}
        >
          <div className="flex gap-[20px] items-center">
            <div>
              <Image alt="Vote Pool" src={votePool} width={32} height={32} />

            </div>
            <div className="text-xl font-bold text-[#151515] tour_Hours_tracking">
              Proposals
            </div>
          </div>

          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.count || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Total</div>
            </div>

            {/* Active */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.active || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Active</div>
            </div>

            {/* Sucessfull */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.successful || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Sucessfull</div>
            </div>

            {/* Rejected */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.rejected || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Rejected</div>
            </div>
          </div>
        </div>
        {proposals?.percentageYield || proposals?.leasingAddress &&  <div
          className={`${proposals?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#14161A] border-b-4 h-[170px] sm:h-[158px] rounded-[10px] shadow-lg p-[30px] space-y-[25px] bg-white min-w-[360px]`}
        >
          <div className="flex gap-[20px] items-center">
            <div>
              <Image alt="Vote Pool" src={votePool} width={32} height={32} />

            </div>
            <div className="text-xl font-bold text-[#151515] tour_Hours_tracking">
            Others
            </div>
          </div>

          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}

            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.leasingAddress || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Leasing Address</div>
            </div>

            {/* Active */}
            <div className="text-center">
              <div className="text-xl font-[600] text-[#151515]">{proposals?.percentageYield || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Percentage Yield</div>
            </div>

          </div>
        </div>}
       

      </div>


      <Suspense fallback={<Loader variant="blink" />}>
        <VoteList voteStatus={'active'} />
      </Suspense>
    </section>
  );
};

export default ProposalsPage;
