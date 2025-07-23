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
