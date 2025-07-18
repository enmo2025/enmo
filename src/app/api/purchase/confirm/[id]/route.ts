import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';
import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '~/constants/status-code';
import { prisma } from '~/lib/server/db';
import { lineService } from '~/services/serverService/lines/line.service';
import messageTemplate from '~/constants/message-template';

const POST = withAuth(async ({ context, user }) => {
  const id = await context?.params?.id;
  if (!id) {
    return NextResponse.json(errorResponse({ message: 'Purchase not found', status: HTTP_STATUS.NOT_FOUND }));
  }
  const purchase = await prisma.purchase.update({
    where: { id },
    data: { isConfirmed: true },
  });

  if (user.lineId) {
    lineService
      .sendMessage(user.lineId, [
        {
          type: 'text',
          text: messageTemplate(user).confirmPurchase.text,
        },
      ])
      .catch((error) => console.error('Failed to send LINE welcome message:', error));
  }

  return NextResponse.json(successResponse({ message: 'Purchase confirmed successfully', data: purchase }));
});

export { POST };
