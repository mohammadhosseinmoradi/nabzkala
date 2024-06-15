import {
  TabPanels as HeadlessTabPanels,
  TabPanelsProps,
} from "@headlessui/react";
import { forwardRef, ReactNode } from "react";
import { useTabContext } from "./context";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrevious } from "@/hooks/use-previous";

const Panels = forwardRef<HTMLDivElement, TabPanelsProps<"div">>(
  (props, ref) => {
    const { className, children, ...otherProps } = props;
    const { selectedIndex, onChange } = useTabContext();
    const prevSelectedIndex = usePrevious(selectedIndex);

    return (
      <HeadlessTabPanels
        as="div"
        ref={ref}
        className={cn("overflow-hidden", className)}
        {...otherProps}
      >
        {(bag) => {
          const direction = selectedIndex > (prevSelectedIndex || 0);
          return (
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                className="size-full"
                transition={{
                  ease: "easeInOut",
                  duration: 0.2,
                }}
              >
                {(() => {
                  let resolvedChildren =
                    typeof children === "function" ? children(bag) : children;

                  const resolvedChildrenArray = (
                    Array.isArray(resolvedChildren)
                      ? resolvedChildren
                      : [resolvedChildren]
                  ) as ReactNode[];

                  if (selectedIndex >= resolvedChildrenArray.length)
                    return null;
                  return resolvedChildrenArray[selectedIndex];
                })()}
              </motion.div>
            </AnimatePresence>
          );
        }}
      </HeadlessTabPanels>
    );
  },
);

Panels.displayName = HeadlessTabPanels.displayName;

export { Panels };

const variants = {
  enter: (direction: boolean) => {
    return {
      x: direction ? "-50%" : "50%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: boolean) => {
    return {
      x: direction ? "50%" : "-50%",
      opacity: 0,
    };
  },
};
