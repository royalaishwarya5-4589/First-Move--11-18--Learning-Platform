import { MetadataRoute } from 'next';
import { getSiteBaseUrl } from '@/lib/urlUtils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/auth/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
