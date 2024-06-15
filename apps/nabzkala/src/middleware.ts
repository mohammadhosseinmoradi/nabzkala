import { NextRequest } from "next/server";
import { i18nRoutingMiddleware } from "@/modules/locale/i18n-routing-middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/api/") || pathname === "/api") {
    return;
  } else {
    return i18nRoutingMiddleware(request);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
