import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export const useNavigationCleanup = (cleanupFn: () => void | Promise<void>) => {
  const router = useRouter();
  const cleanupRef = useRef(cleanupFn);

  useEffect(() => {
    cleanupRef.current = cleanupFn;
  }, [cleanupFn]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      cleanupRef.current();
    };

    const handleRouteChange = () => {
      cleanupRef.current();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    window.addEventListener('popstate', handleRouteChange);

    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = (...args) => {
      handleRouteChange();
      return originalPush.apply(router, args);
    };

    router.replace = (...args) => {
      handleRouteChange();
      return originalReplace.apply(router, args);
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleRouteChange);

      router.push = originalPush;
      router.replace = originalReplace;

      cleanupRef.current();
    };
  }, [router]);
};
