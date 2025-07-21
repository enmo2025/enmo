import { NextRequest, NextResponse } from 'next/server';
import { createEvent, getEvents } from '~/services/serverService/event/event.service';
import { HTTP_STATUS } from '~/constants/status-code';
import { errorResponse, getPagination, successResponse, withAuth } from '~/lib/server/utils';

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const { skip } = getPagination(Number(page), Number(limit), 100);
    const { data, total } = await getEvents(skip, limit);

    return NextResponse.json(
      successResponse({
        message: 'Events fetched successfully',
        data,
        status: HTTP_STATUS.CREATED,
        pagination: {
          page,
          limit,
          total: total,
        },
      })
    );
  } catch (error) {
    console.error('Error getting events:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
};

export const POST = withAuth(async ({ request }) => {
  try {
    const body = await request.json();
    const event = await createEvent(body);
    return NextResponse.json(
      successResponse({ message: 'Event created successfully', data: event, status: HTTP_STATUS.CREATED })
    );
  } catch (error) {
    console.error('Error creating event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
});
