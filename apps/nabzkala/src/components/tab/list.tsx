import { TabList as HeadlessTabList, TabListProps } from "@headlessui/react";
import { Swiper, SwiperClass } from "swiper/react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTabContext } from "./context";

const List = forwardRef<HTMLDivElement, TabListProps<"div">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  const { selectedIndex } = useTabContext();
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (!swiper) return;
    swiper.slideTo(selectedIndex);
  }, [selectedIndex]);

  return (
    <HeadlessTabList
      className={cn("flex justify-start border-b", className)}
      {...otherProps}
    >
      {(bag) => (
        <Swiper
          onSwiper={setSwiper}
          slidesPerView="auto"
          centeredSlides
          centeredSlidesBounds
          loop={false}
          className={cn("m-0 max-w-full")}
        >
          {typeof children === "function" ? children(bag) : children}
        </Swiper>
      )}
    </HeadlessTabList>
  );
});

List.displayName = HeadlessTabList.displayName;

export { List };
