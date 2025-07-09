import React from 'react';
import { getCurrentSession } from '~/lib/server/auth/session';
import AuthCheck from './auth-check';

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = await getCurrentSession();
  return <AuthCheck session={session}>{children}</AuthCheck>;
}
