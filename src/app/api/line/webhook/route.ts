import { NextRequest } from 'next/server';
import { prisma } from '~/lib/server/db';

enum EventType {
  MESSAGE = 'message',
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
}

// docs: https://developers.line.biz/en/docs/messaging-api/receiving-messages
export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const event = body.events[0];

  const lineId = event.source.userId;
  const eventType = event.type;

  switch (eventType) {
    case EventType.FOLLOW:
      await prisma.user.update({
        where: {
          lineId,
        },
        data: {
          isFriend: true,
        },
      });
      break;
    case EventType.UNFOLLOW:
      await prisma.user.update({
        where: {
          lineId,
        },
        data: {
          isFriend: false,
        },
      });
      break;
    case EventType.MESSAGE:
      await prisma.purchase.update({
        where: {
          id: event.message.id,
        },
        data: {
          isReplied: true,
        },
      });
      break;
    // Add more cases later
    default:
      break;
  }

  return Response.json({ message: 'Webhook received' });
};
