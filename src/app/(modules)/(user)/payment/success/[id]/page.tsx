import { Metadata } from 'next';
import { cookies } from 'next/headers';
import PaymentSuccess from '~/components/pages/payment/PaymentSuccess';
import { getPurchaseByStripeSessionId } from '~/services/clientService/purchase/purchase.api';

export const metadata: Metadata = {
  title: '支払い成功',
  description: '支払い成功ページ',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const cookieStore = await cookies();
  const purchase = (await getPurchaseByStripeSessionId(id, cookieStore)).data;

  return <PaymentSuccess purchase={purchase} />;
}
