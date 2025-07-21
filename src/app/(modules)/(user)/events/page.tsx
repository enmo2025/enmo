import { Metadata } from 'next';
import EventsPage from '~/components/pages/event';

export const metadata: Metadata = {
  title: 'イベント',
  description: 'イベントページ',
  manifest: '/manifest.json',
  keywords: ['イベント', 'Events', 'Enmo'],
};

export default async function pages() {
  return <EventsPage />;
}
