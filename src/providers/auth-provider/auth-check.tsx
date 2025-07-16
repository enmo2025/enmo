'use client';

import { redirect, usePathname } from 'next/navigation';
import React from 'react';
import { PATH, PATH_AUTH, PUBLIC_PAGES } from '~/constants/routes';
import { SessionValidationResult } from '~/lib/server/auth/session';

type AuthCheckProps = {
  session: SessionValidationResult;
  children: React.ReactNode;
};

export default function AuthCheck({ session, children }: AuthCheckProps) {
  const currentPath = usePathname();

  const isAuthenticationRoute = PATH_AUTH.includes(currentPath as (typeof PATH_AUTH)[number]);
  const isPublicRoute = PUBLIC_PAGES.includes(currentPath as (typeof PUBLIC_PAGES)[number]);
  const isAuthenticated = Boolean(session.user);
  const isCheckFullInfo = session.user?.dateOfBirth && session.user?.gender && session.user?.prefectures;
  const isBasicInfoPage = currentPath === PATH.REGISTER_BASIC_INFO;

  // Redirect authenticated users away from auth pages (login, register) to HOME
  if (isAuthenticated && isAuthenticationRoute) {
    return redirect(PATH.HOME);
  }

  // Redirect unauthenticated users to login (except for public pages)
  if (!isAuthenticated && !isPublicRoute) {
    return redirect(PATH.LOGIN);
  }

  // Handle incomplete profile for authenticated users (only for protected pages)
  if (isAuthenticated && !isCheckFullInfo && !isBasicInfoPage && !isPublicRoute) {
    return redirect(PATH.REGISTER_BASIC_INFO);
  }

  return <>{children}</>;
}
