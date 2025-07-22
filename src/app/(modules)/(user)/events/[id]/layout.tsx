// app/events/[id]/layout.tsx
import { stripHtmlTags } from '~/lib/utils';
import { getEvent } from '~/services/clientService/event/event.api';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  const description = stripHtmlTags(eventDetail.description || '');

  return {
    title: eventDetail.title,
    description,
    openGraph: {
      title: eventDetail.title,
      description,
      images: [eventDetail.eventBanner],
      type: 'website',
    },
    twitter: {
      title: eventDetail.title,
      description,
      images: [eventDetail.eventBanner],
      card: 'summary_large_image',
    },
  };
}

export default function EventLayout({ children }: Props) {
  return <>{children}</>;
}
