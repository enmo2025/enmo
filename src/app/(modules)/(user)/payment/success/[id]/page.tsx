import PaymentSuccess from '~/components/pages/payment/PaymentSuccess';

export default function PaymentSuccessPage({ params }: { params: { id: string } }) {
  return <PaymentSuccess id={params.id} />;
}
