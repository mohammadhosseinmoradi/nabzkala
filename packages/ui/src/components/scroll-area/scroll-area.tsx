import { useMotionValueEvent, useScroll } from "framer-motion";
import { MutableRefObject, ReactNode, useMemo, useRef, useState } from "react";

export type ScrollStateProps = {
  isScrolled: boolean;
  isBeginning: boolean;
  isEnd: boolean;
};

export type ScrollAreaRenderPropArg = ScrollStateProps & {
  setNodeRef: MutableRefObject<any> | ((node: HTMLElement | null) => void);
};

export type ScrollAreaProps = {
  /**
   * A number indicating the range that determine whether the scroll position is considered at the beginning or end
   */
  threshold?: number;
  children: ReactNode | ((bag: ScrollAreaRenderPropArg) => ReactNode);
  onScroll?: (data: ScrollStateProps) => void;
};

export function ScrollArea({
  children,
  threshold = 0,
  onScroll,
}: ScrollAreaProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll({
    container: ref,
  });
  const [isScrolled, setIsScrolled] = useState(() => {
    return scrollY.get() > 0;
  });
  const [isBeginning, setIsBeginning] = useState(() => {
    return scrollY.get() <= threshold;
  });
  const [isEnd, setIsEnd] = useState(() => {
    return scrollY.get() >= (ref?.current?.clientHeight! || 0) - threshold;
  });

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const isBeginning = latestValue <= threshold;
    setIsBeginning(isBeginning);
    const isEnd = latestValue >= ref?.current?.clientHeight! - threshold;
    setIsEnd(isEnd);
    const isScrollable =
      ref?.current?.scrollHeight! > ref?.current?.clientHeight!;
    const isScrolled = ref.current
      ? latestValue > 0 && isScrollable
      : latestValue > 0;
    setIsScrolled(isScrolled);

    onScroll &&
      onScroll({
        isScrolled,
        isBeginning,
        isEnd,
      });
  });

  const slot = useMemo(() => {
    return {
      isScrolled,
      isBeginning,
      isEnd,
      setNodeRef: ref,
    } satisfies ScrollAreaRenderPropArg;
  }, [isScrolled, isBeginning, isEnd, ref]);

  return typeof children === "function" ? children(slot) : children;
}
