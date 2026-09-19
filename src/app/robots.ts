import { MetadataRoute } from 'next';
import { getSiteBaseUrl } from '@/lib/urlUtils';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/progress',
        '/learning-path',
        '/assessment/quiz',
        '/assessment/result',
        '/assessment/interest',
        '/auth/',
        '/api/',
        '/login',
        '/signup',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
