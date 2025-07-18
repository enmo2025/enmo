'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PATH } from '~/constants/routes';
import { authActionClient } from '~/lib/client/safe-action';
import { deleteSessionTokenCookie } from '~/lib/server/auth/cookies';
import { invalidateSession } from '~/lib/server/auth/session';

const createLogoutAction = ({ noRedirect = false }: { noRedirect?: boolean } = {}) =>
  authActionClient.metadata({ actionName: 'logout' }).action(async ({ ctx: { sessionId } }) => {
    await invalidateSession(sessionId);
    await deleteSessionTokenCookie();
    revalidatePath('/');
    return noRedirect ? null : redirect(PATH.AUTH.LOGIN);
  });

export const logout = createLogoutAction;
export const logoutClient = async ({ noRedirect = false }: { noRedirect?: boolean } = {}) => {
  await logout({ noRedirect })();
};
