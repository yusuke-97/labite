import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ColumnArchive } from '../../../../components/ColumnArchive';
import {
  getColumnCategoryCounts,
  getColumnPostsByCategoryPage,
} from '../../../../libs/column';
import { ogImage, withSiteName } from '../../../../libs/site-metadata';

const POSTS_PER_PAGE = 15;

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

function getPageNumber(page?: string) {
  if (!page) {
    return 1;
  }

  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return null;
  }

  return pageNumber;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string;
  }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categorySlug = decodeURIComponent(category);
  const { totalCount, category: currentCategory } = await getColumnPostsByCategoryPage(
    categorySlug,
    1,
    1,
  );

  if (totalCount === 0) {
    notFound();
  }

  const categoryName = currentCategory?.name ?? categorySlug;
  const title = withSiteName(`${categoryName}の記事一覧`);
  const description = `${categoryName}に関する記事一覧です。未経験からWebエンジニアを目指す方に向けて、学習や開発、キャリアに役立つ情報をまとめています。`;
  const canonical = `/column/category/${encodeURIComponent(categorySlug)}`;
  const metaTitle = currentCategory?.metaTitle ?? title;
  const metaDescription = currentCategory?.metaDescription ?? description;

  return {
    title: {
      absolute: metaTitle,
    },
    description: metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonical,
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage.url],
    },
  };
}

export default async function ColumnCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;
  const categorySlug = decodeURIComponent(category);

  if (page) {
    const legacyPage = getPageNumber(page);
    const base = `/column/category/${encodeURIComponent(categorySlug)}`;

    redirect(legacyPage && legacyPage > 1 ? `${base}/page/${legacyPage}` : base);
  }

  const [{ posts, totalCount, category: currentCategory }, categories] = await Promise.all([
    getColumnPostsByCategoryPage(categorySlug, 1, POSTS_PER_PAGE),
    getColumnCategoryCounts(),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  if (totalCount === 0) {
    notFound();
  }

  const categoryName = currentCategory?.name ?? categorySlug;

  return (
    <ColumnArchive
      posts={posts}
      categories={categories}
      totalCount={totalCount}
      currentPage={1}
      totalPages={totalPages}
      currentCategoryId={currentCategory?.id ?? categorySlug}
      currentCategoryName={categoryName}
      currentCategoryLead={currentCategory?.lead}
    />
  );
}
