import { NextResponse } from 'next/server';
import { withAuth } from '~/lib/server/utils';
import { createCheckoutSession } from '~/services/serverService/stripe/stripe.service';

export const POST = withAuth(async ({ request, user }) => {
  const { amount, event } = await request.json();

  try {
    const session = await createCheckoutSession(user, event, amount);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: (err as any).message }, { status: 500 });
  }
});
