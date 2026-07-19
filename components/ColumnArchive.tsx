import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleCard, ColumnCategoryCount } from '../libs/column';
import {
  createBreadcrumbListJsonLd,
  createItemListJsonLd,
} from '../libs/structured-data';
import { ArrowIcon } from './ArrowIcon';
import { TrackedContactLink } from './TrackedContactLink';
import {
  yellowPillArrowClass,
  yellowPillClass,
} from './site-design';

type Props = {
  posts: ArticleCard[];
  categories: ColumnCategoryCount[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  currentCategoryId?: string;
  currentCategoryName?: string;
  currentCategoryLead?: string;
};

const innerClass = 'mx-auto w-full max-w-280 px-6';

function buildPageHref(page: number, categoryId?: string) {
  const base = categoryId
    ? `/column/category/${encodeURIComponent(categoryId)}`
    : '/column';
  return page === 1 ? base : `${base}/page/${page}`;
}

function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);
  return Array.from(pages)
    .filter((page) => page > 0 && page <= totalPages)
    .sort((a, b) => a - b);
}

export function ColumnArchive({
  posts,
  categories,
  totalCount,
  currentPage,
  totalPages,
  currentCategoryId,
  currentCategoryName,
  currentCategoryLead,
}: Props) {
  const heading = currentCategoryName
    ? `${currentCategoryName}の記事一覧`
    : 'お役立ち記事一覧';
  const visiblePages = getVisiblePages(currentPage, totalPages);
  const currentPath = buildPageHref(currentPage, currentCategoryId);
  const currentPageLabel = `${currentPage}ページ目`;
  const breadcrumbItems = currentCategoryName
    ? [
        { name: 'TOP', path: '/' },
        { name: 'お役立ち記事一覧', path: '/column' },
        {
          name: heading,
          path: currentPage > 1
            ? `/column/category/${encodeURIComponent(currentCategoryId ?? currentCategoryName)}`
            : currentPath,
        },
        ...(currentPage > 1 ? [{ name: currentPageLabel, path: currentPath }] : []),
      ]
    : [
        { name: 'TOP', path: '/' },
        {
          name: 'お役立ち記事一覧',
          path: currentPage > 1 ? '/column' : currentPath,
        },
        ...(currentPage > 1 ? [{ name: currentPageLabel, path: currentPath }] : []),
      ];
  const breadcrumbJsonLd = createBreadcrumbListJsonLd(
    breadcrumbItems,
  );
  const itemListJsonLd = createItemListJsonLd({
    name: heading,
    path: currentPath,
    items: posts.map((post) => ({
      name: post.title,
      path: `/column/${post.id}`,
      image: post.image.url,
      datePublished: post.publishedAt,
    })),
  });

  return (
    <main data-rail-label={`${currentPage}/${totalPages}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <nav
        className="mt-18 overflow-x-auto border-b-[1.5px] border-navy bg-white py-2.5 text-xs leading-[1.8] whitespace-nowrap max-md:mt-15 max-md:py-2 max-md:text-[11px]"
        aria-label="パンくずリスト"
      >
        <div className={innerClass}>
          <ol className="flex items-center gap-2.5">
            <li>
              <Link href="/" className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">
                TOP
              </Link>
            </li>
            {currentCategoryName ? (
              <>
                <li className="flex items-center gap-2.5">
                  <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
                  <Link href="/column" className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">
                    お役立ち記事一覧
                  </Link>
                </li>
                <li className={`flex items-center gap-2.5 ${currentPage > 1 ? 'text-navy' : 'text-navy/60'}`}>
                  <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
                  {currentPage > 1 ? (
                    <Link
                      href={`/column/category/${encodeURIComponent(currentCategoryId ?? currentCategoryName)}`}
                      className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue"
                    >
                      {heading}
                    </Link>
                  ) : (
                    heading
                  )}
                </li>
                {currentPage > 1 && (
                  <li className="flex items-center gap-2.5 text-navy/60" aria-current="page">
                    <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
                    {currentPageLabel}
                  </li>
                )}
              </>
            ) : (
              <>
                <li className={`flex items-center gap-2.5 ${currentPage > 1 ? 'text-navy' : 'text-navy/60'}`}>
                  <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
                  {currentPage > 1 ? (
                    <Link href="/column" className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">
                      お役立ち記事一覧
                    </Link>
                  ) : (
                    'お役立ち記事一覧'
                  )}
                </li>
                {currentPage > 1 && (
                  <li className="flex items-center gap-2.5 text-navy/60" aria-current="page">
                    <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
                    {currentPageLabel}
                  </li>
                )}
              </>
            )}
          </ol>
        </div>
      </nav>

      <header className="pt-15 pb-9 max-md:pt-10 max-md:pb-6">
        <div className={`${innerClass} fade is-show`}>
          <span className="block font-[family-name:var(--font-oswald)] text-[clamp(44px,6.5vw,72px)] leading-none font-bold tracking-[.06em] text-transparent uppercase [-webkit-text-stroke:1.5px_#1D2B50]">
            Column
          </span>
          <div className="mt-3.5 flex flex-wrap items-center gap-4">
            <h1 className="text-[clamp(24px,3vw,32px)] font-black tracking-[.04em]">
              {heading}
            </h1>
            <span className="inline-flex items-baseline gap-1 rounded-full border-2 border-navy bg-white px-4 py-1 text-[12.5px] font-bold">
              全
              <span className="font-[family-name:var(--font-oswald)] text-[15px] text-blue">
                {totalCount}
              </span>
              記事
            </span>
          </div>
          <p className="mt-3.5 max-w-170 text-[14.5px] text-navy/88 max-md:text-[13.5px]">
            {currentCategoryLead?.trim() || 'このページは、未経験からWebエンジニアを目指す方向けの記事一覧です。学習法・未経験・キャリアの3つのカテゴリに分けて、今の悩みに合う記事を探せるようにしています。「何から読めばいいか分からない」という方は、まず学習ロードマップで全体像をつかむのがおすすめです。学習の始め方から、ポートフォリオ作り、転職活動、入社後のサバイバルまで、順番に読み進められます。気になるテーマから、気軽に開いてみてください。'}
          </p>
        </div>
      </header>

      <section className="pb-11 max-md:pb-8">
        <div className={`${innerClass} fade is-show`}>
          <h2 className="mb-3.5 flex items-baseline gap-3 text-sm font-bold">
            カテゴリーから探す
            <span className="font-[family-name:var(--font-oswald)] text-[11px] tracking-[.22em] text-blue uppercase">
              category
            </span>
          </h2>
          <div className="flex flex-wrap gap-3 py-0.5">
            <Link
              href="/column"
              className={`${!currentCategoryId ? 'pointer-events-none bg-yellow' : 'bg-white hover:-translate-y-0.5 hover:bg-pale-blue'} inline-flex shrink-0 items-baseline gap-1.5 rounded-full border-2 border-navy px-5 py-2 text-[13.5px] font-bold transition-[background,transform] max-md:px-4 max-md:py-1.75 max-md:text-[12.5px]`}
            >
              すべて
              <span className={`font-[family-name:var(--font-oswald)] text-xs ${!currentCategoryId ? 'text-navy' : 'text-blue'}`}>
                ({categories.reduce((sum, item) => sum + item.count, 0)})
              </span>
            </Link>
            {categories.map(({ category, count }) => {
              const isCurrent = category.id === currentCategoryId;
              return (
                <Link
                  key={category.id}
                  href={`/column/category/${encodeURIComponent(category.id)}`}
                  className={`${isCurrent ? 'pointer-events-none bg-yellow' : 'bg-white hover:-translate-y-0.5 hover:bg-pale-blue'} inline-flex shrink-0 items-baseline gap-1.5 rounded-full border-2 border-navy px-5 py-2 text-[13.5px] font-bold transition-[background,transform] max-md:px-4 max-md:py-1.75 max-md:text-[12.5px]`}
                >
                  {category.name}
                  <span className={`font-[family-name:var(--font-oswald)] text-xs ${isCurrent ? 'text-navy' : 'text-blue'}`}>
                    ({count})
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pb-24 max-md:pb-18">
        <div className={innerClass}>
          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4.5">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/column/${post.id}`}
                className="group fade flex flex-col overflow-hidden rounded-xl border-2 border-navy bg-white transition-[transform,border-color] duration-250 hover:-translate-y-0.75 hover:border-[#d9a521]"
              >
                <div className="relative aspect-video overflow-hidden border-b-2 border-navy bg-pale-blue">
                  <Image
                    src={post.image.url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) calc((100vw - 72px) / 2), 357px"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pt-4.5 pb-4">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-blue px-3.5 py-0.75 text-[11px] font-bold text-white">
                      {post.category.name}
                    </span>
                    <time className="font-[family-name:var(--font-oswald)] text-xs tracking-[.08em] text-navy/70" dateTime={post.publishedAt}>
                      {dayjs(post.publishedAt).format('YYYY.MM.DD')}
                    </time>
                  </div>
                  <h2 className="mb-3.5 line-clamp-2 text-base leading-[1.7] font-bold">
                    {post.title}
                  </h2>
                  <div className="mt-auto flex items-center justify-between border-t-[1.5px] border-dashed border-navy/40 pt-3">
                    <span className="text-[12.5px] font-bold text-blue">続きを読む</span>
                    <span className="flex size-7.5 items-center justify-center rounded-full border-2 border-navy bg-yellow text-navy transition-transform group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-15 flex flex-wrap items-center justify-center gap-3 max-md:mt-12 max-md:gap-2.5" aria-label="ページネーション">
              {currentPage > 1 ? (
                <Link className="group inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-white px-5 py-2.25 font-[family-name:var(--font-oswald)] text-[13px] font-semibold tracking-[.16em] uppercase hover:-translate-y-0.5 hover:bg-pale-blue max-md:size-10 max-md:justify-center max-md:p-0" href={buildPageHref(currentPage - 1, currentCategoryId)}>
                  <span className="inline-flex size-6.5 rotate-180 items-center justify-center rounded-full bg-navy text-white max-md:size-auto max-md:bg-transparent max-md:text-navy"><ArrowIcon /></span>
                  <span className="max-md:hidden">prev</span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-white px-5 py-2.25 font-[family-name:var(--font-oswald)] text-[13px] font-semibold tracking-[.16em] uppercase opacity-40 max-md:size-10 max-md:justify-center max-md:p-0">
                  <span className="inline-flex size-6.5 rotate-180 items-center justify-center rounded-full bg-navy text-white max-md:size-auto max-md:bg-transparent max-md:text-navy"><ArrowIcon /></span>
                  <span className="max-md:hidden">prev</span>
                </span>
              )}

              {visiblePages.map((pageNumber, index) => (
                <span className="contents" key={pageNumber}>
                  {index > 0 && pageNumber - visiblePages[index - 1] > 1 && (
                    <span className="px-0.5 font-[family-name:var(--font-oswald)] font-semibold tracking-[.2em] text-navy/60">…</span>
                  )}
                  <Link
                    href={buildPageHref(pageNumber, currentCategoryId)}
                    aria-current={pageNumber === currentPage ? 'page' : undefined}
                    className={`${pageNumber === currentPage ? 'pointer-events-none bg-yellow font-bold' : 'bg-white hover:-translate-y-0.5 hover:bg-pale-blue'} inline-flex size-11.5 items-center justify-center rounded-full border-2 border-navy font-[family-name:var(--font-oswald)] text-[15px] font-semibold transition-[background,transform] max-md:size-10 max-md:text-sm`}
                  >
                    {pageNumber}
                  </Link>
                </span>
              ))}

              {currentPage < totalPages ? (
                <Link className="group inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-white px-5 py-2.25 font-[family-name:var(--font-oswald)] text-[13px] font-semibold tracking-[.16em] uppercase hover:-translate-y-0.5 hover:bg-pale-blue max-md:size-10 max-md:justify-center max-md:p-0" href={buildPageHref(currentPage + 1, currentCategoryId)}>
                  <span className="max-md:hidden">next</span>
                  <span className="inline-flex size-6.5 items-center justify-center rounded-full bg-navy text-white max-md:size-auto max-md:bg-transparent max-md:text-navy"><ArrowIcon /></span>
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-white px-5 py-2.25 font-[family-name:var(--font-oswald)] text-[13px] font-semibold tracking-[.16em] uppercase opacity-40 max-md:size-10 max-md:justify-center max-md:p-0">
                  <span className="max-md:hidden">next</span>
                  <span className="inline-flex size-6.5 items-center justify-center rounded-full bg-navy text-white max-md:size-auto max-md:bg-transparent max-md:text-navy"><ArrowIcon /></span>
                </span>
              )}
            </nav>
          )}
        </div>
      </div>

      <section className="pb-24 max-md:pb-18">
        <div className={innerClass}>
          <div className="fade relative mx-auto max-w-210 rounded-2xl border-2 border-navy bg-pale-blue px-8 py-14 text-center before:absolute before:top-3.5 before:left-3.5 before:size-2.5 before:rounded-full before:border-[1.5px] before:border-navy before:bg-yellow before:content-[''] after:absolute after:right-3.5 after:bottom-3.5 after:size-2.5 after:rounded-full after:border-[1.5px] after:border-navy after:bg-yellow after:content-[''] max-md:px-5.5 max-md:py-11">
            <h2 className="mb-3 text-[clamp(18px,2.4vw,24px)] font-black">
              お問い合わせを受け付けています
            </h2>
            <p className="mx-auto mb-7 max-w-135 text-[13.5px]">
              サイトや記事に関するご質問、お仕事のご相談、その他のご連絡など、内容を問わずお気軽にお問い合わせください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <TrackedContactLink className={yellowPillClass} location="column_archive">
                お問い合わせ
                <span className={yellowPillArrowClass}><ArrowIcon /></span>
              </TrackedContactLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
