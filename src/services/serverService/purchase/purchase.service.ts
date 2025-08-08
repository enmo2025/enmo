import { prisma } from '~/lib/server/db';

export const createPurchase = async (
  userId: string,
  eventId: string,
  stripeSessionId: string,
  amount: number,
  lineId: string
) => {
  return await prisma.purchase.create({
    data: {
      userId,
      eventId,
      stripeSessionId,
      amount,
      lineId: lineId,
    },
  });
};

export async function getPurchaseByStripeSessionId(sessionId: string) {
  return await prisma.purchase.findUnique({
    where: {
      stripeSessionId: sessionId,
    },
    include: {
      event: true,
      user: true,
    },
  });
}
