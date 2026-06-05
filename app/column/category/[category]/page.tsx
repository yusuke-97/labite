import type { Metadata } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getColumnPostsByCategoryPage } from '../../../../libs/column';
import { ogImage, withSiteName } from '../../../../libs/site-metadata';

const POSTS_PER_PAGE = 10;

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

function buildPageHref(categorySlug: string, page: number) {
  const categoryPath = encodeURIComponent(categorySlug);
  return page === 1
    ? `/column/category/${categoryPath}`
    : `/column/category/${categoryPath}?page=${page}`;
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

export default async function ColumnCategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page } = await searchParams;
  const categorySlug = decodeURIComponent(category);
  const currentPage = getPageNumber(page);

  if (!currentPage) {
    notFound();
  }

  const { posts, totalCount, category: currentCategory } = await getColumnPostsByCategoryPage(
    categorySlug,
    currentPage,
    POSTS_PER_PAGE,
  );
  const totalPages = Math.max(1, Math.ceil(totalCount / POSTS_PER_PAGE));

  if (totalCount === 0 || currentPage > totalPages) {
    notFound();
  }

  const categoryName = currentCategory?.name ?? categorySlug;

  return (
    <main className="mx-auto w-full max-w-7xl px-10 py-20 max-lg:px-6 max-lg:py-12 max-sm:px-4 max-sm:py-10">
      <nav className="mb-10 overflow-x-auto text-sm leading-normal whitespace-nowrap" aria-label="breadcrumb">
        <ol className="m-0 flex w-max min-w-full list-none p-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href="/" className="text-[#1496A0] underline hover:opacity-80" itemProp="item">
              <span itemProp="name">TOP</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span className="mx-3.5 h-0 w-0 border-y-[6px] border-l-[6px] border-y-transparent border-l-[#111]" aria-hidden="true" />
            <Link href="/column" className="text-[#1496A0] underline hover:opacity-80" itemProp="item">
              <span itemProp="name">お役立ち記事一覧</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <span className="mx-3.5 h-0 w-0 border-y-[6px] border-l-[6px] border-y-transparent border-l-[#111]" aria-hidden="true" />
            <span itemProp="name">{categoryName}の記事一覧</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>
      <header className="mb-12">
        <p className="mb-3 text-sm leading-normal font-bold tracking-normal text-[#1496A0]">COLUMN</p>
        <h1 className="m-0 text-4xl leading-normal font-bold max-sm:text-3xl">{categoryName}の記事一覧</h1>
      </header>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/column/${post.id}`}
            className="group overflow-hidden border border-[#1496A0]/20 bg-white text-inherit no-underline shadow-[0_10px_30px_rgba(17,17,17,0.06)] transition-transform hover:-translate-y-1"
          >
            <div className="aspect-[3/2] w-full overflow-hidden">
              <Image
                src={post.image.url}
                width={post.image.width}
                height={post.image.height}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-start gap-3 p-6 max-sm:p-4">
              <span className="rounded-full bg-[#1496A0] px-4 py-1 text-xs leading-normal font-bold text-white">
                {post.category.name}
              </span>
              <h2 className="m-0 text-xl leading-normal font-bold group-hover:text-[#1496A0] group-hover:underline">
                {post.title}
              </h2>
              <time className="text-sm leading-normal text-[#666]" dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format('YYYY.MM.DD')}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="mt-12 flex items-center justify-center gap-2" aria-label="ページネーション">
          {currentPage > 1 ? (
            <Link
              href={buildPageHref(categorySlug, currentPage - 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#1496A0]/30 px-4 text-sm leading-normal font-bold no-underline transition-colors hover:bg-[#1496A0] hover:text-white"
            >
              前へ
            </Link>
          ) : (
            <span className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#ddd] px-4 text-sm leading-normal font-bold text-[#999]">
              前へ
            </span>
          )}

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={buildPageHref(categorySlug, pageNumber)}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={`inline-flex h-11 w-11 items-center justify-center border text-sm leading-normal font-bold no-underline transition-colors ${
                pageNumber === currentPage
                  ? 'border-[#1496A0] bg-[#1496A0] text-white'
                  : 'border-[#1496A0]/30 bg-white text-inherit hover:bg-[#1496A0] hover:text-white'
              }`}
            >
              {pageNumber}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={buildPageHref(categorySlug, currentPage + 1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#1496A0]/30 px-4 text-sm leading-normal font-bold no-underline transition-colors hover:bg-[#1496A0] hover:text-white"
            >
              次へ
            </Link>
          ) : (
            <span className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[#ddd] px-4 text-sm leading-normal font-bold text-[#999]">
              次へ
            </span>
          )}
        </nav>
      )}
    </main>
  );
}
