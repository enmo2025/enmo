import React from 'react';
import PaymentPage from '~/components/pages/payment/PaymentPage';
import { getCurrentSession } from '~/lib/server/auth/session';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { getEventById } from '~/services/serverService/event/event.service';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';

export const metadata: Metadata = {
  title: '支払い',
  description: '支払いページ',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { user } = await getCurrentSession();
  const event = await getEventById(id);

  if (!user) {
    redirect('/login');
  }

  if (!event) {
    return <NoDataPlaceholder />;
  }

  return <PaymentPage event={event} userId={user.id} />;
}
