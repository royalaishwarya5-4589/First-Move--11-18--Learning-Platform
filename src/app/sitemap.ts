import { MetadataRoute } from 'next';
import { getAllPaths, getPathBySlug } from '@/content';
import { sampleAssessments } from '@/content/assessments-data';
import { getSiteBaseUrl } from '@/lib/urlUtils';
import { Path } from '@/types/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteBaseUrl();
  const lastModified = new Date();

  // 1. Static Educational Hub Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/paths`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/assessment`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 2. Course Pages (All active educational paths)
  const allPaths = getAllPaths();
  const courseRoutes: MetadataRoute.Sitemap = allPaths.map((path) => ({
    url: `${baseUrl}/paths/${path.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Lesson & Project Pages across all active curriculum courses
  const lessonRoutes: MetadataRoute.Sitemap = [];
  const projectRoutes: MetadataRoute.Sitemap = [];

  for (const pathSummary of allPaths) {
    const fullPath = getPathBySlug(pathSummary.slug);
    if (fullPath && 'modules' in fullPath) {
      const path = fullPath as Path;

      // Extract all lessons
      for (const mod of path.modules || []) {
        for (const les of mod.lessons || []) {
          lessonRoutes.push({
            url: `${baseUrl}/paths/${path.slug}/lessons/${les.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          });
        }
      }

      // Extract all projects
      for (const proj of path.projects || []) {
        projectRoutes.push({
          url: `${baseUrl}/paths/${path.slug}/projects/${proj.slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        });
      }
    }
  }

  // 4. Course Certification Assessment Landing Pages
  const assessmentRoutes: MetadataRoute.Sitemap = sampleAssessments.map((a) => ({
    url: `${baseUrl}/paths/${a.pathSlug}/assessments/${a.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...courseRoutes,
    ...lessonRoutes,
    ...projectRoutes,
    ...assessmentRoutes,
  ];
}
