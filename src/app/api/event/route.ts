import { NextResponse } from 'next/server';
import { createEvent, getEvents } from '~/services/clientService/event/event.service';

export const GET = async (req: Request) => {
  try {
    const events = await getEvents();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error('Error getting events:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const event = await createEvent(body);
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error creating event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
};
