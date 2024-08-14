"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// Define a utility type for type-safe URLSearchParams
export type TypeSafeSearchParams<T> = Omit<
  typeof URLSearchParams,
  "set" | "append" | "delete" | "has" | "keys" | "get" | "getAll"
> & {
  set: (name: keyof T, value: string) => void;
  append: (name: keyof T, value: string) => void;
  delete: (name: keyof T, value?: string) => void;
  has: (name: keyof T, value?: string) => boolean;
  keys: IterableIterator<keyof T>;
  get: (name: keyof T) => string | null;
  getAll: (name: keyof T) => string[];
};

// Define the props for the useHandleSearchParams hook
type Props<T> = {
  onChangeMiddleware?: (draftSearchParams: TypeSafeSearchParams<T>) => void;
};

/**
 * A custom React hook for handling and managing URL search parameters in a type-safe manner.
 *
 * @param config - Configuration options for the hook, including onChangeMiddleware for custom parameter handling.
 * @returns An object containing the current search parameters and a handleChange function for modifying them.
 *
 * Example of use:
 *
 *   const {searchParams, setSearchParams} = useHandleSearchParams<{
 *       color: "blue" | "red";
 *       page: number;
 *   }>();
 *
 *
 *   onPageChange(page => {
 *     setSearchParams(draftSearchParams => {
 *        draftSearchParams.set("page", page);
 *     });
 *   })
 *
 */
export default function useHandleSearchParams<T>(config?: Props<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() as any as TypeSafeSearchParams<T>;

  // Define a function for handling changes to search parameters
  const setSearchParams = useCallback(
    (value: (draftSearchParams: TypeSafeSearchParams<T>) => void) => {
      // Create a new URLSearchParams object with type safety
      const urlSearchParams = new URLSearchParams(searchParams.toString());

      value(urlSearchParams as any);

      // If there is an 'onChangeMiddleware' function in 'config', apply it to 'urlSearchParams'
      config?.onChangeMiddleware &&
        config?.onChangeMiddleware(urlSearchParams as any);

      // Convert back 'urlSearchParams' to a query string
      const queryString = urlSearchParams.toString();

      // Push the updated URL with the new query string
      router.replace(pathname + (queryString ? `?${queryString}` : ""), {
        scroll: false,
      });
    },
    [searchParams],
  );

  return { searchParams, setSearchParams };
}
