import { useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { cn } from "@/lib/utils";

export type RangeSliderProps = {
  slidesPerView: number;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export function RangeSlider({
  options,
  slidesPerView,
  value,
  onChange,
}: RangeSliderProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [initialSlide] = useState(
    options.findIndex((option) => option === value),
  );

  useEffect(() => {
    if (!swiper) return;
    const activeIndex = options.findIndex((option) => option === value);
    swiper.slideToLoop(activeIndex);
  }, [value, options, swiper]);

  return (
    <Swiper
      onSwiper={setSwiper}
      slidesPerView={slidesPerView}
      initialSlide={initialSlide}
      direction="vertical"
      className="relative h-44 w-20 shrink"
      centeredSlides
      onSlideChangeTransitionEnd={(swiper) => {
        const activeIndex = swiper.realIndex;
        const value = options[activeIndex];
        onChange(value);
      }}
      loop
      loopAdditionalSlides={slidesPerView / 2}
      modules={[Mousewheel]}
      mousewheel
    >
      {options.map((option, index) => {
        return (
          <SwiperSlide
            key={index}
            className={cn(
              "size-full",
              "text-neutral-500 [&.swiper-slide-active]:text-neutral-800",
              "text-sm [&.swiper-slide-active]:text-lg [&.swiper-slide-active]:text-blue-600",
            )}
          >
            <div className="flex size-full items-center justify-center transition-all">
              {option}
            </div>
          </SwiperSlide>
        );
      })}
      {/*<div className="absolute bg-gradient-to-b from-white to-transparent top-0 inset-x-0 h-1/3 z-[1] pointer-events-none" />*/}
      {/*<div className="absolute bg-gradient-to-t from-white to-transparent -bottom-0 inset-x-0 h-1/3 z-[1] pointer-events-none" />*/}
    </Swiper>
  );
}
