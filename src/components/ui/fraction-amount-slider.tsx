'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css/navigation';
import cn from '@/utils/cn';

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
            loop={false} // ← prevents infinite scrolling
            allowTouchMove={true} // ← allows dragging
            className="w-full flex justify-start items-start max-w-[700px] md:max-w-[1200px] xl:max-w-[800px] 2xl:max-w-[1130px] 3xl:max-w-[1400px]"
        >
            {Array.from({ length: item?.amount || 0 }).map((_, index) => (
                <SwiperSlide key={index}>
                    <FractionAmountFeed imageUrl={item?.imageUrl} index={index} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}