import {
  ComponentProps,
  ElementType,
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";

type OurProps = {
  children?: ReactNode;
  disableAnimateWidth?: boolean;
  disableAnimateHeight?: boolean;
};

type AnimateSizeProps<T extends ElementType = "div"> = Omit<
  ComponentProps<T>,
  keyof OurProps
> &
  OurProps;

function AnimateSize<T extends ElementType = "div">(
  {
    className,
    children,
    disableAnimateWidth,
    disableAnimateHeight,
    ...otherProps
  }: AnimateSizeProps<T>,
  ref: Ref<HTMLDivElement>,
) {
  const widthContainerRef = useRef<HTMLDivElement | null>(null);
  const heightContainerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | "auto">("auto");
  const [height, setHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (widthContainerRef.current && heightContainerRef.current) {
      const widthObserver = new ResizeObserver((entries) => {
        const observedWidth = entries[0].contentRect.width;
        setWidth(observedWidth);
      });
      const heightObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });
      !disableAnimateWidth && widthObserver.observe(widthContainerRef.current);
      !disableAnimateHeight &&
        heightObserver.observe(heightContainerRef.current);
      return () => {
        // Cleanup the observers when the component is unmounted.
        widthObserver.disconnect();
        heightObserver.disconnect();
      };
    }
  }, [disableAnimateWidth, disableAnimateHeight]);

  return (
    <div
      {...otherProps}
      ref={ref}
      className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${className}`}
      style={{ height, width }}
    >
      <div
        ref={heightContainerRef}
        className={`${!disableAnimateWidth && "flex"}`}
      >
        <div ref={widthContainerRef}>{children}</div>
      </div>
    </div>
  );
}

export default (<T extends typeof AnimateSize>(): T => {
  return forwardRef(AnimateSize as any) as any;
})();
