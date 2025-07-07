import { redirect } from "next/navigation";
import { getCurrentSession } from "./session";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "~/constants/routes";

/**
 * Server component utility to ensure user is authenticated
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const { session, user } = await getCurrentSession();
  
  if (!session || !user) {
    redirect(AUTH_ROUTES.LOGIN);
  }
  
  return { session, user };
}

/**
 * Server component utility to ensure user is not authenticated
 * Redirects to dashboard if already authenticated
 */
export async function requireGuest() {
  const { session, user } = await getCurrentSession();
  
  if (session && user) {
    redirect(PROTECTED_ROUTES.DASHBOARD);
  }
  
  return { session: null, user: null };
}

/**
 * Get user data or null if not authenticated
 * Does not redirect, useful for optional authentication
 */
export async function getOptionalUser() {
  const { session, user } = await getCurrentSession();
  
  if (!session || !user) {
    return { session: null, user: null };
  }
  
  return { session, user };
}

/**
 * Check if user has specific role (future enhancement)
 */
export async function requireRole(role: string) {
  const { session, user } = await requireAuth();
  
  // For now, just return user. In future, check user.role
  // if (user.role !== role) {
  //   redirect("/unauthorized");
  // }
  
  return { session, user };
}

/**
 * Check if user owns resource (future enhancement)
 */
export async function requireOwnership(resourceUserId: string) {
  const { session, user } = await requireAuth();
  
  if (user.id !== resourceUserId) {
    redirect("/unauthorized");
  }
  
  return { session, user };
} 