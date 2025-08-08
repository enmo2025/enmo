'use client';

import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import Image from 'next/image';
import Divider from '~/components/ui/divider';
import { Event } from '@prisma/client';
import { Button } from '~/components/ui/button';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { cn, formatDate, formatNumber } from '~/lib/utils';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '~/services/clientService/stripe/stripe.api';

interface PriceRowProps {
  label: string;
  amount: number;
  isTotal?: boolean;
}

interface EventSummaryProps {
  event: Event;
}

interface EventDetailProps {
  label: string;
  value: string;
}

interface PriceDetailsProps {
  participantFee: number;
  totalAmount: number;
}

export default function PaymentPage({ userId, event }: { userId: string; event: Event }) {
  const router = useRouter();
  if (!event) return <NoDataPlaceholder />;
  const totalAmount = Number(event.participantFee);

  const handlePayment = async () => {
    await createCheckoutSession({
      amount: totalAmount,
      userId: userId,
      event: event,
    })
      .then((res) => {
        router.push(res.url);
      })
      .catch((err) => {
        console.error('Failed to create checkout session.', err);
      });
  };

  return (
    <div className="mx-auto mb-30 mt-14 flex max-w-200 flex-col gap-20 px-4 text-center">
      <h1 className="text-headline-lg font-bold text-red-700">お支払い方法を選択してください</h1>
      <Card className="bg-white">
        <CardContent>
          <EventSummary event={event} />
          <PriceDetails participantFee={event.participantFee} totalAmount={totalAmount} />
        </CardContent>
      </Card>
      <Button className="h-20 w-full text-headline-md" onClick={handlePayment} size="xl" typeStyle="round">
        クレジットカードで支払う
      </Button>
    </div>
  );
}

function EventSummary({ event }: EventSummaryProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-10">
      <Image
        width={1000}
        height={1000}
        className="h-[180px] w-full rounded object-cover md:w-[260px]"
        src={event.eventBanner}
        alt="event banner"
      />
      <div className="w-full text-left text-brown-900">
        <div className="text-headline-sm font-bold text-brown-900">{event.title}</div>
        <div className="mt-2 text-body-md">{event.location}</div>
        <Divider />
        <div className="mt-3 w-full space-y-2 text-body-sm">
          <EventDetail label="時間" value={formatDate(event.date, false)} />
          <EventDetail label="地域" value={event.location} />
          <EventDetail label="連絡方法" value="LINE" />
        </div>
      </div>
    </div>
  );
}

function EventDetail({ label, value }: EventDetailProps) {
  return (
    <div className="flex items-center gap-5 text-body-sm">
      <span className="text-brown-700">{label}:</span>
      <span className="text-body-lg">{value}</span>
    </div>
  );
}

function PriceDetails({ participantFee, totalAmount }: PriceDetailsProps) {
  return (
    <div className="text-left">
      <h1 className="mt-5 text-headline-sm font-bold text-brown-900">価格詳細</h1>
      <Divider className="bg-black" />
      <div>
        <PriceRow label="参加費" amount={participantFee} />
      </div>
      <Divider className="bg-black" />
      <PriceRow label="合計料金" amount={totalAmount} isTotal />
      <Divider className="bg-black" />
      <p className="text-center text-body-md text-brown-700">
        ※表示価格は現在の為替レートに基づく概算価格です。為替レートは変動する場合がありますのでご了承ください。
      </p>
    </div>
  );
}

function PriceRow({ label, amount, isTotal = false }: PriceRowProps) {
  const labelClassName = isTotal ? 'text-body-xl text-brown-900' : 'text-body-lg text-brown-700';
  const amountClassName = cn('ml-3 font-bold text-brown-900', isTotal ? 'text-headline-lg' : 'text-title-lg');

  return (
    <div className="flex items-center justify-between">
      <span className={labelClassName}>{label}:</span>
      <span className={amountClassName}>¥{formatNumber(amount)}</span>
    </div>
  );
}
