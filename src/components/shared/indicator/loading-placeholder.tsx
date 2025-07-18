import { Loader2 } from 'lucide-react';
import { cn } from '~/lib/utils';

const loadingSizeClassNameMap = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

type LoadingSize = keyof typeof loadingSizeClassNameMap;

const LoadingPlaceholder = ({ size = 'xl' }: { size?: LoadingSize }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn('animate-spin text-primary', loadingSizeClassNameMap[size])} aria-label="Loading" />
    </div>
  );
};

export default LoadingPlaceholder;
