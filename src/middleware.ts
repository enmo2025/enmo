import { type NextRequest, NextResponse } from 'next/server';
import { COOKIES } from './constants/common';

export async function middleware(request: NextRequest) {
  // const hostname = request.headers.get('host')!;
  // const subdomain = hostname.match(/^([^.]+)\./)?.[1];
  const response = NextResponse.next();

  // Get session token from cookies
  const sessionToken = request.cookies.get(COOKIES.SESSION)?.value;

  // Add session token to headers if it exists
  if (sessionToken) {
    response.headers.set('x-session-token', sessionToken);
  }

  // if (process.env.NODE_ENV === 'production') {
  //   if (subdomain?.startsWith(SUBDOMAIN.LANDING_PAGE)) {
  //     return NextResponse.rewrite(new URL(`/(landing-page)${request.nextUrl.pathname}`, request.url));
  //   } else if (subdomain?.startsWith(SUBDOMAIN.MAIN)) {
  //     return NextResponse.rewrite(new URL(`${request.nextUrl.pathname}`, request.url));
  //   }
  // }

  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)'],
};
