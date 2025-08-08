import { Metadata } from 'next';
import PaymentSuccess from '~/components/pages/payment/PaymentSuccess';
import NoDataPlaceholder from '~/components/shared/indicator/no-data-placeholder';
import { PurchaseExtend } from '~/services/clientService/purchase/interface.api';
import { getPurchaseByStripeSessionId } from '~/services/serverService/purchase/purchase.service';

export const metadata: Metadata = {
  title: '支払い成功',
  description: '支払い成功ページ',
  keywords: ['支払い', 'Payment', 'Enmo'],
};

export default async function PaymentSuccessPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const purchase = (await getPurchaseByStripeSessionId(id)) as PurchaseExtend;

  if (!purchase) {
    return <NoDataPlaceholder />;
  }

  return <PaymentSuccess purchase={purchase} />;
}
