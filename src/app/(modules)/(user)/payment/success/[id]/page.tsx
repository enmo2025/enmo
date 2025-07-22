import { Metadata } from 'next';
import PaymentSuccess from '~/components/pages/payment/PaymentSuccess';

export const metadata: Metadata = {
  title: '支払い成功',
  description: '支払い成功ページ',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <PaymentSuccess id={id} />;
}
