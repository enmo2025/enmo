import { type MetadataRoute } from 'next';
import { siteUrl } from '~/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/api/', '/admin/', '/profile/setting/', '/payment/', '/register/basic-info', '/delete-account/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
