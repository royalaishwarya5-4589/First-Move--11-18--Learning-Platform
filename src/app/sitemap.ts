import { MetadataRoute } from 'next';
import { pythonPath } from '@/content/python-path';
import { getSiteBaseUrl } from '@/lib/urlUtils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteBaseUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/paths`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/paths/python`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Lesson pages
  const lessonRoutes: MetadataRoute.Sitemap = pythonPath.modules.flatMap((m) =>
    m.lessons.map((les) => ({
      url: `${baseUrl}/paths/python/lessons/${les.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Project pages
  const projectRoutes: MetadataRoute.Sitemap = (pythonPath.projects || []).map((proj) => ({
    url: `${baseUrl}/paths/python/projects/${proj.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...lessonRoutes, ...projectRoutes];
}
