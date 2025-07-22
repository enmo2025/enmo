import { type MetadataRoute } from 'next';
import { siteUrl } from '~/config/site';
import { getAllEventIds } from '~/services/serverService/event/event.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all event IDs for dynamic URLs
  const eventIds = await getAllEventIds();

  // Static URLs (public pages)
  const staticUrls = [
    { url: siteUrl || '', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 }, // Home
    { url: `${siteUrl}/login`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/register`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    {
      url: `${siteUrl}/register/basic-info`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    { url: `${siteUrl}/events`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${siteUrl}/profile`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteUrl}/profile/info`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    {
      url: `${siteUrl}/profile/term-of-use`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${siteUrl}/delete-account/confirm`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2,
    },
    {
      url: `${siteUrl}/delete-account/success`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.2,
    },
  ];

  // Dynamic event URLs
  const eventUrls = (eventIds as { id: string }[]).map(({ id }) => ({
    url: `${siteUrl}/events/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticUrls, ...eventUrls];
}
