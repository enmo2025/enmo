import { NextResponse } from 'next/server';
import { prisma } from '~/lib/server/db';
import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';

export const GET = withAuth(async ({ context }) => {
  const sessionId = context?.params?.id;
  if (!sessionId) {
    return NextResponse.json(errorResponse({ message: 'Session ID is required', status: 400 }));
  }
  const purchase = await prisma.purchase.findUnique({
    where: {
      stripeSessionId: sessionId,
    },
    include: {
      event: true,
      user: true,
    },
  });
  if (!purchase) {
    return NextResponse.json(errorResponse({ message: 'Purchase not found', status: 404 }));
  }
  return NextResponse.json(successResponse({ message: 'Purchase fetched successfully', data: purchase }));
});
