"use client";

import { ReactNode, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Button } from "@/components";

export type MainSliderProps = {
  children: ReactNode[];
  className?: string;
};

export default function MultiViewSlider({
  children,
  className,
}: MainSliderProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  return (
    <div className={clsx("relative flex w-full", className)}>
      <Swiper
        className="!m-0"
        slidesPerView="auto"
        spaceBetween={8}
        onSwiper={(swiper) => {
          setSwiper(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onResize={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {children.map((slide, index) => {
          return (
            <SwiperSlide key={index} className="!w-auto">
              {slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Buttons
        className="absolute start-6 bottom-4 z-10 lg:start-12 lg:bottom-12"
        disabledPrevButton={isBeginning}
        disabledNextButton={isEnd}
        onSlidePrev={() => {
          swiper?.slidePrev();
        }}
        onSlideNext={() => {
          swiper?.slideNext();
        }}
      />
    </div>
  );
}

function Buttons({
  disabledPrevButton,
  disabledNextButton,
  onSlidePrev,
  onSlideNext,
  className,
}: {
  disabledPrevButton?: boolean;
  disabledNextButton?: boolean;
  onSlidePrev: () => void;
  onSlideNext: () => void;
  className?: string;
}) {
  return (
    <>
      <Button
        color="secondary"
        className={clsx(
          "absolute start-6 top-1/2 z-10 -translate-y-1/2",
          "flex items-center justify-center",
          "max-lg:hidden lg:h-10 lg:w-10",
          {
            hidden: disabledPrevButton,
          },
        )}
        onClick={() => {
          onSlidePrev();
        }}
      >
        {/*<Icon name="chevron-right" className="text-xs lg:text-xl" />*/}
      </Button>
      <Button
        color="secondary"
        className={clsx(
          "absolute end-6 top-1/2 z-10 -translate-y-1/2",
          "flex items-center justify-center",
          "max-lg:hidden lg:h-10 lg:w-10",
          {
            hidden: disabledNextButton,
          },
        )}
        onClick={() => {
          onSlideNext();
        }}
      >
        {/*<Icon name="chevron-left" className="text-xs lg:text-xl" />*/}
      </Button>
    </>
  );
}
