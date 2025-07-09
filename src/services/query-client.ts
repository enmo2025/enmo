import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from '~/hooks/use-toast';
import { logout as logoutAction } from '~/app/(modules)/actions';

/**
 * Extract error message from various error formats
 */
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }
  return 'An unexpected error occurred';
};

/**
 * Check if error requires logout (401 unauthorized)
 */
const isUnauthorized = (error: unknown): boolean => {
  return !!(error && typeof error === 'object' && 'status' in error && error.status === 401);
};

/**
 * Logout user using the proper logout action
 */
const handleLogout = (): void => {
  if (typeof window === 'undefined') return;

  logoutAction().catch((error) => {
    console.error('Logout failed:', error);
    // Fallback: manual cleanup
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  });
};

/**
 * Show error toast notification
 */
const showErrorToast = (error: unknown): void => {
  toast({
    title: 'Error',
    description: getErrorMessage(error),
    variant: 'destructive',
  });
};

/**
 * Global error handler for queries and mutations
 */
const handleError = (error: unknown): void => {
  console.error('Query/Mutation error:', error);

  if (isUnauthorized(error)) {
    handleLogout();
  } else {
    showErrorToast(error);
  }
};

/**
 * Retry logic for queries and mutations
 */
const shouldRetry = (failureCount: number, maxRetries: number, error: unknown): boolean => {
  if (isUnauthorized(error)) return false;
  return failureCount < maxRetries;
};

/**
 * Create QueryClient with optimized defaults and global error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: (failureCount, error) => shouldRetry(failureCount, 3, error),
    },
    mutations: {
      retry: (failureCount, error) => shouldRetry(failureCount, 1, error),
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!mutation.meta?.ignoreGlobalError) {
        handleError(error);
      }
    },
  }),
});

export default queryClient;
