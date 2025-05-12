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
import { FaRegClock } from "react-icons/fa6";
import ProfitIcon from '@/assets/images/dao/profit.png';
import ClockIcon from '@/assets/images/dao/clock.png';
import GraphIcon from '@/assets/images/dao/graph.png';


const AUCTION_DURATION = 30 * 60 * 1000; // 30 mins in milliseconds
const AUCTION_TIMER_KEY = 'auctionExpiryTime';


function AuctionCountdown(address: string | any) {
  const [expiryTime, setExpiryTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!address) {
      // Reset timer to 00 if no address
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const now = Date.now();
    let expiry = null;

    const stored = localStorage.getItem(AUCTION_TIMER_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > now) {
        expiry = parsed;
      }
    }

    if (!expiry) {
      expiry = now + AUCTION_DURATION;
      localStorage.setItem(AUCTION_TIMER_KEY, expiry.toString());
    }

    setExpiryTime(expiry);
    setTimeLeft(getTimeLeft(expiry));
  }, [address]);

  useEffect(() => {
    if (!expiryTime || !address) return;

    const interval = setInterval(() => {
      const diff = expiryTime - Date.now();

      if (diff <= 0) {
        const newExpiry = Date.now() + AUCTION_DURATION;
        localStorage.setItem(AUCTION_TIMER_KEY, newExpiry.toString());
        setExpiryTime(newExpiry);
        setTimeLeft(getTimeLeft(newExpiry));
      } else {
        setTimeLeft(getTimeLeft(expiryTime));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime, address]);

  function getTimeLeft(endTime: number) {
    const diff = endTime - Date.now();
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  return (
    <div className="flex items-center space-x-6 text-lg font-semibold px-6">
      <div className="flex flex-col text-[#1E293B]">
        <span className="text-[24px] font-[500]">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-[12px] text-[#1E293B] font-[400]">Hours</span>
      </div>
      <div className="flex flex-col text-[#1E293B]">
        <span className="text-[24px] font-[500]">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-[12px] text-[#1E293B] font-[400]">Minutes</span>
      </div>
      <div className="flex flex-col text-[#1E293B]">
        <span className="text-[24px] font-[500]">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-[12px] text-[#1E293B] font-[400]">Seconds</span>
      </div>
    </div>
  );
}






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

  console.log("leaseAddressInfo--->", leaseAddressInfo?.leasingAddress)
  return (
    <section className="mx-auto w-full max-w-[1160px] text-sm">
      <div className='flex justify-between border-[#E2E8F0] border bg-white px-4 mb-4 items-center rounded-[10px] h-[81px]'>
        <h2 className="text-[#1E293B] font-[700] uppercase xl:text-[24px] flex gap-2">
          {storedNft?.name}
          <span className='text-[20px] font-[400] text-[#1E293B] '>(Domain Dao)</span>
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
            } col-span-12 md:col-span-6 lg:col-span-3 h-[170px] sm:h-[158px] rounded-[10px] border-[#E2E8F0] border  p-[30px] space-y-[25px] bg-white`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/80 p-[5px] rounded-full flex items-center justify-center">
             <Image src={ClockIcon} alt="no-icon" />
            </div>
            <div className="text-[16px] font-[400] text-[#1E293B]">
              Profit Distribution In
            </div>
          </div>

          <div className="">
            <AuctionCountdown address={leaseAddressInfo?.leasingAddress}/>
          </div>
        </div>
        <div
          className={`${proposalsDomainDao?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#E2E8F0] border h-[170px] sm:h-[158px] rounded-[10px] p-[30px] space-y-[25px] bg-white`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Image src={ProfitIcon} alt="no-icon" />
            </div>
            <div className="text-[16px] font-[400] text-[#1E293B] tour_Hours_tracking">
              Proposals
            </div>
          </div>

          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}
            <div className="text-center">
              <div className="text-xl font-[500] text-[#151515]">{proposalsDomainDao?.count || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Total</div>
            </div>

            {/* Active */}
            <div className="text-center">
              <div className="text-xl font-[500] text-[#151515]">{proposalsDomainDao?.active || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Active</div>
            </div>

            {/* Sucessfull */}
            <div className="text-center">
              <div className="text-xl font-[500] text-[#151515]">{proposalsDomainDao?.successful || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Sucessfull</div>
            </div>

            {/* Rejected */}
            <div className="text-center">
              <div className="text-xl font-[500] text-[#151515]">{proposalsDomainDao?.rejected || "00"}</div>
              <div className="text-[12px] text-grey font-[400]">Rejected</div>
            </div>
          </div>
        </div>
        {<div
          className={`${proposalsDomainDao?.length > 0
            ? 'col-span-12 md:col-span-6 lg:col-span-3'
            : 'col-span-12 md:col-span-6 lg:col-span-4'
            } col-span-12 md:col-span-6 lg:col-span-3 border-[#E2E8F0] border h-[170px] sm:h-[158px] rounded-[10px] p-[30px] space-y-[25px] bg-white min-w-[400px]`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <Image src={GraphIcon} alt="no-icon" />
            </div>
            <div className="text-[16px] font-[400] text-[#1E293B] tour_Hours_tracking">
              Profit
            </div>
          </div>
          <div className="flex sm:justify-start justify-center sm:ml-[10px] sm:space-x-[30px] space-x-[15px] flex-wrap">
            {/* Total */}

            <div className="text-center text-xl font-[500] text-[#151515]">
              {
                leaseAddressInfo?.leasingAddress && leaseAddressInfo?.leasingAddress != "0x"
                  ? <div className="">
                    {leaseAddressInfo.leasingAddress.slice(0, 5)}...
                    {leaseAddressInfo.leasingAddress.slice(-5)}
                  </div>
                  : leaseAddressInfo?.payments?.length > 0 && leaseAddressInfo?.payments?.[0]?.wallet
                    ? <div className="">
                      {leaseAddressInfo.payments[0].wallet.slice(0, 5)}...
                      {leaseAddressInfo.payments[0].wallet.slice(-5)}
                    </div>
                    : "0x"
              }
              <div className="text-[12px] text-grey font-[400]">Current Leasing Address</div>
            </div>

            {/* Active */}
            <div className="text-center mt-1">
              <div className="text-xl font-[500] text-[#151515]">{leaseAddressInfo?.payments?.[0]?.totalAmount || "00"}</div>
              <div className="text-[12px] text-grey font-[400]"> Total Profit</div>
            </div>

          </div>
        </div>}
      </div>
       <div className='pt-[32px] pb-[24px] flex'>
        <h2 className='text-[#1E293B] text-[24px] font-bold'>Proposals</h2>
      </div>
      <Suspense fallback={<Loader variant="blink" />}>
        <VoteListDomainDao voteStatus={'active'} />
      </Suspense>
    </section>
  );
};

export default DomainDAOPage;
