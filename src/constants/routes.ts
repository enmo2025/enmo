import { QUERY_PARAMS } from './common';

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  WORKPLACE: '/workplace',
  MESSENGER: '/workplace/messenger',
  GET_STARTED: '/get-started',
  INVITE_WORKSPACE: '/get-started/invite-workspace',
  VERIFY: '/verify',
  FORGOT_PASSWORD: '/forgot-password',
  BASE_DOC: '/workplace/base/doc',
  BASE_HOME: '/workplace/base/home',
} as const;

export const PUBLIC_PAGES = [
  PATH.LOGIN,
  PATH.REGISTER,
  PATH.HOME,
  PATH.WORKPLACE,
  PATH.MESSENGER,
  PATH.GET_STARTED,
  PATH.INVITE_WORKSPACE,
] as const;

/**
 * Helper functions to work with routes
 */
export const RouteHelpers = {
  /**
   * Remove locale prefix from pathname
   */
  removeLocalePrefix: (pathname: string): string => {
    if (pathname.startsWith('/en') || pathname.startsWith('/fr')) {
      return pathname.slice(3) || '/';
    }
    return pathname;
  },

  /**
   * Build URL with query parameters
   */
  buildUrlWithQuery: (baseUrl: string, params: Record<string, string>): string => {
    const url = new URL(baseUrl, 'http://localhost:3000');
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.pathname + url.search;
  },

  /**
   * Get redirect URL from query params or default
   */
  getRedirectUrl: (searchParams: URLSearchParams, defaultUrl: string = PATH.HOME): string => {
    const redirect = searchParams.get(QUERY_PARAMS.REDIRECT);
    return redirect && redirect.startsWith('/') ? redirect : defaultUrl;
  },
} as const;
