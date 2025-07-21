import { Metadata } from 'next';
import EventDetailPage from '~/components/pages/event/even-detail';

export const metadata: Metadata = {
  title: 'イベント詳細',
  description: 'イベント詳細ページ',
  manifest: '/manifest.json',
  keywords: ['イベント', 'Events', 'Enmo'],
};

export default async function Pages({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailPage id={id} />;
}
