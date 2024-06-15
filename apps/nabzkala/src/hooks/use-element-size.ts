import { MutableRefObject, useState } from "react";
import { useIsomorphicEffect } from "./use-isomorphic-effect";

function computeSize(element: HTMLElement | null) {
  if (element === null) return { width: 0, height: 0 };
  let { width, height } = element.getBoundingClientRect();
  return { width, height };
}

export function useElementSize(
  ref: MutableRefObject<HTMLElement | null>,
  unit = false,
) {
  let [size, setSize] = useState(() => computeSize(ref.current));

  useIsomorphicEffect(() => {
    let element = ref.current;
    if (!element) return;

    let observer = new ResizeObserver(() => {
      setSize(computeSize(element));
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  if (unit) {
    return {
      width: `${size.width}px`,
      height: `${size.height}px`,
    };
  }

  return size;
}
