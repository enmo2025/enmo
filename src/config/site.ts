export const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig = () => ({
  name: 'Enmo',
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
});

export type SiteConfig = typeof siteConfig;
