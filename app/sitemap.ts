import type { MetadataRoute } from 'next';
import { getSitemapColumnPosts } from '../libs/column';
import { getAbsoluteUrl } from '../libs/site-metadata';

export const dynamic = 'force-dynamic';

function getLastModified(post: {
  revisedAt?: string;
  updatedAt?: string;
  publishedAt: string;
}) {
  return post.revisedAt ?? post.updatedAt ?? post.publishedAt;
}

function getLatestDate(dates: string[]) {
  const latestTime = dates
    .map((date) => new Date(date).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => b - a)[0];

  return latestTime ? new Date(latestTime) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getSitemapColumnPosts();
  const categories = Array.from(
    new Map(posts.map((post) => [post.category.id, post.category])).values(),
  );
  const latestPostDate = getLatestDate(posts.map(getLastModified));

  return [
    {
      url: getAbsoluteUrl('/'),
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: getAbsoluteUrl('/column'),
      lastModified: latestPostDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: getAbsoluteUrl('/privacy-policy'),
      lastModified: new Date('2026-06-06'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...categories.map((category) => ({
      url: getAbsoluteUrl(`/column/category/${encodeURIComponent(category.id)}`),
      lastModified: latestPostDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: getAbsoluteUrl(`/column/${encodeURIComponent(post.id)}`),
      lastModified: getLastModified(post),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
