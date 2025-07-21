import { del, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!req.body) {
    return NextResponse.json({ error: 'File body is required' }, { status: 400 });
  }

  const blob = await put(filename, req.body, {
    access: 'public',
  });

  return NextResponse.json(blob);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  await del(filename);

  return NextResponse.json({ message: 'File deleted successfully' });
}
