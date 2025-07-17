import React from 'react';
import PaymentPage from '~/components/pages/payment/PaymentPage';
import { getCurrentSession } from '~/lib/server/auth/session';
import { redirect } from 'next/navigation';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { user } = await getCurrentSession();

  if (!user) {
    redirect('/login');
  }

  return <PaymentPage id={id} userId={user.id} />;
}
