'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination, Autoplay } from 'swiper/modules';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import Image from 'next/image';

import NFT1 from '@/assets/images/dao/dao1.png';
import NFT2 from '@/assets/images/dao/dao2.png';
import NFT3 from '@/assets/images/dao/dao3.png';
import NFT4 from '@/assets/images/dao/dao4.png';
import NFT5 from '@/assets/images/dao/dao5.png';
import NFT6 from '@/assets/images/dao/06.png';
import NFT7 from '@/assets/images/dao/07.png';
import NFT8 from '@/assets/images/dao/08.png';

export function DomainFeed({ image }: any) {
  return (
    <div>
      <div className="w w-full flex-col">
        <Image src={image} alt="no-icon" />
      </div>
    </div>
  );
}

export default function DomainDaoSlider({ limits }: { limits: number }) {
  const breakpoint = useBreakpoint();

  const limit = limits ?? 8;

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
  const imageList = [
    { id: 1, image: NFT1 },
    { id: 2, image: NFT2 },
    { id: 3, image: NFT3 },
    { id: 4, image: NFT4 },
    { id: 5, image: NFT5 },
    { id: 6, image: NFT6 },
    { id: 7, image: NFT7 },
    { id: 8, image: NFT8 },
  ];
  return (
    <Swiper
      modules={[Autoplay, Pagination, A11y]}
      spaceBetween={24}
      //   slidesPerView={1}
      //   centeredSlides={true}
      breakpoints={sliderBreakPoints}
      pagination={{ clickable: true }}
      observer={true}
      dir="ltr"
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      className="w-full pb-10"
    >
      {imageList.map((item: any) => (
        <SwiperSlide key={item.id}>
          <DomainFeed image={item.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
