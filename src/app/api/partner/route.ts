import { HTTP_STATUS } from '~/constants/status-code';
import { errorResponse, successResponse } from '~/lib/server/utils';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/server/db';

export const GET = async () => {
  try {
    const data = await prisma.partner.findMany();

    return NextResponse.json(
      successResponse({
        message: 'Partners fetched successfully',
        data,
        status: HTTP_STATUS.CREATED,
      })
    );
  } catch (error) {
    console.error('Error getting partners:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const partner = await prisma.partner.create({
      data: body,
    });
    return NextResponse.json(
      successResponse({
        message: 'Partner created successfully',
        data: partner,
        status: HTTP_STATUS.CREATED,
      }),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    console.error('Error creating partner:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
};
