import { NextRequest, NextResponse } from 'next/server';
import { getEventById, updateEvent, deleteEvent } from '~/services/clientService/event/event.service';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const event = await getEventById(id);
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error getting event by id:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const event = await updateEvent(id, await req.json());
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error('Error updating event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const deleted = await deleteEvent(id);
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting event:', error);
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 });
  }
}
