import { useState } from 'react';
import Button from '@/components/ui/button';

interface ProposalProps {
  data: any;
}
export default function ProposalAccpet({ data }: ProposalProps) {
  console.log(data);

  const [priceFraction, setPricefraction] = useState('');
  return (
    <div className="w-[700px] rounded-2xl border border-gray-200 bg-white px-5 pb-7 pt-5 dark:border-gray-700 dark:bg-light-dark sm:px-7 sm:pb-8 sm:pt-6">
      <h1 className="mb-6 flex shrink-0 items-center justify-center text-center text-xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white">
        Accept Proposal
      </h1>

      <label className="relative mb-8 hidden w-full flex-col items-start md:flex">
        <input
          value={priceFraction || ''}
          onChange={(e) => setPricefraction(e.target.value)}
          className="w-full appearance-none rounded-lg bg-gray-100 py-1 text-sm font-medium tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 dark:border-gray-600 dark:bg-[#1E293B] dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500 rtl:pr-10"
          placeholder="proposal"
        />
      </label>
      <Button
        size="large"
        shape="rounded"
        fullWidth={true}
        className="uppercase xs:tracking-widest"
      >
        Accept
      </Button>
    </div>
  );
}
