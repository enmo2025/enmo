// /auth/line/callback.ts
import { OAuth2RequestError, ArcticFetchError } from 'arctic';
import { revalidatePath } from 'next/cache';
import { setSessionTokenCookie } from '~/lib/server/auth/cookies';
import { createSession, generateSessionToken } from '~/lib/server/auth/session';
import { prisma } from '~/lib/server/db';
import { line } from '~/lib/server/auth/line';
import { PATH } from '~/constants/routes';
import messageTemplate from '~/constants/message-template';
import { lineService } from '~/services/serverService/lines/line.service';

interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const friendshipStatusChanged = url.searchParams.get('friendship_status_changed');

  if (!code || !state) {
    return new Response('Invalid request - missing code or state', { status: 400 });
  }

  let codeVerifier: string;
  let redirect: string;

  const stateDecoded = JSON.parse(Buffer.from(state, 'base64').toString('utf-8'));
  codeVerifier = stateDecoded.codeVerifier;
  redirect = stateDecoded.redirect ?? PATH.HOME;

  try {
    const tokens = await line.validateAuthorizationCode(code, codeVerifier);

    const lineUser = await lineService.getProfile(tokens);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ lineId: lineUser.userId }, { email: lineUser.email }],
      },
    });

    const user =
      existingUser ??
      (await prisma.user.create({
        data: {
          lineId: lineUser.userId,
          fullName: lineUser.displayName,
          picture: lineUser.pictureUrl,
          email: lineUser.email,
          isFriend: Boolean(friendshipStatusChanged),
        },
      }));

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);

    if (user.lineId) {
      lineService
        .sendMessage(user.lineId, [
          {
            type: 'text',
            text: messageTemplate(user).welcome.text,
          },
        ])
        .catch((err) => console.error('Failed to send LINE message:', err));
    }

    revalidatePath('/', 'layout');

    return new Response(null, {
      status: 302,
      headers: {
        Location: existingUser ? redirect : PATH.REGISTER_BASIC_INFO,
      },
    });
  } catch (e) {
    console.error('LINE OAuth error:', e);

    if (e instanceof OAuth2RequestError) {
      return new Response(`OAuth2 Error: ${e.description}`, { status: 400 });
    }

    if (e instanceof ArcticFetchError) {
      return new Response(`Authentication Error: ${e.message}`, { status: 400 });
    }

    return new Response('Internal Server Error', { status: 500 });
  }
};
