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



import Shib1 from '@/assets/images/dao/shib1.png';
import Shib2 from '@/assets/images/dao/shib2.png';
import Shib3 from '@/assets/images/dao/shib3.png';
import Shib4 from '@/assets/images/dao/shib4.png';
import Shib5 from '@/assets/images/dao/shib5.png';
import Shib6 from '@/assets/images/dao/shib6.png';
import Shib7 from '@/assets/images/dao/shib7.png';
import Shib8 from '@/assets/images/dao/shib8.png';

export function DomainFeed({ image }: any) {
  return (
    <div>
      <div className="w-full flex-col">
        <Image src={image} alt="no-icon" className='w-[90%]'/>
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
  const ShibimageList = [
    { id: 1, image: Shib1 },
    { id: 2, image: Shib2 },
    { id: 3, image: Shib3 },
    { id: 4, image: Shib4 },
    { id: 5, image: Shib5 },
    { id: 6, image: Shib6 },
    { id: 7, image: Shib7 },
    { id: 8, image: Shib8 },
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
      className="w-full pb-10 mt-6"
    >
      {ShibimageList?.map((item: any) => (
        <SwiperSlide key={item?.id}>
          <DomainFeed image={item?.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
