import { type NextRequest, NextResponse } from 'next/server';
import { COOKIES } from './constants/common';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get session token from cookies
  const sessionToken = request.cookies.get(COOKIES.SESSION)?.value;

  // Add session token to headers if it exists
  if (sessionToken) {
    response.headers.set('x-session-token', sessionToken);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)'],
};
