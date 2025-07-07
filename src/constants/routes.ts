import { QUERY_PARAMS } from "./common";

/**
 * Public routes - accessible without authentication
 */
export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CHANGELOG: "/changelog",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  SITEMAP: "/sitemap.xml",
  ROBOTS: "/robots.txt",
} as const;

/**
 * Authentication routes - redirect to dashboard if already logged in
 */
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

/**
 * Protected routes - require authentication
 */
export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
  DASHBOARD_PROJECTS: "/dashboard/projects",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_BILLING: "/dashboard/billing",
} as const;

/**
 * All routes that require authentication
 */
export const PROTECTED_ROUTE_PATTERNS = [
  PROTECTED_ROUTES.DASHBOARD,
] as const;

/**
 * All routes that should redirect to dashboard if authenticated
 */
export const AUTH_ROUTE_PATTERNS = [
  AUTH_ROUTES.LOGIN,
  AUTH_ROUTES.REGISTER,
  "/auth", // Generic auth pattern
] as const;

/**
 * Routes that don't require any middleware processing
 */
export const IGNORED_ROUTES = [
  "/api/",
  "/static/",
  "/_next/",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.json",
] as const;

/**
 * Default redirect paths
 */
export const DEFAULT_REDIRECTS = {
  AFTER_LOGIN: PROTECTED_ROUTES.DASHBOARD,
  AFTER_LOGOUT: AUTH_ROUTES.LOGIN,
  UNAUTHORIZED: AUTH_ROUTES.LOGIN,
  NOT_FOUND: PUBLIC_ROUTES.HOME,
} as const;

/**
 * Helper functions to work with routes
 */
export const RouteHelpers = {
  /**
   * Check if a path is a protected route
   */
  isProtectedRoute: (pathname: string): boolean => {
    return PROTECTED_ROUTE_PATTERNS.some(route => 
      pathname.startsWith(route)
    );
  },

  /**
   * Check if a path is an auth route
   */
  isAuthRoute: (pathname: string): boolean => {
    return AUTH_ROUTE_PATTERNS.some(route => 
      pathname.startsWith(route)
    );
  },

  /**
   * Check if a path should be ignored by middleware
   */
  isIgnoredRoute: (pathname: string): boolean => {
    return IGNORED_ROUTES.some(route => 
      pathname.startsWith(route)
    );
  },

  /**
   * Remove locale prefix from pathname
   */
  removeLocalePrefix: (pathname: string): string => {
    if (pathname.startsWith("/en") || pathname.startsWith("/fr")) {
      return pathname.slice(3) || "/";
    }
    return pathname;
  },

  /**
   * Build URL with query parameters
   */
  buildUrlWithQuery: (baseUrl: string, params: Record<string, string>): string => {
    const url = new URL(baseUrl, "http://localhost:3000");
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.pathname + url.search;
  },

  /**
   * Get redirect URL from query params or default
   */
  getRedirectUrl: (searchParams: URLSearchParams, defaultUrl: string = DEFAULT_REDIRECTS.AFTER_LOGIN): string => {
    const redirect = searchParams.get(QUERY_PARAMS.REDIRECT);
    return redirect && redirect.startsWith("/") ? redirect : defaultUrl;
  },
} as const; 