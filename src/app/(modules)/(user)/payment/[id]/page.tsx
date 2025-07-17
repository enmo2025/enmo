import React from 'react';
import PaymentPage from '~/components/pages/payment/PaymentPage';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <PaymentPage id={id} />;
}
