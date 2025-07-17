'use client';

import React from 'react';
import { Card, CardContent } from '~/components/ui/card';
import eventBanner from '~/assets/images/event-banner.png';
import Image from 'next/image';
import Divider from '~/components/ui/divider';
import { Event } from '@prisma/client';
import { Button } from '~/components/ui/button';
import { useGetEvent } from '~/services/clientService/event/event.api';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import LoadingOverlay from '~/components/shared/indicator/loading-overlay';
import { formatDate } from '~/lib/utils';

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
  serviceCharge: number;
  totalAmount: number;
}

export default function PaymentPage({ id, userId }: { id: string; userId: string }) {
  const { data, isLoading } = useGetEvent(id);
  const event = data?.data;
  if (!event) return <NoDataPlaceholder />;
  if (isLoading) return <LoadingOverlay />;
  const totalAmount = Number(event.participantFee) + Number(event.serviceCharge);

  const handlePayment = async () => {
    const res = await fetch('/api/stripe/checkout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        userId: userId,
        event: event,
      }),
    });

    const data = await res.json();

    if (data.url) {
      window.open(data.url, '_blank');
    } else {
      console.error('Failed to create checkout session.', data);
    }
  };

  return (
    <div className="mx-auto mb-30 mt-14 max-w-screen-md text-center">
      <h1 className="mb-10 text-headline-lg font-bold text-red-700">お支払い方法を選択してください</h1>
      <Card className="bg-white">
        <CardContent>
          <EventSummary event={event} />
          <PriceDetails
            participantFee={event.participantFee}
            serviceCharge={event.serviceCharge}
            totalAmount={totalAmount}
          />
        </CardContent>
      </Card>
      <Button className="mt-10 w-full" onClick={handlePayment} size="xl" typeStyle="round">
        クレジットカードで支払う
      </Button>
    </div>
  );
}

function EventSummary({ event }: EventSummaryProps) {
  return (
    <div className="flex gap-10">
      <Image
        width={1000}
        height={1000}
        className="h-[180px] w-[260px] rounded-sm object-cover"
        src={event.eventBanner}
        alt="event banner"
      />
      <div className="w-full text-left text-brown-900">
        <div className="text-headline-sm font-bold text-brown-700">{event.title}</div>
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
    <div className="text-body-sm">
      <span className="text-brown-700">{label}:</span>
      <span className="ml-3 text-body-lg font-medium">{value}</span>
    </div>
  );
}

function PriceDetails({ participantFee, serviceCharge, totalAmount }: PriceDetailsProps) {
  return (
    <div className="text-left">
      <h1 className="mt-5 text-headline-sm font-bold text-brown-900">価格詳細</h1>
      <Divider />
      <div>
        <PriceRow label="参加費" amount={participantFee} />
        <PriceRow label="サービス料" amount={serviceCharge} />
      </div>
      <Divider />
      <PriceRow label="合計料金" amount={totalAmount} isTotal />
      <Divider />
      <p className="text-center text-body-sm text-brown-700">
        ※表示価格は現在の為替レートに基づく概算価格です。為替レートは変動する場合がありますのでご了承ください。
      </p>
    </div>
  );
}

function PriceRow({ label, amount, isTotal = false }: PriceRowProps) {
  const labelClassName = isTotal ? 'text-body-lg text-brown-700' : 'text-brown-700';
  const amountClassName = isTotal ? 'ml-3 text-body-lg text-headline-lg font-medium' : 'ml-3 text-body-lg font-medium';

  return (
    <div className="flex justify-between">
      <span className={labelClassName}>{label}:</span>
      <span className={amountClassName}>{amount}¥</span>
    </div>
  );
}
