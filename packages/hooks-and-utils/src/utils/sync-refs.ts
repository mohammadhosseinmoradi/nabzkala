import { LegacyRef, MutableRefObject, RefCallback } from "react";

export function syncRefs<T = any>(
  ...refs: (MutableRefObject<T> | LegacyRef<T> | undefined | null)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
