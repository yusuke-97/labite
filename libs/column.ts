import { client } from './microcms';

export type ImageField = {
  url: string;
  width: number;
  height: number;
};

export type Category = {
  id: string;
  name: string;
};

export type ArticleCard = {
  id: string;
  title: string;
  image: ImageField;
  publishedAt: string;
  category: Category;
};

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
  });

  return data.contents;
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
  });

  return data.contents;
}
