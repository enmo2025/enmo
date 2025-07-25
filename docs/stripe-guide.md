# 📘 STRIPE Integration: Checkout and Webhook

## 🧩 Overview

This document explains how to integrate two main STRIPE services in your application:

- **STRIPE Checkout**: Creates a secure and seamless payment session where users are redirected to Stripe’s hosted checkout page to complete their transaction.
- **STRIPE Webhook**: Receives real-time notifications from Stripe about payment events (e.g., successful payments) and is used to store transaction details in your system.

---

## 🔐 STRIPE - Checkout flow

### ✅ Purpose

- Create a Stripe Checkout session to initiate a secure payment process.
- Stripe provides both the payment interface and supported payment methods, allowing users to complete transactions directly through a secure, hosted checkout page.

### 🔁 Flow Description

#### 1. `🔑 Setup`

- After creating a Stripe account, go to the Stripe Dashboard.
- Copy API keys in Dashboard.
- Paste your Stripe API keys in `.env`.

Example:

```
STRIPE_SECRET_KEY=sk_test_xxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxx
```

> ⚠️ Note: Make sure .env is listed in your .gitignore to keep credentials safe.

#### 2.`🛠️ Create API Endpoint for Stripe Checkout`

- Create a new API file (e.g. app/api/stripe/checkout/route.ts for Next.js 13+).
- Set up the handler to:
  - Load the STRIPE_SECRET_KEY from the environment.
  - Initialize Stripe.
  - Define product details (price, currency, quantity, etc.).
  - Call stripe.checkout.sessions.create() and return the session URL.

Example:

```
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: 'Sample Product',
          },
          unit_amount: 2000, // ¥2.000
        },
        quantity: 1,
      },
    ],
    success_url: 'https://your-domain.com/success',
    cancel_url: 'https://your-domain.com/cancel',
  });

  return NextResponse.json({ url: session.url });
}

```

## 🔐 STRIPE - Webhook flow

### ✅ Purpose

- Listen for real-time Stripe events such as successful payments, failed transactions, or subscription updates.
- Store transaction data securely in your database for further processing (e.g., updating order status, sending confirmation emails).

### 🔁 Flow Description

#### 1. `🔑 Setup`

- Access Webhook Settings

  - Go to: https://dashboard.stripe.com/test/workbench/webhooks

- Add a New Destination

  - Click the “Add destination” button.

- Select Events to Listen To

  - Choose one or more events you want the webhook to listen for.

```
Example: checkout.session.completed
```

- Configure Webhook Endpoint

  - Select “Webhook endpoint” option.
  - Enter your API endpoint URL (e.g. https://yourdomain.com/api/stripe/webhook).
  - Give your webhook a name.
  - (Optional) Add a description for context.

- Retrieve the Signing Secret

  - After creation, you’ll be redirected to the webhook details page.
  - In the “Destination details” section, find the “Signing secret” value and copy it.

- Add to Environment Variables
  - Paste the secret into your `.env` file:

```
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX
```

> ⚠️ Note: Make sure .env is listed in your .gitignore to keep credentials safe.

#### 2.`🛠️ Create API Endpoint for Stripe Webhook`

- Create a new API file (e.g., app/api/stripe/webhook/route.ts for Next.js 13+).
- Set up the handler to:
  - Read the raw request body (required for verifying signature).
  - Verify the event signature using your STRIPE_WEBHOOK_SECRET.
  - Parse the event type and handle accordingly (e.g., checkout.session.completed).
  - Store relevant transaction details in your database.

Example:

```
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false, // Required for Stripe signature verification
  },
};

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature') as string;
  const rawBody = await req.arrayBuffer();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // TODO: Store session details in your database
    console.log('💰 Payment succeeded for session:', session.id);
  }

  return NextResponse.json({ received: true });
}

```

---

## 📚 References

- [Stripe checkout docs](https://docs.stripe.com/payments/checkout)
- [Stripe webhook docs](https://docs.stripe.com/webhooks)
