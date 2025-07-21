import { Metadata } from 'next';
import PaymentSuccess from '~/components/pages/payment/PaymentSuccess';

export const metadata: Metadata = {
  title: '支払い成功',
  description: '支払い成功ページ',
  manifest: '/manifest.json',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  return <PaymentSuccess id={params.id} />;
}
