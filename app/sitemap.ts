import type { MetadataRoute } from 'next';
import { getSitemapColumnPosts } from '../libs/column';
import { getAbsoluteUrl } from '../libs/site-metadata';

export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 15;

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
  const totalColumnPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const categoryPageEntries = categories.flatMap((category) => {
    const categoryPosts = posts.filter((post) => post.category.id === category.id);
    const totalPages = Math.max(1, Math.ceil(categoryPosts.length / POSTS_PER_PAGE));

    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      url: getAbsoluteUrl(`/column/category/${encodeURIComponent(category.id)}/page/${index + 2}`),
      lastModified: latestPostDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
  });

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
    ...Array.from({ length: totalColumnPages - 1 }, (_, index) => ({
      url: getAbsoluteUrl(`/column/page/${index + 2}`),
      lastModified: latestPostDate,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
    {
      url: getAbsoluteUrl('/roadmap'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: getAbsoluteUrl('/about'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: getAbsoluteUrl('/contact'),
      lastModified: latestPostDate,
      changeFrequency: 'monthly',
      priority: 0.4,
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
    ...categoryPageEntries,
    ...posts.map((post) => ({
      url: getAbsoluteUrl(`/column/${encodeURIComponent(post.id)}`),
      lastModified: getLastModified(post),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
