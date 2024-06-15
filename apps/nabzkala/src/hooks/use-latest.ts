import { useRef } from "react";
import { useIsomorphicEffect } from "src/hooks/use-isomorphic-effect";

export function useLatest<T>(value: T) {
  let cache = useRef(value);

  useIsomorphicEffect(() => {
    cache.current = value;
  }, [value]);

  return cache;
}
