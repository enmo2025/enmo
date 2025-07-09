import { generateState, generateCodeVerifier } from 'arctic';
import { cookies } from 'next/headers';
import { line } from '~/lib/server/auth/line';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const redirect = url.searchParams.get('redirect');
  // Ensure redirect is a valid internal URL
  const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/dashboard';

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const scopes = ['profile', 'openid', 'email'];
  const lineUrl = line.createAuthorizationURL(state, codeVerifier, scopes);

  const cookieStore = await cookies();

  // Set cookies with more permissive settings for development
  const cookieOptions = {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax' as const,
  };

  // In development, make cookies work on localhost
  if (process.env.NODE_ENV !== 'production') {
    cookieOptions.secure = false;
  }

  // Store the original redirect URL without any encoding
  cookieStore.set('line_oauth_state', state, cookieOptions);
  cookieStore.set('line_oauth_code_verifier', codeVerifier, cookieOptions);
  cookieStore.set('line_redirect_after_login', safeRedirect, cookieOptions);

  return Response.redirect(lineUrl.toString());
};
