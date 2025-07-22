import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { withAuth } from '~/lib/server/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = withAuth(async ({ request, user }) => {
  const { amount, event } = await request.json();

  try {
    const session = await stripe.checkout.sessions.create({
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

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: (err as any).message }, { status: 500 });
  }
});
