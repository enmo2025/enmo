'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { PATH, PUBLIC_PAGES } from '~/constants/routes';

export function useAuth(session: any) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthRoute = [PATH.LOGIN, PATH.REGISTER].includes(pathname as typeof PATH.LOGIN | typeof PATH.REGISTER);
    const isPublicRoute = PUBLIC_PAGES.some((route) => pathname.startsWith(route));

    // If authenticated and trying to access auth routes, redirect to home
    if (session && isAuthRoute) {
      router.replace(PATH.HOME);
    }
    // If not authenticated and trying to access protected route
    else if (!isPublicRoute && !session) {
      const loginUrl = `${PATH.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
      router.replace(loginUrl);
    }
  }, [session, pathname, router]);

  return { isAuthenticated: !!session };
}
