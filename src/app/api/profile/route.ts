import { User } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { HTTP_STATUS } from '~/constants/status-code';
import { prisma } from '~/lib/server/db';
import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';

export const PUT = withAuth(async (request: NextRequest, user: User) => {
  try {
    const body = await request.json();

    const { fullName, fullNameKana, dateOfBirth, gender, prefectures } = body;

    const dateOfBirthDate = new Date(dateOfBirth);

    const genderEnum = gender.toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER';

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fullName,
        fullNameKana,
        dateOfBirth: dateOfBirthDate,
        gender: genderEnum,
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
