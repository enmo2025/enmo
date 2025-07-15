import { NextResponse } from 'next/server';
import { createEvent } from '~/services/clientService/event/event.service';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const event = await createEvent(body);
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error(error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
};
