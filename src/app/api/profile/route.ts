import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { HTTP_STATUS } from '~/constants/status-code';
import { prisma } from '~/lib/server/db';
import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';
import dayjs from 'dayjs';
import { getCurrentSession } from '~/lib/server/auth/session';
import { omit } from '~/lib/utils';

export const PUT = withAuth(async (request: NextRequest, user: User) => {
  try {
    const body = await request.json();

    const { fullName, fullNameKana, dateOfBirth, gender, prefectures } = body;

    const dateOfBirthDate = dayjs(dateOfBirth);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fullName,
        fullNameKana,
        dateOfBirth: dateOfBirthDate.toDate(),
        gender: gender.toUpperCase(),
        prefectures,
      },
    });

    revalidatePath('/', 'layout');

    return NextResponse.json(
      successResponse({ message: 'Basic information updated successfully', data: updatedUser }),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    console.error('Error updating basic info:', error);
    return NextResponse.json(
      errorResponse({ message: 'Internal server error', status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    );
  }
});

export const DELETE = withAuth(async () => {
  try {
    const { user } = await getCurrentSession();

    if (!user) {
      return NextResponse.json(errorResponse({ message: 'User not found', status: HTTP_STATUS.NOT_FOUND }), {
        status: HTTP_STATUS.NOT_FOUND,
      });
    }

    await prisma.user.delete({
      where: { id: user?.id ?? '' },
    });

    const userDeletionLog = omit(user, ['id', 'createdAt', 'updatedAt']);
    await prisma.userDeletionLog.create({
      data: {
        originalUserId: user.id,
        ...userDeletionLog,
      },
    });

    return NextResponse.json(successResponse({ message: 'Account deleted successfully', data: null }), {
      status: HTTP_STATUS.OK,
    });
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json(
      errorResponse({ message: 'Internal server error', status: HTTP_STATUS.INTERNAL_SERVER_ERROR })
    );
  }
});
