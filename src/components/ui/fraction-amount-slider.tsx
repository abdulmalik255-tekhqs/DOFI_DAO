'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';

export function FractionAmountFeed({ imageUrl, index }: any) {
  return (
    <div className={cn('flex h-[124px] w-[94px] items-start justify-start')}>
      <img src={imageUrl} alt={`preview-${index}`} />
    </div>
  );
}
export default function FractionAmountSlider({ limits, item }: any) {
  const limit = limits ?? 10;
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<any>(null);
  const sliderBreakPoints = {
    480: { slidesPerView: 3, spaceBetween: 12 },
    768: { slidesPerView: 6, spaceBetween: 16 },
    1024: { slidesPerView: 6, spaceBetween: 20 },
    1280: { slidesPerView: 11, spaceBetween: 12 },
    1600: { slidesPerView: limit, spaceBetween: 12 },
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const onSlideChange = () => {
    if (!swiperRef.current) return;
    setIsBeginning(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  };
  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.slideTo(0); // reset to the first slide
    setIsBeginning(true);
    setIsEnd(false);
  }, [item]);
  return (
    <div className="relative flex w-full max-w-[400px] items-start justify-start sm:max-w-[400px] md:max-w-[600px] xl:max-w-[900px] 2xl:max-w-[1050px] 3xl:max-w-[1400px]">
      {/* Custom Navigation Buttons */}
      {/* Prev Button */}
      <button
        ref={prevRef}
        className={cn(
          'absolute right-14 top-0 z-10 -translate-y-[90%] transition-opacity duration-300',
          isBeginning ? 'pointer-events-none opacity-20' : 'opacity-100',
        )}
      >
        ◀
      </button>

      {/* Next Button */}
      <button
        ref={nextRef}
        className={cn(
          'absolute right-0 top-0 z-10 -translate-y-[90%] transition-opacity duration-300',
          isEnd ? 'pointer-events-none opacity-20' : 'opacity-100',
        )}
      >
        ▶
      </button>
      {/* <button
        ref={prevRef}
        className="absolute right-5 z-10 -translate-y-[90%]"
      >
        ◀
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-0 z-10 -translate-y-[90%]"
      >
        ▶
      </button> */}

      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={1}
        slidesPerView={limit}
        breakpoints={sliderBreakPoints}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          //@ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          //@ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={onSlideChange}
        onAfterInit={onSlideChange}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={false}
        allowTouchMove={true}
        className="flex items-start justify-start gap-[12px]"
      >
        {Array.from({ length: item?.amount || 0 }).map((_, index) => (
          <SwiperSlide key={index}>
            <FractionAmountFeed imageUrl={item?.imageUrl} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
