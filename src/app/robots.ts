import { type MetadataRoute } from 'next';
import { siteUrl } from '~/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/events', '/events/:id'],
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/profile/setting',
          '/profile/setting/',
          '/payment',
          '/payment/',
          '/register/basic-info',
          '/delete-account/confirm',
          '/delete-account/success',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
