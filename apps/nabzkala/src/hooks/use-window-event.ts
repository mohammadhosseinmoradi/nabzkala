import { useEffect } from "react";
import { useLatest } from "./use-latest";

export function useWindowEvent<TType extends keyof WindowEventMap>(
  type: TType,
  listener: (ev: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  let listenerRef = useLatest(listener);

  useEffect(() => {
    function handler(event: WindowEventMap[TType]) {
      listenerRef.current(event);
    }

    window.addEventListener(type, handler, options);
    return () => window.removeEventListener(type, handler, options);
  }, [type, options]);
}
