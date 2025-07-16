import { NextRequest, NextResponse } from 'next/server';
import { getPagination, successResponse } from '~/lib/server/utils';
import { prisma } from '~/lib/server/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { skip } = getPagination(Number(page), Number(limit), 100);

  const purchases = await prisma.purchase.findMany({
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
  });

  return NextResponse.json(
    successResponse({
      message: 'Purchases fetched successfully',
      data: purchases,
      pagination: {
        page,
        limit,
        total: purchases.length,
      },
    })
  );
}
