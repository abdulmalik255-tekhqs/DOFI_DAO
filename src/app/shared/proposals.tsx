'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import VoteList from '@/components/vote/vote-list';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import ProfitIcon from '@/assets/images/dao/profit.png';
import votePool from '@/assets/images/vote-pool.svg';
import Loader from '@/components/ui/loader';
import { useGetProposal } from '@/hooks/livePricing';

const ProposalsPage = () => {
  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  const { proposals }: any = useGetProposal();
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 800);
  }

  return (
    <section className="mx-auto w-full max-w-[1920px] text-sm">
      <div className="mb-4 mt-4 flex h-[81px] items-center justify-between rounded-[10px] border border-[#E2E8F0] bg-white px-4">
        <h2 className="font-[700] uppercase text-[#1E293B] xl:text-[24px]">
          DOFI DAO
        </h2>
        <div className="shrink-0">
          <Button
            shape="rounded"
            fullWidth={true}
            onClick={() => goToCreateProposalPage()}
          >
            Create Proposal
          </Button>
        </div>
      </div>
      <div className="mb-4 flex flex-wrap gap-4">
        <div
          className={`${
            proposals?.length > 0
              ? 'col-span-12 md:col-span-6 lg:col-span-3'
              : 'col-span-12 md:col-span-6 lg:col-span-4'
          } col-span-12 h-[170px] space-y-[25px] rounded-[12px] border border-[#E2E8F0] bg-white p-[30px] sm:h-[158px] md:col-span-6 lg:col-span-3`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Image src={ProfitIcon} alt="no-icon" />
            </div>
            <div className="text-[16px] font-[400] text-[#1E293B]">
              Proposals
            </div>
          </div>

          <div className="flex flex-wrap justify-center space-x-[15px] sm:ml-[10px] sm:justify-start sm:space-x-[30px]">
            {/* Total */}
            <div className="text-center">
              <div className="text-[16px] font-[500] text-[#1E293B] md:text-[24px]">
                {proposals?.count || '00'}
              </div>
              <div className="text-[12px] font-[400] text-[#334155] md:text-[14px]">
                Total
              </div>
            </div>

            {/* Active */}
            <div className="text-center">
              <div className="text-[16px] font-[500] text-[#1E293B] md:text-[24px]">
                {proposals?.active || '00'}
              </div>
              <div className="text-[12px] font-[400] text-[#334155] md:text-[14px]">
                Active
              </div>
            </div>

            {/* Sucessfull */}
            <div className="text-center">
              <div className="text-[16px] font-[500] text-[#1E293B] md:text-[24px]">
                {proposals?.successful || '00'}
              </div>
              <div className="text-[12px] font-[400] text-[#334155] md:text-[14px]">
                Sucessfull
              </div>
            </div>

            {/* Rejected */}
            <div className="text-center">
              <div className="text-[16px] font-[500] text-[#1E293B] md:text-[24px]">
                {proposals?.rejected || '00'}
              </div>
              <div className="text-[12px] font-[400] text-[#334155] md:text-[14px]">
                Rejected
              </div>
            </div>
          </div>
        </div>
        {proposals?.percentageYield ||
          (proposals?.leasingAddress && (
            <div
              className={`${
                proposals?.length > 0
                  ? 'col-span-12 md:col-span-6 lg:col-span-3'
                  : 'col-span-12 md:col-span-6 lg:col-span-4'
              } col-span-12 h-[170px] min-w-[360px] space-y-[25px] rounded-[10px] border border-[#E2E8F0] bg-white p-[30px] shadow-lg sm:h-[158px] md:col-span-6 lg:col-span-3`}
            >
              <div className="flex items-center gap-[20px]">
                <div>
                  <Image
                    alt="Vote Pool"
                    src={votePool}
                    width={32}
                    height={32}
                  />
                </div>
                <div className="tour_Hours_tracking text-xl font-bold text-[#151515]">
                  Others
                </div>
              </div>

              <div className="flex flex-wrap justify-center space-x-[15px] sm:ml-[10px] sm:justify-start sm:space-x-[30px]">
                {/* Total */}

                <div className="text-center">
                  <div className="text-xl font-[600] text-[#151515]">
                    {proposals?.leasingAddress || '00'}
                  </div>
                  <div className="text-grey text-[12px] font-[400]">
                    Leasing Address
                  </div>
                </div>

                {/* Active */}
                <div className="text-center">
                  <div className="text-xl font-[600] text-[#151515]">
                    {proposals?.percentageYield || '00'}
                  </div>
                  <div className="text-grey text-[12px] font-[400]">
                    Percentage Yield
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex pb-[24px] pt-[12px]">
        <h2 className="text-[24px] font-bold text-[#1E293B]">Proposals</h2>
      </div>

      <Suspense fallback={<Loader variant="blink" />}>
        <VoteList voteStatus={'active'} />
      </Suspense>
    </section>
  );
};

export default ProposalsPage;
