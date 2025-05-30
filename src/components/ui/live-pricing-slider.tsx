'use client';

import { ArrowUp } from '@/components/icons/arrow-up';
import { useRouter } from 'next/navigation';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import cn from '@/utils/cn';
import { priceFeedData } from '@/data/static/price-feed';
import { useDao } from '@/hooks/livePricing';
import routes from '@/config/routes';
import RedGraph from '@/assets/images/red-graph.png';
import GreenGraph from '@/assets/images/green-graph.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { idoActions } from '@/store/reducer/ido-reducer';
import { AnyCnameRecord } from 'dns';
type Price = {
  name: number;
  value: number;
};

type LivePriceFeedProps = {
  _id: string;
  name: string;
  symbol: string;
  icon: React.ReactElement;
  balance: string;
  usdBalance: string;
  change: string;
  isChangePositive: boolean;
  isBorder?: boolean;
  prices: Price[];
  noOfProposals?: number;
  index: any,
  nft: any,
  data?:AnyCnameRecord
};

export function LivePricingFeed({
  _id,
  name,
  nft,
  symbol,
  icon,
  balance,
  usdBalance,
  change,
  isChangePositive,
  noOfProposals,
  isBorder,
  index,
  data
}: LivePriceFeedProps) {
  const router = useRouter();
  const dispatch = useDispatch()
  
  function getInitialIcon(name: string) {
    const firstLetter = name?.charAt(0).toUpperCase() || '?';
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-semibold text-black">
        {firstLetter}
      </div>
    );
  }
  function goToCreateProposalPage() {
    if (index > 0) {
      dispatch(idoActions.saveChildDaoData(data))
      localStorage.setItem('nft', JSON.stringify(nft));
      localStorage.setItem("Domain_Dao", _id)
    }
    setTimeout(() => {
      router.push(index === 0 ? routes.proposals : routes.domain);
    }, 800);
  }
  const prices = [
    { name: 1, value: 15187.44 },
    { name: 2, value: 21356.99 },
    { name: 3, value: 34698.98 },
    { name: 4, value: 37587.55 },
    { name: 5, value: 17577.4 },
    { name: 6, value: 26577.4 },
    { name: 7, value: 23577.4 },
    { name: 8, value: 18577.4 },
    { name: 9, value: 28577.4 },
  ];
  return (
    <div
      onClick={() => goToCreateProposalPage()}
      className={cn(
        'm-2 w-[350px] flex border-[#E2E8F0] border cursor-pointer items-center gap-4 rounded-[12px] bg-white p-5 lg:flex-row',
      )}
    >
      <div className="w-full flex-col">
        <div className="mb-3 flex items-center">
          {getInitialIcon(name)}
          {/* {icon} */}
          <h4
            className="text-[16px] font-[400] text-black ltr:ml-1 rtl:mr-1"
            title={name.length > 9 ? name : undefined}
          >
            {name.length > 9 ? `${name.substring(0, 10)}..` : name}
          </h4>
        </div>

        <div className="mb-2 text-[24px] font-[500] tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {noOfProposals}
          <span className="ml-3">Proposals</span>
        </div>

        {/* <div className="flex items-center text-xs font-medium 2xl:text-sm">
          <span
            className="truncate tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
            title={`${usdBalance} USD`}
          >
            {usdBalance} USD
          </span>

          <span
            className={`flex items-center  ${
              isChangePositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span
              className={`ltr:mr-2 rtl:ml-2 ${
                !isChangePositive ? 'rotate-180' : ''
              }`}
            >
              <ArrowUp />
            </span>
            {change}
          </span>
        </div> */}
      </div>


      {/* <Image src={noOfProposals === 0 ? <RedGraph /> : <GreenGraph />}  alt="green-graph" fill height={50} width={50}/> */}

      <div className="h-20 w-full relative">
        {/* Conditionally render the appropriate graph image */}
        <Image
          src={noOfProposals === 0 ? GreenGraph : RedGraph}
          alt={noOfProposals === 0 ? 'No Proposals Graph' : 'Active Proposals Graph'}
          height={80}
          width={200}
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default function LivePricingSlider({ limits }: { limits: number }) {
  const breakpoint = useBreakpoint();

  const limit = limits ?? 4;

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1600: {
      slidesPerView: limit,
      spaceBetween: 24,
    },
  };
  function mergeDAOs(parentDAOs: any, childDAOs: any) {
    return [...(parentDAOs || []), ...(childDAOs || [])];
  }
  const { dao } : any= useDao();
  const mergedDAOs = mergeDAOs(dao?.data?.parentDAOs, dao?.data?.childDAOs);

  return (
    <Swiper
      modules={[Pagination, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={sliderBreakPoints}
      pagination={{ clickable: true }}
      observer={true}
      navigation={false}
      dir="ltr"
      className="w-full pb-6"
    >
      {mergedDAOs.map((item, index) => (
        <SwiperSlide key={item.id}>
          <LivePricingFeed {...item} index={index} data={item}/>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
