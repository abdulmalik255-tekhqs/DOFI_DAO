import { motion } from 'framer-motion';

interface VotePollTypes {
  title: string;
  vote?: any
}

export default function VotePoll({ title, vote }: VotePollTypes) {
  return (
    <motion.div layout className="mb-2">
      <h4 className="mb-2 uppercase text-black text-[20px] font-[500]">{title}</h4>
      <div className="rounded-full">
        <svg width="100%" height="6">
          <rect x="0" y="0" width="100%" height="8" fill="#FA606A" />
          <rect
            x="0"
            y="0"
            height="8"
            fill="#28D294"
            width={`${vote?.acceptedVotesPercentage}%`}
          />
        </svg>
      </div>
      <div className="flex items-start justify-between">
        <div className="text-green-500 ltr:text-left rtl:text-right">
          <h5 className=" font-[500] text-[14px] text-[#22C55E]">
            Accepted
          </h5>
          <p className="  font-[500] text-[8px] text-[#22C55E]">
            {vote?.acceptedVotes} ({vote?.acceptedVotesPercentage}%)
          </p>
        </div>
        <div className="text-red-500 ltr:text-right rtl:text-left">
          <h5 className="  font-[500] text-[14px] text-[#EF4444]">
            Rejected
          </h5>
          <p className="  font-[500] text-[8px] text-[#EF4444]">
            {vote?.rejectedVotes} ({vote?.rejectedVotesPercentage}%)
          </p>
        </div>
      </div>
    </motion.div>
  );
}
