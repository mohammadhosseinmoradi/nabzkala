import Negotiator from "negotiator";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "@/modules/locale/locales";
import { match } from "@formatjs/intl-localematcher";

export function i18nRoutingMiddleware(request: NextRequest) {
  const requestedLocales = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") ?? locales[0],
    },
  }).languages();

  // Create next-intl middleware.
  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: match(requestedLocales, locales, locales[0]),
    localePrefix: "always",
  });

  // Call next-intl middleware and return response.
  return handleI18nRouting(request);
}
