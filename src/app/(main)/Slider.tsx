'use client';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { formatPublishedDate } from '@/utils/dateSorter';

// import type { Swiper as SwiperClass } from 'swiper';
import { CategorySliderType } from '@/utils/type';
import type { SwiperRef } from 'swiper/react';
interface SliderProps {
  categoryData: CategorySliderType;
}

const Slider = ({ categoryData }: SliderProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.swiper &&
      prevRef.current &&
      nextRef.current
    ) {
      const swiperInstance = swiperRef.current.swiper;

      // Check if navigation is an object
      if (typeof swiperInstance.params.navigation === 'object') {
        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;
      } else {
        // If it's false, initialize it as an object
        swiperInstance.params.navigation = {
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        };
      }

      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, []);

  return (
    <div className="relative w-[250px] md:w-[500px] xl:w-[800px]">
      <Swiper
        ref={swiperRef}
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {categoryData?.blogs?.map((cat, index) => (
          <SwiperSlide
            className="w-[250px] h-auto xl:w-[351.069px] xl:h-[264px] lg:ml-0"
            key={index}
            data-swiper-autoplay={index % 2 === 0 ? 3000 : 5000}
          >
            <Link
              href={cat?.slug ? `/${cat?.slug}` : '#'}
              className="cursor-pointer space-y-4 flex flex-col justify-start items-start"
            >
              <div className="w-[240px] h-[140px] xl:w-[351px] xl:h-[160px] overflow-hidden">
                <Image
                  src={`${cat?.banner?.url}`}
                  alt={cat?.slug}
                  width={1800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-sm text-start w-[240px] xl:w-[351px]">
                {cat?.title?.substring(0, 80) + '...'}
              </h5>
              <p className="text-xs text-primary">
                {formatPublishedDate(cat?.createdAt)}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="absolute top-[40%] -left-12 transform -translate-y-1/2 text-black px-3 py-2 rounded-full z-10"
      >
        <IoIosArrowBack size={40} />
      </button>

      <button
        ref={nextRef}
        className="absolute top-[40%] -right-12 xl:-right-3 transform -translate-y-1/2 text-black px-3 py-2 rounded-full z-10"
      >
        <IoIosArrowForward size={40} />
      </button>
    </div>
  );
};

export default Slider;
