import { useMotionValueEvent, useScroll } from "framer-motion";
import { ReactNode, RefObject, useMemo, useRef, useState } from "react";

export type ScrollAreaRenderPropArg = {
  isScrolled: boolean;
  isBeginning: boolean;
  isEnd: boolean;
  setNodeRef: RefObject<any> | ((node?: Element | null) => void);
};

export type ScrollAreaProps = {
  /**
   * Number between 0 and 1 indicating the percentage that determine whether the scroll position is considered at the beginning or end
   */
  threshold?: number;
  children: (bag: ScrollAreaRenderPropArg) => ReactNode;
};

export function ScrollArea({ children, threshold = 0 }: ScrollAreaProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });
  const [isScrolled, setIsScrolled] = useState(() => {
    return scrollYProgress.get() > 0;
  });
  const [isBeginning, setIsBeginning] = useState(() => {
    return scrollYProgress.get() <= threshold;
  });
  const [isEnd, setIsEnd] = useState(() => {
    return scrollYProgress.get() >= 1 - threshold;
  });

  useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
    setIsBeginning(latestValue <= threshold);
    setIsEnd(latestValue >= 1 - threshold);
    const isScrollable =
      ref?.current?.scrollHeight! > ref?.current?.clientHeight!;
    setIsScrolled(latestValue > 0 && isScrollable);
  });

  const slot = useMemo(() => {
    return {
      isScrolled,
      isBeginning,
      isEnd,
      setNodeRef: ref,
    } satisfies ScrollAreaRenderPropArg;
  }, [isScrolled, isBeginning, isEnd, ref]);

  return children(slot);
}
