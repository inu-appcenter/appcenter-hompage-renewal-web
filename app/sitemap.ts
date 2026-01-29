import { MetadataRoute } from 'next';
import { projectApi } from 'entities/project/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://inuappcenter.kr';

  const staticRoutes = ['', '/joinus', '/ourteam'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await projectApi.getAll();
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/project/${project.id}`,
      lastModified: new Date(project.lastModifiedDate || project.createdDate || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }));
  } catch (error) {
    console.error('Failed to fetch projects for sitemap:', error);
  }

  const activityData = [
    { title: '기타활동1', date: '2026/01/06' },
    { title: '기타활동2', date: '2026/02/15' },
    { title: '기타활동3', date: '2026/03/20' }
  ];

  const activityRoutes = activityData.map((activity) => ({
    url: `${baseUrl}/activity/id=${encodeURIComponent(activity.title)}`,
    lastModified: new Date(activity.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  return [...staticRoutes, ...projectRoutes, ...activityRoutes];
}
