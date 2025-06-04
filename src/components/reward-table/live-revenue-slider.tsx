'use client';

import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import cn from '@/utils/cn';
import { useRevenueRecord } from '@/hooks/livePricing';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type LivePriceFeedProps = {
  name: string;
  nft: any;
  revenue?: any;
};

const DonutChart = ({ price, revenue }: any) => {
  const series = [parseFloat(price) || 0, parseFloat(revenue) || 0];
  const options: any = {
    chart: {
      type: 'donut',
      sparkline: { enabled: true },
    },
    labels: ['Price', 'Revenue'],
    colors: ['#1E2A38', '#D4F373'],
    stroke: {
      show: true,
      width: 4,
      colors: ['#ffffff'],
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: any) => `$${val}`,
      },
    },
  };
  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width={80}
      height={80}
    />
  );
};
export function LivePricingFeed({ name, nft, revenue }: LivePriceFeedProps) {
  function getInitialIcon(name: string) {
    const firstLetter = name?.charAt(0).toUpperCase() || '?';
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E2E8F0] text-sm font-semibold text-black">
        {firstLetter}
      </div>
    );
  }
  return (
    <div
      className={cn(
        'flex w-[352px] cursor-pointer items-center justify-between gap-1 rounded-[12px] border border-[#CBD5E1] bg-white p-[20px] lg:flex-row',
      )}
    >
      <div className="w-full flex-col">
        <div className="mb-3 flex items-center">
          {getInitialIcon(name)}
          <h4
            className="text-[16px] font-[400] text-black ltr:ml-1 rtl:mr-1"
            title={name?.length > 9 ? name : undefined}
          >
            {name?.length > 9 ? `${name?.substring(0, 10)}..` : name}
          </h4>
        </div>
        <div className="mb-2 text-[24px] font-[500] tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {revenue}
          <span className="ml-3">Revenue</span>
        </div>
      </div>
      <div className="relative h-20 w-full">
        <div className="relative flex h-20 w-full items-center justify-end">
          <DonutChart price={nft?.price} revenue={revenue} />
        </div>
      </div>
    </div>
  );
}

export default function LiveRevenueSlider({ limits }: { limits: number }) {
  const { revenue }: any = useRevenueRecord();
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
      className="mt-4 w-full"
    >
      {revenue?.data?.map((item: any, index: any) => (
        <SwiperSlide key={item?.id}>
          <LivePricingFeed {...item} index={index} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
