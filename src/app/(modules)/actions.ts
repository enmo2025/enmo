'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATH } from '~/constants/routes';
import { authActionClient } from '~/lib/client/safe-action';
import { deleteSessionTokenCookie } from '~/lib/server/auth/cookies';
import { invalidateSession } from '~/lib/server/auth/session';

export const logout = authActionClient.metadata({ actionName: 'logout' }).action(async ({ ctx: { sessionId } }) => {
  await invalidateSession(sessionId);
  deleteSessionTokenCookie();
  revalidatePath(PATH.HOME);
  return redirect(PATH.LOGIN);
});
