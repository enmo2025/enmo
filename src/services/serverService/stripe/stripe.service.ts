import { Event, User } from '@prisma/client';
import Stripe from 'stripe';
import { createPurchase } from '../purchase/purchase.service';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = async (user: User, event: Event, amount: number) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    metadata: {
      userId: user.id,
      eventId: event.id,
      lineId: user.lineId,
    },
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: event.title,
            images: [event.eventBanner],
            description: event.description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    customer_creation: 'if_required',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/404`,
  });
};

export const checkoutSessionCompleted = async (body: string, sig: string, endpointSecret: string) => {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { userId, eventId, lineId } = session.metadata as { userId: string; eventId: string; lineId: string };
    try {
      await createPurchase(userId, eventId, session.id, session.amount_total ?? 0, lineId);
    } catch (err) {
      console.error('❌ Purchase creation failed:', err);
    }
  }
};
