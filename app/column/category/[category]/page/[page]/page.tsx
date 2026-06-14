import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ColumnArchive } from '../../../../../../components/ColumnArchive';
import {
  getColumnCategoryCounts,
  getColumnPostsByCategoryPage,
} from '../../../../../../libs/column';
import { ogImage, withSiteName } from '../../../../../../libs/site-metadata';

const POSTS_PER_PAGE = 15;

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    category: string;
    page: string;
  }>;
};

function parsePageNumber(value: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page: value } = await params;
  const categorySlug = decodeURIComponent(category);
  const page = parsePageNumber(value);

  if (!page || page === 1) {
    return {};
  }

  const { totalCount, category: currentCategory } = await getColumnPostsByCategoryPage(
    categorySlug,
    1,
    1,
  );

  if (totalCount === 0) {
    notFound();
  }

  const categoryName = currentCategory?.name ?? categorySlug;
  const title = withSiteName(`${categoryName}の記事一覧 ${page}ページ目`);
  const description = `${categoryName}の記事一覧の${page}ページ目です。`;
  const canonical = `/column/category/${encodeURIComponent(categorySlug)}/page/${page}`;

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

export default async function ColumnCategoryPagedPage({ params }: Props) {
  const { category, page: value } = await params;
  const categorySlug = decodeURIComponent(category);
  const currentPage = parsePageNumber(value);
  const base = `/column/category/${encodeURIComponent(categorySlug)}`;

  if (!currentPage) {
    notFound();
  }

  if (currentPage === 1) {
    redirect(base);
  }

  const [{ posts, totalCount, category: currentCategory }, categories] = await Promise.all([
    getColumnPostsByCategoryPage(categorySlug, currentPage, POSTS_PER_PAGE),
    getColumnCategoryCounts(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  if (totalCount === 0 || currentPage > totalPages) {
    notFound();
  }

  return (
    <ColumnArchive
      posts={posts}
      categories={categories}
      totalCount={totalCount}
      currentPage={currentPage}
      totalPages={totalPages}
      currentCategoryId={currentCategory?.id ?? categorySlug}
      currentCategoryName={currentCategory?.name ?? categorySlug}
    />
  );
}
