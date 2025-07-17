import { QUERY_PARAMS } from './common';

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_BASIC_INFO: '/register/basic-info',

  PROFILE: '/profile',
  PROFILE_INFO: '/profile/info',
  PROFILE_SETTING: '/profile/setting',
  PROFILE_TERM: '/profile/term-of-use',
  DELETE_ACCOUNT: '/delete-account/confirm',
  DELETE_ACCOUNT_SUCCESS: '/delete-account/success',

  ADMIN: {
    LIST_USER_PAID: '/admin/list-user-paid',
    LIST_EVENT: '/admin/list-event',
    EVENT: '/admin/event',
  },
  PAYMENT: {
    PAYMENT: (id: string) => `/payment/${id}`,
    PAYMENT_SUCCESS: (id: string) => `/payment/success/${id}`,
  },
  EVENT: {
    DETAIL: (id: string) => `/event/${id}`,
    LIST: '/event',
  },
} as const;

export const PUBLIC_PAGES = [PATH.LOGIN, PATH.REGISTER, PATH.DELETE_ACCOUNT_SUCCESS, PATH.HOME] as const;

export const PATH_AUTH = [PATH.LOGIN, PATH.REGISTER] as const;

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
