'use client';

import { Button } from '~/components/ui/button';
import { useIsBreakpoint } from '~/hooks/use-breakpoint';
import { formatDate } from '~/lib/utils';

export interface CardEventInfoProps {
  date: Date;
  location: string;
  participantFee: number;
}

export default function CardEventInfo({ date, location, participantFee }: CardEventInfoProps) {
  const isTablet = useIsBreakpoint(1024);
  return (
    <div className="flex w-full max-w-100 flex-col gap-7 rounded-xl border border-brown-300 bg-yellow-50 p-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <span className="text-body-md text-brown-700 md:text-body-lg">時間:</span>
          <span className="text-body-lg text-brown-900 md:text-body-xl">{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-body-md text-brown-700 md:text-body-lg">地域:</span>
          <span className="text-body-lg text-brown-900 md:text-body-xl">{location}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-body-md text-brown-700 md:text-body-lg">参加費:</span>
          <span className="text-body-lg text-brown-900 md:text-body-xl">{participantFee} ¥</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button typeStyle="round" className="font-bold" size={isTablet ? 'lg' : 'xl'}>
          このくらしの窓口に参加する
        </Button>
      </div>
    </div>
  );
}
