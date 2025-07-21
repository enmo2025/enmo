import React from 'react';
import PaymentPage from '~/components/pages/payment/PaymentPage';
import { getCurrentSession } from '~/lib/server/auth/session';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '支払い',
  description: '支払いページ',
  manifest: '/manifest.json',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { user } = await getCurrentSession();

  if (!user) {
    redirect('/login');
  }

  return <PaymentPage id={id} userId={user.id} />;
}
