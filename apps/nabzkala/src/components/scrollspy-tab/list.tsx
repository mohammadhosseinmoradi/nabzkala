import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CSSProperties, ReactNode } from "react";
import Tab from "@/components/scrollspy-tab/tab";
import { useTabContext } from "@/components/scrollspy-tab/context";

type ListProps = {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
};

export default function List({
  className,
  children,
  ...otherProps
}: ListProps) {
  const { state } = useTabContext();

  return (
    <div
      {...otherProps}
      className={`sticky flex w-full bg-neutral-800 ${className}`}
    >
      <Swiper
        slidesPerView="auto"
        loop={false}
        className="w-full !overflow-visible"
      >
        {(Array.isArray(children) ? children : [children]).map((tab, index) => {
          return (
            <SwiperSlide key={index} className="!w-auto">
              <Tab
                {...tab.props}
                className={`${index === state.activeIndex ? "bg-red-500" : ""}`}
                index={index}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
