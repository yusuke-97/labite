import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ColumnArchive } from '../../../../components/ColumnArchive';
import { getColumnCategoryCounts, getColumnPostsPage } from '../../../../libs/column';
import { ogImage, withSiteName } from '../../../../libs/site-metadata';

const POSTS_PER_PAGE = 15;

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    page: string;
  }>;
};

function parsePageNumber(value: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: value } = await params;
  const page = parsePageNumber(value);

  if (!page || page === 1) {
    return {};
  }

  const title = withSiteName(`Webエンジニア向け記事一覧 ${page}ページ目`);
  const description = `Webエンジニア向け記事一覧の${page}ページ目です。未経験からWebエンジニアを目指す方に向けて、プログラミング学習やWeb開発、キャリアに関する記事をまとめています。`;
  const canonical = `/column/page/${page}`;

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
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
}

export default async function ColumnPagedPage({ params }: Props) {
  const { page: value } = await params;
  const currentPage = parsePageNumber(value);

  if (!currentPage) {
    notFound();
  }

  if (currentPage === 1) {
    redirect('/column');
  }

  const [{ posts, totalCount }, categories] = await Promise.all([
    getColumnPostsPage(currentPage, POSTS_PER_PAGE),
    getColumnCategoryCounts(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  if (currentPage > totalPages) {
    notFound();
  }

  return (
    <ColumnArchive
      posts={posts}
      categories={categories}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
