import type {MetadataRoute} from 'next';
import {projects} from '@/content/projects';

const siteUrl = 'https://younass.me';
const locales = ['en', 'fr'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/about', '/experience', '/projects', '/achievements', '/contact'];
  const projectPaths = projects.map((project) => `/projects/${project.slug}`);

  return [...staticPaths, ...projectPaths].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7
    }))
  );
}
