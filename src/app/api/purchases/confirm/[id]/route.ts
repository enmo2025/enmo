import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';
import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '~/constants/status-code';
import { prisma } from '~/lib/server/db';
import { lineService } from '~/services/serverService/lines/line.service';

const POST = withAuth(async ({ context, request }) => {
  const id = await context?.params?.id;
  const body = await request.json();

  if (!id) {
    return NextResponse.json(errorResponse({ message: 'Purchase not found', status: HTTP_STATUS.NOT_FOUND }), {
      status: HTTP_STATUS.NOT_FOUND,
    });
  }
  if (!body.lineId) {
    return NextResponse.json(errorResponse({ message: 'Line ID not found', status: HTTP_STATUS.NOT_FOUND }), {
      status: HTTP_STATUS.NOT_FOUND,
    });
  }

  const purchase = await prisma.purchase.update({
    where: { id },
    data: { isConfirmed: true },
    include: {
      user: true,
    },
  });

  lineService
    .sendMessage(body.lineId, [
      {
        type: 'text',
        text: body.message,
      },
    ])
    .catch((error) => console.error('Failed to send LINE welcome message:', error));

  return NextResponse.json(successResponse({ message: 'Purchase confirmed successfully', data: purchase }));
});

export { POST };
