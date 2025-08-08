import React from 'react';
import PaymentPage from '~/components/pages/payment/PaymentPage';
import { getCurrentSession } from '~/lib/server/auth/session';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getEvent } from '~/services/clientService/event/event.api';

export const metadata: Metadata = {
  title: '支払い',
  description: '支払いページ',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function page({ params }: { params: { id: string } }) {
  const { user } = await getCurrentSession();
  const cookieStore = await cookies();
  const event = (await getEvent(params.id, cookieStore)).data;

  if (!user) {
    redirect('/login');
  }

  return <PaymentPage event={event} userId={user.id} />;
}
