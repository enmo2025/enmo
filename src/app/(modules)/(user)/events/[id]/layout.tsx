import React from 'react';
import { stripHtmlTags } from '~/lib/utils';
import { getEvent } from '~/services/clientService/event/event.api';

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getEvent(id);
  const eventDetail = data.data;
  const description = stripHtmlTags(eventDetail.description);
  return {
    title: eventDetail.title,
    description: description,
    openGraph: {
      title: eventDetail.title,
      description: description,
      images: [eventDetail.eventBanner],
      type: 'website',
    },
    twitter: {
      title: eventDetail.title,
      description: description,
      images: [eventDetail.eventBanner],
      card: 'summary_large_image',
    },
  };
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
