import { useRef } from "react";
import { useIsomorphicEffect } from "src/hooks/use-isomorphic-effect";

export function useIsMounted() {
  let mounted = useRef(false);

  useIsomorphicEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
}
