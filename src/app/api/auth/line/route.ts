// /auth/line/start.ts
import { generateCodeVerifier } from 'arctic';
import { line } from '~/lib/server/auth/line';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const redirect = url.searchParams.get('redirect');
  const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/';

  const codeVerifier = generateCodeVerifier();
  const scopes = ['profile', 'openid', 'email'];

  const statePayload = {
    codeVerifier,
    redirect: safeRedirect,
  };
  const state = Buffer.from(JSON.stringify(statePayload)).toString('base64');

  const authUrl = line.createAuthorizationURL(state, codeVerifier, scopes);
  authUrl.searchParams.set('bot_prompt', 'normal');

  return Response.redirect(authUrl.toString());
};
