import { del, put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const filename = formData.get('filename');
  const file = formData.get('file');

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const blob = await put(filename as string, file as File, {
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
