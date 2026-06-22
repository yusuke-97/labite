import { client } from './microcms';

export type ImageField = {
  url: string;
  width: number;
  height: number;
};

export type Category = {
  id: string;
  name: string;
  lead?: string;
  metaTitle: string;
  metaDescription: string;
};

export type ArticleCard = {
  id: string;
  title: string;
  image: ImageField;
  publishedAt: string;
  category: Category;
};

export type SitemapColumnPost = {
  id: string;
  publishedAt: string;
  revisedAt?: string;
  updatedAt?: string;
  category: Category;
};

export type PaginatedColumnPosts = {
  posts: ArticleCard[];
  totalCount: number;
  category?: Category;
};

export type ColumnCategoryCount = {
  category: Category;
  count: number;
};

type PopularPostsContent = {
  post: ArticleCard[];
  order: number;
};

const noStoreRequestInit = {
  cache: 'no-store',
} satisfies RequestInit;

export async function getColumnCategories(): Promise<Category[]> {
  const posts = await client.getAllContents<ArticleCard>({
    endpoint: 'column',
    queries: {
      fields: 'category',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });
  const categories = new Map<string, Category>();

  posts.forEach((post) => {
    categories.set(post.category.id, post.category);
  });

  return Array.from(categories.values());
}

export async function getColumnCategoryCounts(): Promise<ColumnCategoryCount[]> {
  const posts = await client.getAllContents<ArticleCard>({
    endpoint: 'column',
    queries: {
      fields: 'category',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });
  const counts = new Map<string, ColumnCategoryCount>();

  posts.forEach((post) => {
    const current = counts.get(post.category.id);
    counts.set(post.category.id, {
      category: post.category,
      count: (current?.count ?? 0) + 1,
    });
  });

  return Array.from(counts.values());
}

export async function getSitemapColumnPosts(): Promise<SitemapColumnPost[]> {
  return client.getAllContents<SitemapColumnPost>({
    endpoint: 'column',
    queries: {
      fields: 'id,publishedAt,revisedAt,updatedAt,category',
      orders: '-publishedAt',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });
}

export async function getColumnPostsPage(
  page: number,
  limit: number,
): Promise<PaginatedColumnPosts> {
  const data = await client.get({
    endpoint: 'column',
    queries: {
      fields: 'id,title,image,publishedAt,category',
      limit,
      offset: (page - 1) * limit,
      orders: '-publishedAt',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });

  return {
    posts: data.contents,
    totalCount: data.totalCount,
  };
}

export async function getColumnPostsByCategoryPage(
  categorySlug: string,
  page: number,
  limit: number,
): Promise<PaginatedColumnPosts> {
  const posts = await client.getAllContents<ArticleCard>({
    endpoint: 'column',
    queries: {
      fields: 'id,title,image,publishedAt,category',
      orders: '-publishedAt',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });
  const filteredPosts = posts.filter(
    (post) => post.category.id === categorySlug || post.category.name === categorySlug,
  );

  return {
    posts: filteredPosts.slice((page - 1) * limit, page * limit),
    totalCount: filteredPosts.length,
    category: filteredPosts[0]?.category,
  };
}

export async function getLatestColumnPosts(excludeId?: string): Promise<ArticleCard[]> {
  const data = await client.get({
    endpoint: 'column',
    queries: {
      fields: 'id,title,image,publishedAt,category',
      filters: excludeId ? `id[not_equals]${excludeId}` : undefined,
      limit: 4,
      orders: '-publishedAt',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });

  return data.contents;
}

export async function getRecommendedColumnPosts(): Promise<ArticleCard[]> {
  const data = await client.get({
    endpoint: 'popular-posts',
    queries: {
      fields: 'post,order',
      orders: 'order',
      limit: 4,
      depth: 2,
    },
    customRequestInit: noStoreRequestInit,
  });

  const contents = data.contents as PopularPostsContent[];
  return contents.flatMap((content) => content.post).slice(0, 4);
}

export async function getRelatedColumnPosts(
  currentId: string,
  categoryId: string,
): Promise<ArticleCard[]> {
  const data = await client.get({
    endpoint: 'column',
    queries: {
      fields: 'id,title,image,publishedAt,category',
      filters: `category[equals]${categoryId}[and]id[not_equals]${currentId}`,
      limit: 4,
      orders: '-publishedAt',
      depth: 1,
    },
    customRequestInit: noStoreRequestInit,
  });

  return data.contents;
}
