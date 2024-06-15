import { useMemo } from "react";
import { useParams, usePathname } from "next/navigation";
import { Breadcrumb, Params } from "./types";
import { getPathSegments } from "src/hooks/use-breadcrumb/helpers";

export function useBreadcrumbs({
  basePath = "/",
  getBreadcrumb = default_getBreadcrumb,
  getDynamicBreadcrumb = default_getDynamicBreadcrumb,
}: {
  basePath?: string;
  getBreadcrumb?: (segment: string, href: string) => Breadcrumb;
  getDynamicBreadcrumb?: (
    paramName: string,
    paramValue: string,
    params: Params,
    href: string,
  ) => Promise<Breadcrumb>;
}) {
  const pathname = usePathname();
  const params = useParams();

  return useMemo<(Breadcrumb | Promise<Breadcrumb>)[]>(() => {
    if (!pathname.startsWith(basePath))
      throw new Error("basePath is not correct.");

    const basePathSegments = getPathSegments(basePath);
    const pathSegments = getPathSegments(pathname).slice(
      basePathSegments.length,
    );

    // Replace dynamic parameters in pathname to create a consistent pathWithParam
    let pathnameWithParam = pathname;
    for (const p in params) {
      const isCatchAll = Array.isArray(params[p]);
      if (isCatchAll) {
        const paramValues = params[p] as string[];
        pathnameWithParam = pathnameWithParam.replace(
          paramValues.join("/"),
          paramValues.map(() => p).join("/"),
        );
      } else {
        pathnameWithParam = pathnameWithParam.replace(params[p] as string, p);
      }
    }
    const pathWithParamSegments = getPathSegments(pathnameWithParam).slice(
      basePathSegments.length,
    );

    const breadcrumbs = pathSegments.map((pathSegment, index) => {
      const isDynamic = pathSegment !== pathWithParamSegments[index];
      const href =
        basePath +
        (basePath === "/" ? "" : "/") +
        pathSegments.slice(0, index + 1).join("/");

      // Determine if the use-breadcrumb is dynamic or static and get the use-breadcrumb accordingly
      return isDynamic
        ? getDynamicBreadcrumb(
            pathWithParamSegments[index],
            pathSegment,
            params,
            href,
          )
        : getBreadcrumb(pathSegment, href);
    });

    const baseBreadcrumb = getBreadcrumb(basePath, basePath);

    return [baseBreadcrumb, ...breadcrumbs];
  }, [pathname]);
}

function default_getDynamicBreadcrumb(
  paramName: string,
  paramValue: string,
  params: Params,
  href: string,
): Promise<Breadcrumb> {
  return new Promise((resolve) => {
    resolve({
      label: paramName,
      href,
    });
  });
}

function default_getBreadcrumb(segment: string, href: string): Breadcrumb {
  return {
    label: segment,
    href,
  };
}
