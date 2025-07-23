import { successResponse } from '~/lib/server/utils';
import { prisma } from '~/lib/server/db';
import { HTTP_STATUS } from '~/constants/status-code';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = await params;

  const userData = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return Response.json(
    successResponse({
      data: userData,
      message: 'User fetched successfully',
      status: HTTP_STATUS.OK,
    }),
    {
      status: HTTP_STATUS.OK,
    }
  );
};
