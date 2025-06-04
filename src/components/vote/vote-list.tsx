import { motion, LayoutGroup } from 'framer-motion';
import VoteDetailsCard from '@/components/vote/vote-details/vote-details-card';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import { useGetProposal } from '@/hooks/livePricing';
import { MoonLoader } from 'react-spinners';

export default function VoteList({ voteStatus }: { voteStatus: string }) {
  const { votes, totalVote } = getVotesByStatus(voteStatus);
  const { proposals, isLoading }: any = useGetProposal();
  return (
    <LayoutGroup>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <MoonLoader />
        </div>
      ) : (
        <motion.div
          layout
          initial={{ borderRadius: 16 }}
          className="rounded-2xl"
        >
          {proposals?.count > 0 ? (
            proposals?.data?.map((proposal: any) => (
              <VoteDetailsCard
                key={`${proposal.name}-key-${proposal._id}`}
                vote={proposal}
                data={proposals}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-16 text-center xs:px-6 md:px-5 md:py-24">
              <div className="mb-6 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white shadow-card md:h-24 md:w-24">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-auto w-8 md:w-10"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    d="M1,13 L6,2 L18,2 L23,13 L23,22 L1,22 L1,13 Z M1,13 L8,13 L8,16 L16,16 L16,13 L23,13"
                  />
                </svg>
              </div>
              <h2 className="mb-3 text-base font-medium leading-relaxed dark:text-gray-100 md:text-lg xl:text-xl">
                There are no proposals at the moment
              </h2>
            </div>
          )}
        </motion.div>
      )}
    </LayoutGroup>
  );
}
