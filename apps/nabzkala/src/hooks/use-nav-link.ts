import { useMemo } from "react";
import { UrlObject } from "url";
import { usePathname } from "next/navigation";

export type UseNavLinkProps = {
  href: string | UrlObject;
};

/**
 * Custom hook to determine the active state of a navigation link based on the current pathname.
 *
 * @param {object} props - The properties for the hook.
 * @param {string | UrlObject} props.href - The target href for the navigation link.
 * @returns {object} - An object containing the active state and information about active children.
 * @property {boolean} active - Indicates whether the current pathname matches the provided href.
 * @property {boolean} hasActiveChildren - Indicates if there are active children under the provided href.
 */
export function useNavLink({ href }: UseNavLinkProps) {
  const pathname = usePathname();
  const hrefPathname = new URL(href as string, "https://test.com").pathname;

  return useMemo(() => {
    const hasActiveChildren =
      pathname !== hrefPathname && pathname.startsWith(hrefPathname);
    const active = pathname === hrefPathname;

    return {
      active,
      hasActiveChildren,
    };
  }, [pathname, href]);
}
