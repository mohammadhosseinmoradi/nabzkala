import { Tab as HeadlessTab, TabProps } from "@headlessui/react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useTabContext } from "@/components/tab/context";

const Tab = forwardRef<HTMLDivElement, TabProps<"button">>((props, ref) => {
  const { className, children, ...otherProps } = props;
  const { id } = useTabContext();

  return (
    <HeadlessTab
      as={SwiperSlide}
      // @ts-ignore
      tag="button"
      ref={ref}
      className={cn(
        "relative w-auto",
        "flex items-center justify-center gap-2",
        "py-2 px-4 text-sm",
        "text-neutral-500 data-[selected]:text-blue-500",
        className,
      )}
      {...otherProps}
    >
      {(bag) => {
        return (
          <>
            {typeof children === "function" ? children(bag) : children}
            {bag.selected && (
              <motion.div
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-xl bg-blue-500"
                layoutId={id}
                transition={{
                  ease: "easeInOut",
                  duration: 0.2,
                }}
              />
            )}
          </>
        );
      }}
    </HeadlessTab>
  );
});

Tab.displayName = SwiperSlide.displayName;

export { Tab };
