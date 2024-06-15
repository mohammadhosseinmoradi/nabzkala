import {
  ReadonlyURLSearchParams,
  useRouter as nextUseRouter,
  useSearchParams,
} from "next/navigation";
import {
  NavigateOptions as NextNavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface NavigateOptions extends NextNavigateOptions {
  /**
   * Keep current searchParams mentioned in keep while navigate.
   */
  keep?: string[] | string;
}

export interface AppRouterInstance {
  (): {
    /**
     * Navigate to the previous history entry.
     */
    back(): void;

    /**
     * Navigate to the next history entry.
     */
    forward(): void;

    /**
     * Refresh the current page.
     */
    refresh(): void;

    /**
     * Navigate to the provided href.
     * Pushes a new history entry.
     */
    push(href: string, options?: NavigateOptions): void;

    /**
     * Navigate to the provided href.
     * Replaces the current history entry.
     */
    replace(href: string, options?: NavigateOptions): void;

    /**
     * Prefetch the provided href.
     */
    prefetch(href: string, options?: PrefetchOptions): void;
  };
}

/**
 * Extend Next.js useRouter hook with additional functionality.
 */
const useRouter: AppRouterInstance = () => {
  const nextRouter = nextUseRouter();
  const searchParams = useSearchParams();

  const push = (href: string, options?: NavigateOptions) => {
    const { keep, ...otherOptions } = { ...options };
    const resolvedKeep = keep ? (Array.isArray(keep) ? keep : [keep]) : [];
    nextRouter.push(
      appendSearchParams(href, searchParams, resolvedKeep),
      otherOptions,
    );
  };

  const replace = (href: string, options?: NavigateOptions) => {
    const { keep, ...otherOptions } = { ...options };
    const resolvedKeep = keep ? (Array.isArray(keep) ? keep : [keep]) : [];
    nextRouter.replace(
      appendSearchParams(href, searchParams, resolvedKeep),
      otherOptions,
    );
  };

  return {
    ...nextRouter,
    push,
    replace,
  };
};

export const appendSearchParams = (
  href: string,
  searchParams: ReadonlyURLSearchParams,
  searchParamsNames?: string[],
) => {
  const url = new URL(href, window.location.origin);
  const params = new URLSearchParams(url.search);
  searchParamsNames?.forEach((name) => {
    const value = searchParams.get(name);
    value && params.set(name, value);
  });
  url.search = params.toString();
  return url.pathname + url.search + url.hash;
};

export { useRouter };
