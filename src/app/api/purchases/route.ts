import { NextResponse } from 'next/server';
import { getPagination, successResponse, withAuth } from '~/lib/server/utils';
import { prisma } from '~/lib/server/db';

export const GET = withAuth(async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { skip } = getPagination(Number(page), Number(limit), 100);

  const [purchases, total] = await Promise.all([
    prisma.purchase.findMany({
      skip,
      take: limit,
      include: {
        user: {
          select: {
            fullName: true,
          },
        },
        event: {
          select: {
            title: true,
          },
        },
      },
    }),
    prisma.purchase.count(),
  ]);

  return NextResponse.json(
    successResponse({
      message: 'Purchases fetched successfully',
      data: purchases,
      pagination: {
        page,
        limit,
        total: total,
      },
    })
  );
});

export const POST = withAuth(async ({ request, user }) => {
  const { userId, eventId, stripeSessionId, amount } = await request.json();

  const purchase = await prisma.purchase.create({
    data: { userId, eventId, stripeSessionId, amount, lineId: user.lineId },
  });

  return NextResponse.json(successResponse({ message: 'Purchase created successfully', data: purchase }));
});
