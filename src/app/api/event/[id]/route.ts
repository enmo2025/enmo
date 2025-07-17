import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '~/constants/status-code';
import { errorResponse, successResponse, withAuth } from '~/lib/server/utils';
import { getEventById, updateEvent, deleteEvent } from '~/services/serverService/event/event.service';

export const GET = withAuth(async ({ request, context }) => {
  try {
    const id = context?.params?.id;

    if (!id) {
      return NextResponse.json(errorResponse({ message: 'Event not found', status: HTTP_STATUS.NOT_FOUND }));
    }

    const event = await getEventById(id);
    return NextResponse.json(
      successResponse({ message: 'Event fetched successfully', data: event, status: HTTP_STATUS.CREATED })
    );
  } catch (error) {
    console.error('Error getting event by id:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
});

export const PUT = withAuth(async ({ request, context }) => {
  try {
    const id = context?.params?.id;

    if (!id) {
      return NextResponse.json(errorResponse({ message: 'Event not found', status: HTTP_STATUS.NOT_FOUND }));
    }

    const event = await updateEvent(id, await request.json());
    return NextResponse.json(
      successResponse({ message: 'Event updated successfully', data: event, status: HTTP_STATUS.CREATED })
    );
  } catch (error) {
    console.error('Error updating event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
});

export const DELETE = withAuth(async ({ request, context }) => {
  const id = context?.params?.id;

  if (!id) {
    return NextResponse.json(errorResponse({ message: 'Event not found', status: HTTP_STATUS.NOT_FOUND }));
  }

  try {
    const deleted = await deleteEvent(id);
    return NextResponse.json(
      successResponse({ message: 'Event deleted successfully', data: deleted, status: HTTP_STATUS.CREATED })
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(errorResponse({ message: errMsg, status: HTTP_STATUS.INTERNAL_SERVER_ERROR }));
  }
});
