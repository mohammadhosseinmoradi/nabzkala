import { useEffect } from "react";
import { useLatest } from "./use-latest";

export function useDocumentEvent<TType extends keyof DocumentEventMap>(
  type: TType,
  listener: (ev: DocumentEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions,
) {
  let listenerRef = useLatest(listener);

  useEffect(() => {
    function handler(event: DocumentEventMap[TType]) {
      listenerRef.current(event);
    }

    document.addEventListener(type, handler, options);
    return () => document.removeEventListener(type, handler, options);
  }, [type, options]);
}
