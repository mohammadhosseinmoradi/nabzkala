"use client";

import { ReactNode, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import clsx from "clsx";
import { Button } from "@/components";

export type MainSliderProps = {
  children: ReactNode[];
};

export default function OneViewSlider({ children }: MainSliderProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="relative w-full">
      <Swiper
        className="grid grid-cols-1"
        slidesPerView={1}
        autoHeight
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {children.map((slide, index) => {
          return (
            <SwiperSlide key={index} className="">
              {slide}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Buttons
        className="absolute start-6 bottom-4 z-10 max-lg:hidden lg:start-12 lg:bottom-12"
        disabledPrevButton={isBeginning}
        disabledNextButton={isEnd}
        onSlidePrev={() => {
          swiperRef.current?.slidePrev();
        }}
        onSlideNext={() => {
          swiperRef.current?.slideNext();
        }}
      />
      <Bullets
        className="absolute end-6 bottom-4 z-10 lg:end-1/2 lg:bottom-4 lg:-translate-x-1/2"
        value={activeIndex}
        length={children.length}
        onChange={(index) => {
          swiperRef.current?.slideTo(index);
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
    <div className={clsx("flex gap-2", className)}>
      <Button
        color="secondary"
        disabled={disabledPrevButton}
        className="flex h-8 w-8 items-center justify-center lg:h-10 lg:w-10"
        onClick={() => {
          onSlidePrev();
        }}
      >
        {/*<Icon name="chevron-right" className="text-xs lg:text-xl" />*/}
      </Button>
      <Button
        color="secondary"
        disabled={disabledNextButton}
        className="flex h-8 w-8 items-center justify-center lg:h-10 lg:w-10"
        onClick={() => {
          onSlideNext();
        }}
      >
        {/*<Icon name="chevron-left" className="text-xs lg:text-xl" />*/}
      </Button>
    </div>
  );
}

function Bullets({
  value,
  onChange,
  length,
  className,
}: {
  // Active index
  value: number;
  // Index change event
  onChange: (value: number) => void;
  length: number;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      {new Array(length).fill(undefined).map((_, index) => (
        <button
          key={index}
          className={clsx("h-2 rounded-full bg-white transition-all", {
            "w-4": value === index,
            "bg-opacity-50 w-2": value !== index,
          })}
          onClick={() => {
            onChange(index);
          }}
        />
      ))}
    </div>
  );
}
