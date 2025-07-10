import { HTTP_STATUS } from '~/constants/status-code';
import { getCurrentSession } from './auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';

export const successResponse = <T>({
  message,
  data,
  status = HTTP_STATUS.OK,
}: {
  message: string;
  data: T;
  status?: number;
}) => {
  return {
    success: true,
    status,
    message,
    data,
  };
};

export const errorResponse = <T>({
  message,
  status = HTTP_STATUS.BAD_REQUEST,
}: {
  message: string;
  status?: number;
}) => {
  return {
    success: false,
    status,
    message,
  };
};

export function withAuth(handler: (request: NextRequest, user: User) => Promise<Response>) {
  return async (request: NextRequest) => {
    const { session, user } = await getCurrentSession();

    if (!session || !user) {
      return NextResponse.json(
        errorResponse({
          message: 'Unauthorized. Please log in first.',
          status: HTTP_STATUS.UNAUTHORIZED,
        }),
        { status: HTTP_STATUS.UNAUTHORIZED }
      );
    }

    return handler(request, user);
  };
}
