import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { validateSessionToken } from "~/lib/server/auth/session";
import { PATH, PUBLIC_PAGES, RouteHelpers } from "~/constants/routes";
import { COOKIES, QUERY_PARAMS } from "./constants/common";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname
  const pathnameWithoutLocale = RouteHelpers.removeLocalePrefix(pathname);

  // Check if route needs protection
  const isPublicRoute = PUBLIC_PAGES.some(route => pathnameWithoutLocale.startsWith(route));
  const isAuthRoute = [PATH.LOGIN, PATH.REGISTER].includes(pathnameWithoutLocale as typeof PATH.LOGIN | typeof PATH.REGISTER);

  // Get session token from cookies
  const sessionToken = request.cookies.get(COOKIES.SESSION)?.value;
  let isAuthenticated = false;

  if (sessionToken) {
    try {
      const { session, user } = await validateSessionToken(sessionToken);
      isAuthenticated = !!(session && user);
    } catch (error) {
      // Invalid session, clear cookie
      isAuthenticated = false;
    }
  }

  // Handle protected routes
  if (!isPublicRoute && !isAuthenticated) {
    const loginUrl = new URL(PATH.LOGIN, request.url);
    loginUrl.searchParams.set(QUERY_PARAMS.REDIRECT, pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth routes (redirect to home if already logged in)
  if (isAuthRoute && isAuthenticated) {
    const homeUrl = new URL(PATH.HOME, request.url);
    return NextResponse.redirect(homeUrl);
  }

  // Apply i18n middleware
  return I18nMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
