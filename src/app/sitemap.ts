import { type MetadataRoute } from 'next';
import { siteUrl } from '~/config/site';
import { getAllEventIds } from '~/services/serverService/event/event.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all event IDs for dynamic URLs
  const eventIds = await getAllEventIds();

  // Static URLs (public pages)
  const staticUrls = [
    { url: siteUrl || '', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 }, // Home
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
  ];

  // Dynamic event URLs
  const eventUrls = (eventIds as { id: string }[]).map(({ id }) => ({
    url: `${siteUrl}/events/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  return [...staticUrls, ...eventUrls];
}
