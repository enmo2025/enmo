import { NextResponse } from 'next/server';
import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';
import { prisma } from '~/lib/server/db';
import { HTTP_STATUS } from '~/constants/status-code';

export const GET = withAuth(async ({ request, context }) => {
  const id = context?.params?.id;
  if (!id) {
    return NextResponse.json(errorResponse({ message: 'Purchase not found', status: HTTP_STATUS.NOT_FOUND }));
  }
  const purchase = await prisma.purchase.findUnique({
    where: {
      id,
    },
    include: {
      event: true,
      user: true,
    },
  });
  if (!purchase) {
    return NextResponse.json(errorResponse({ message: 'Purchase not found', status: HTTP_STATUS.NOT_FOUND }));
  }
  return NextResponse.json(
    successResponse({ message: 'Purchase fetched successfully', data: purchase, status: HTTP_STATUS.OK })
  );
});
