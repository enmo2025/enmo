import { HTTP_STATUS } from '~/constants/status-code';
import { getCurrentSession } from './auth/session';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@prisma/client';
import { Pagination } from '~/services/clientService/interface';

export const successResponse = <T>({
  message,
  data,
  status = HTTP_STATUS.OK,
  pagination,
}: {
  message: string;
  data: T;
  status?: number;
  pagination?: Pagination;
}) => {
  return {
    success: true,
    status,
    message,
    data,
    pagination,
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

interface ArgWithAuth {
  request: NextRequest;
  user: User;
  context?: { params: { [key: string]: string } };
}

export function withAuth(handler: (args: ArgWithAuth) => Promise<Response>) {
  return async (request: NextRequest, context?: any) => {
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

    const params =
      context?.params && typeof context.params.then === 'function' ? await context.params : context?.params;

    return handler({ request, user, context: { ...context, params } });
  };
}

export const getPagination = (page: number, limit: number, total: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};
