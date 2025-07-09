export const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig = (locale: string = 'en') => ({
  name: 'Emmo',
  url: siteUrl + '/' + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
});

export type SiteConfig = typeof siteConfig;
