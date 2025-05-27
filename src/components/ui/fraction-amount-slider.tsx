'use client';

import { ArrowUp } from '@/components/icons/arrow-up';
import { useRouter } from 'next/navigation';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
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

export function FractionAmountFeed({ imageUrl, index }: any) {
    return (
        <div className={cn('w-[94px] h-[124px] flex items-center justify-center')}>
            <img
                src={imageUrl}
                alt={`preview-${index}`}
            />
        </div>
    );
}
export default function FractionAmountSlider({ limits, item }: any) {
    console.log(item?.amount, typeof "items");

    const limit = limits ?? 10; // Show more cards per view to match design

    const sliderBreakPoints = {
        480: { slidesPerView: 2, spaceBetween: 12 },
        768: { slidesPerView: 4, spaceBetween: 16 },
        1024: { slidesPerView: 6, spaceBetween: 20 },
        1280: { slidesPerView: 8, spaceBetween: 20 },
        1600: { slidesPerView: limit, spaceBetween: 20 },
    };

    return (
        <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={limit}
            breakpoints={sliderBreakPoints}
            navigation={true}
            observer={true}
            dir="ltr"
            className="w-full pb-6"
        >
            {Array.from({ length: item?.amount || 0 }).map((_, index) => (
                <SwiperSlide key={index}>
                    <FractionAmountFeed imageUrl={item?.imageUrl} index={index} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}