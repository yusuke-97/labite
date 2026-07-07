import type { Metadata } from 'next';
import { ColumnArchive } from '../../components/ColumnArchive';
import { getColumnCategoryCounts, getColumnPostsPage } from '../../libs/column';
import { ogImage, withSiteName } from '../../libs/site-metadata';

const POSTS_PER_PAGE = 15;

export const revalidate = 3600;

const title = withSiteName('Webエンジニア向け記事一覧');
const description =
  '未経験からWebエンジニアを目指す方向けの記事一覧です。学習法・未経験・キャリアの3カテゴリから、今の悩みに合う記事を探せます。何から読むか迷ったらロードマップへ。';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/column',
  },
  openGraph: {
    title,
    description,
    url: '/column',
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage.url],
  },
};

export default async function ColumnPage() {
  const [{ posts, totalCount }, categories] = await Promise.all([
    getColumnPostsPage(1, POSTS_PER_PAGE),
    getColumnCategoryCounts(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  return (
    <ColumnArchive
      posts={posts}
      categories={categories}
      totalCount={totalCount}
      currentPage={1}
      totalPages={totalPages}
    />
  );
}
