import { QUERY_PARAMS } from './common';

export const PATH = {
  HOME: '/',
  REGISTER_BASIC_INFO: '/register/basic-info',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },

  PROFILE: {
    VIEW: '/profile',
    INFO: '/profile/info',
    SETTING: '/profile/setting',
    TERM: '/profile/term-of-use',
    DELETE_ACCOUNT: '/delete-account/confirm',
    DELETE_ACCOUNT_SUCCESS: '/delete-account/success',
  },

  PAYMENT: {
    PAYMENT: (id: string) => `/payment/${id}`,
    PAYMENT_SUCCESS: (id: string) => `/payment/success/${id}`,
  },

  EVENT: {
    DETAIL: (id: string) => `/events/${id}`,
    LIST: '/events',
  },

  ADMIN: {
    LIST_USER_PAID: '/admin/list-user-paid',
    LIST_EVENT: '/admin/list-event',
    CREATE_EVENT: '/admin/event',
    EDIT_EVENT: (id: string) => `/admin/event/${id}`,
    DELETE_EVENT: (id: string) => `/admin/list-event/${id}`,
  },
} as const;

export const PUBLIC_PAGES = [
  PATH.AUTH.LOGIN,
  PATH.AUTH.REGISTER,
  PATH.PROFILE.DELETE_ACCOUNT_SUCCESS,
  PATH.EVENT.LIST,
  PATH.EVENT.DETAIL,
  PATH.HOME,
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
