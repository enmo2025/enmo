import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { checkoutSessionCompleted } from '~/services/serverService/stripe/stripe.service';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = (await headers()).get('stripe-signature') as string;

    await checkoutSessionCompleted(body, sig, endpointSecret);

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
