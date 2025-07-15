import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from '~/hooks/use-toast';
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
    },
    mutations: {},
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Query error:', error);

      if (typeof window !== 'undefined') {
        toast({
          title: 'Error',
          description: error.message || 'Failed to load data',
          variant: 'destructive',
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (!mutation.meta?.ignoreGlobalError) {
        console.error('Mutation error:', error);

        if (typeof window !== 'undefined') {
          toast({
            title: 'Error',
            description: error.message || 'Action failed',
            variant: 'destructive',
          });
        }
      }
    },
  }),
});

export default queryClient;
