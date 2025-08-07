import type { ReactNode } from 'react';
import { Card } from '~/components/ui/card';

const NoDataPlaceholder = ({
  mainContent,
  enableDefaultLayout = false,
}: {
  mainContent?: ReactNode;
  enableDefaultLayout?: boolean;
}) => {
  const combinedMainContent = mainContent ?? (
    <div className="flex w-full flex-col items-center justify-center p-5">
      <span className="font-semibold">データがありません</span>
    </div>
  );
  return !enableDefaultLayout ? combinedMainContent : <Card>{combinedMainContent}</Card>;
};

export default NoDataPlaceholder;
