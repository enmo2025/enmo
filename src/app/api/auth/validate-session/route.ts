import { type NextRequest } from 'next/server';
import { validateSessionToken } from '~/lib/server/auth/session';
import { COOKIES } from '~/constants/common';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get(COOKIES.SESSION)?.value;

    if (!sessionToken) {
      return Response.json({ isValid: false });
    }

    const { session, user } = await validateSessionToken(sessionToken);
    const isValid = !!(session && user);

    return Response.json({ isValid });
  } catch (error) {
    console.error('Session validation error:', error);
    return Response.json({ isValid: false });
  }
}
