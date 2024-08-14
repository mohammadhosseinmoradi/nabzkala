import { ReactNode, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

type LoadMoreObserverProps = {
  /**
   * Number of pages
   */
  size: number;
  /**
   * Number of pages change event
   * @param page
   */
  onSizeChange: (page: number) => void;
  /**
   * When number of pages reached to end
   */
  reachEnd: boolean;
  className?: string;
  children?: ReactNode;
};

export function LoadMoreObserver(props: LoadMoreObserverProps) {
  const { size, onSizeChange, reachEnd, className, ...otherProps } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView || reachEnd) return;
    onSizeChange(size + 1);
  }, [inView]);

  return reachEnd ? null : (
    <div ref={ref} className={className} {...otherProps} />
  );
}
