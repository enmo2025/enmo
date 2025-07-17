import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '~/lib/server/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, eventId } = session.metadata as { userId: string; eventId: string };
    try {
      await prisma.purchase.create({
        data: {
          userId,
          eventId,
          stripeSessionId: session.id,
          amount: session.amount_total ?? 0,
        },
      });
      console.log('✅ Purchase created successfully');
    } catch (err) {
      console.error('❌ Purchase creation failed:', err);
    }
  }

  return NextResponse.json({ received: true });
}
