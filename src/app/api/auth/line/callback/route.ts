import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { setSessionTokenCookie } from '~/lib/server/auth/cookies';
import { createSession, generateSessionToken } from '~/lib/server/auth/session';
import { prisma } from '~/lib/server/db';
import { line } from '~/lib/server/auth/line';
import { PATH } from '~/constants/routes';
import { lineMessaging } from '~/lib/server/line-messaging';
import messageTemplate from '~/constants/message-template';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get('line_oauth_state')?.value ?? null;
  const codeVerifier = cookieStore.get('line_oauth_code_verifier')?.value ?? null;
  const redirect = cookieStore.get('line_redirect_after_login')?.value ?? PATH.HOME;

  if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
    return new Response(
      `Invalid request - missing parameters:
            code: ${Boolean(code)},
            state: ${Boolean(state)},
            storedState: ${Boolean(storedState)},
            codeVerifier: ${Boolean(codeVerifier)},
            stateMatch: ${state === storedState}`,
      {
        status: 400,
      }
    );
  }

  try {
    const tokens = await line.validateAuthorizationCode(code, codeVerifier);

    const lineUserResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });

    if (!lineUserResponse.ok) {
      throw new Error(`Failed to fetch LINE profile: ${lineUserResponse.statusText}`);
    }
    const lineUser: LineUser = await lineUserResponse.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            lineId: lineUser.userId,
          },
          {
            email: lineUser.email,
          },
        ],
      },
    });

    if (existingUser) {
      const sessionTokenCookie = generateSessionToken();
      const session = await createSession(sessionTokenCookie, existingUser.id);
      await setSessionTokenCookie(sessionTokenCookie, session.expiresAt);

      if (existingUser.lineId) {
        lineMessaging
          .sendMessage(existingUser.lineId, [
            {
              type: 'text',
              text: messageTemplate(existingUser).welcome.text,
            },
          ])
          .catch((error) => console.error('Failed to send LINE welcome message:', error));
      }

      // Check if user profile is complete
      revalidatePath('/', 'layout');
      return new Response(null, {
        status: 302,
        headers: {
          Location: redirect,
        },
      });
    }

    const newUser = await prisma.user.create({
      data: {
        lineId: lineUser.userId,
        fullName: lineUser.displayName,
        picture: lineUser.pictureUrl,
        email: lineUser.email,
      },
    });

    const sessionTokenCookie = generateSessionToken();
    const session = await createSession(sessionTokenCookie, newUser.id);
    await setSessionTokenCookie(sessionTokenCookie, session.expiresAt);
    // New user always needs to complete profile
    revalidatePath('/', 'layout');
    return new Response(null, {
      status: 302,
      headers: {
        Location: PATH.REGISTER_BASIC_INFO,
      },
    });
  } catch (e) {
    console.error('LINE authentication error:', e);

    if (e instanceof OAuth2RequestError) {
      return new Response(`OAuth2 Error: ${e.description}`, {
        status: 400,
      });
    }

    if (e instanceof ArcticFetchError) {
      return new Response(`Authentication Error: ${e.message}`, {
        status: 400,
      });
    }

    if (e instanceof PrismaClientKnownRequestError) {
      return new Response(`Database Error: ${e.message}`, {
        status: 400,
      });
    }

    return new Response('Internal Server Error', {
      status: 500,
    });
  }
};

interface LineUser {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
  email?: string;
}
