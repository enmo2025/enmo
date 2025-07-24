import { NextRequest } from 'next/server';
import { prisma } from '~/lib/server/db';

enum EventType {
  MESSAGE = 'message',
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
}

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const event = body.events[0];

  const lineId = event.source.userId;
  const eventType = event.type;

  if (eventType === EventType.FOLLOW) {
    await prisma.user.update({
      where: {
        lineId,
      },
      data: {
        isFriend: true,
      },
    });
  }

  if (eventType === EventType.UNFOLLOW) {
    await prisma.user.update({
      where: {
        lineId,
      },
      data: {
        isFriend: false,
      },
    });
  }

  return Response.json({ message: 'Webhook received' });
};
