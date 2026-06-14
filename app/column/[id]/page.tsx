import type { Metadata } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleProgress } from '../../../components/ArticleProgress';
import { ArrowIcon } from '../../../components/ArrowIcon';
import { TableOfContents } from '../../../components/TableOfContents';
import {
  getLatestColumnPosts,
  getRelatedColumnPosts,
  type ArticleCard,
  type Category,
  type ImageField,
} from '../../../libs/column';
import { client } from '../../../libs/microcms';
import { addHeadingIds, renderToc } from '../../../libs/render-toc';
import { getAbsoluteUrl, siteName, withSiteName } from '../../../libs/site-metadata';
import styles from './page.module.scss';

export const dynamic = 'force-dynamic';

type Props = {
  id: string;
  title: string;
  image: ImageField;
  body: string;
  publishedAt: string;
  revisedAt?: string;
  updatedAt?: string;
  category: Category;
  summaryItems?: { text: string }[];
  recommendBlocks?: {
    marker: string;
    recommendCard: {
      article: {
        id: string;
        title: string;
        image: ImageField;
        body: string;
      };
    };
  }[];
};

const noStoreRequestInit = {
  cache: 'no-store',
} satisfies RequestInit;

const innerClass = 'mx-auto w-full max-w-280 px-6';
const pillClass =
  'group inline-flex items-center gap-3 rounded-full border-2 border-navy bg-white px-6.5 py-3.5 text-[15px] font-bold transition-[transform,background] duration-250 hover:-translate-y-0.75';
const arrowClass =
  'inline-flex size-7 items-center justify-center rounded-full bg-navy text-white transition-transform duration-250 group-hover:translate-x-1';

async function getColumnPost(id: string): Promise<Props> {
  try {
    return await client.get({
      endpoint: `column/${id}`,
      queries: { depth: 2 },
      customRequestInit: noStoreRequestInit,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('status: 404')) {
      notFound();
    }
    throw error;
  }
}

function decodeHtmlEntities(html: string) {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

function createMetaDescription(title: string) {
  return `${title}を解説しております。未経験からWebエンジニアを目指す方に向けて、学習や開発、キャリアに役立つ情報をまとめています。`;
}

function addSectionLabels(html: string) {
  let sectionNumber = 0;

  return html.replace(/<h2\b/g, () => {
    sectionNumber += 1;
    const firstClass = sectionNumber === 1 ? ' section-label--first' : '';
    return `<span class="section-label${firstClass}">Section ${String(sectionNumber).padStart(2, '0')}</span><h2`;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getColumnPost(id);
  const title = withSiteName(post.title);
  const description = createMetaDescription(post.title);
  const canonical = `/column/${id}`;
  const revisedAt = post.revisedAt && dayjs(post.revisedAt).isAfter(post.publishedAt)
    ? post.revisedAt
    : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: revisedAt,
      images: [{
        url: post.image.url,
        width: post.image.width,
        height: post.image.height,
        alt: post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.image.url],
    },
  };
}

function SummaryBox({ items }: { items: NonNullable<Props['summaryItems']> }) {
  if (items.length === 0) return null;

  return (
    <div className="relative mt-0 mb-2 rounded-xl border-2 border-navy bg-pale-blue px-6.5 pt-8.5 pb-5.5 max-md:px-4.5 max-md:pt-7.5 max-md:pb-4.5">
      <p className="absolute -top-4.25 left-4.5 inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-yellow px-4.5 py-1 text-[13px] font-bold max-md:px-3.5 max-md:text-xs">
        この記事でわかること
        <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.18em] text-navy/70 uppercase">summary</span>
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-2.5 py-1 text-sm font-medium max-md:text-[13px]">
            <span className="mt-1.25 inline-flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-navy bg-yellow text-[11px] font-bold">✓</span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecommendCard({
  article,
}: {
  article: NonNullable<Props['recommendBlocks']>[number]['recommendCard']['article'];
}) {
  return (
    <Link
      href={`/column/${article.id}`}
      className="group relative my-13 grid min-w-0 grid-cols-[150px_minmax(0,1fr)_40px] items-center gap-4.5 rounded-xl border-2 border-navy bg-white p-5 transition-[transform,border-color] duration-250 hover:-translate-y-0.75 hover:border-[#d9a521] max-md:grid-cols-[96px_minmax(0,1fr)] max-md:gap-3"
    >
      <span className="absolute -top-3.75 left-4 rounded-full border-2 border-navy bg-yellow px-4 py-0.5 text-xs font-bold max-md:text-[11px]">こちらもチェック</span>
      <span className="relative aspect-16/9 overflow-hidden rounded-lg border-[1.5px] border-navy bg-white">
        <Image
          src={article.image.url}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 96px, 150px"
          className="object-cover"
        />
      </span>
      <span className="min-w-0 text-[14.5px] leading-[1.7] font-bold break-words max-md:text-[13px]">{article.title}</span>
      <span className={`${arrowClass} max-md:hidden`}><ArrowIcon /></span>
    </Link>
  );
}

function renderContent(body: string, recommendBlocks: Props['recommendBlocks']) {
  const blocks = recommendBlocks ?? [];
  const parts = body.split(/<p>\s*(\[summary\]|\[recommend:([\w-]+)\])\s*<\/p>/g);

  return parts.map((part, index) => {
    if (!part || parts[index - 1]?.startsWith('[recommend:') || part === '[summary]') {
      return null;
    }

    if (part.startsWith('[recommend:')) {
      const marker = part.match(/\[recommend:([\w-]+)\]/)?.[1];
      const block = blocks.find((item) => item.marker === marker);
      return block
        ? <RecommendCard key={`recommend-${marker}`} article={block.recommendCard.article} />
        : null;
    }

    return <div key={`body-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
  });
}

function SidebarNewPosts({ posts }: { posts: ArticleCard[] }) {
  return (
    <div className="rounded-xl border-2 border-navy bg-white px-5 py-5.5">
      <h2 className="mb-3.5 flex items-baseline gap-2.5 border-b-2 border-navy pb-2.5 text-[15px] font-black">
        新着記事
        <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.2em] text-blue uppercase">new posts</span>
      </h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b-[1.5px] border-dashed border-navy/40 last:border-0">
            <Link href={`/column/${post.id}`} className="block py-2.5 text-[12.5px] leading-[1.6] font-medium hover:text-blue">
              <time className="mb-0.5 block font-[family-name:var(--font-oswald)] text-[11px] tracking-[.08em] text-navy/70">
                {dayjs(post.publishedAt).format('YYYY.MM.DD')}
              </time>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthorBox() {
  return (
    <div className="relative mt-18 mb-8 grid grid-cols-[110px_1fr] items-center gap-6 rounded-2xl border-2 border-navy bg-white p-7.5 before:absolute before:top-3 before:left-3 before:size-2.5 before:rounded-full before:border-[1.5px] before:border-navy before:bg-yellow after:absolute after:right-3 after:bottom-3 after:size-2.5 after:rounded-full after:border-[1.5px] after:border-navy after:bg-yellow max-md:grid-cols-1 max-md:p-6 max-md:text-center">
      <div className="flex size-25 items-center justify-center overflow-hidden rounded-full border-3 border-yellow bg-pale-blue max-md:mx-auto">
        <Image src="/images/site-logo.svg" width={62} height={22} alt="" />
      </div>
      <div>
        <p className="!mb-0 text-base font-bold">Labite 運営者</p>
        <p className="!mb-2 text-xs font-bold text-[#c99514]">Webエンジニア</p>
        <p className="!mb-3 text-[13px] text-navy/90 max-md:text-[12.5px]">
          Web開発の現場で得た知識をもとに、未経験の人がつまずきやすいポイントを整理して記事にしています。
        </p>
        <Link href="/about" className={`${pillClass} !px-5 !py-2.25 !text-[13px]`}>
          プロフィールを見る
          <span className={`${arrowClass} !size-6`}><ArrowIcon /></span>
        </Link>
      </div>
    </div>
  );
}

function ConsultationCard() {
  return (
    <div id="cta" className="relative mb-2 rounded-2xl border-2 border-navy bg-pale-blue px-7 py-11 text-center before:absolute before:top-3 before:left-3 before:size-2.5 before:rounded-full before:border-[1.5px] before:border-navy before:bg-yellow after:absolute after:right-3 after:bottom-3 after:size-2.5 after:rounded-full after:border-[1.5px] after:border-navy after:bg-yellow max-md:px-4.5 max-md:py-9">
      <h2 className="!m-0 !border-0 !bg-transparent !p-0 !text-[clamp(17px,2vw,21px)] before:!hidden">学習やキャリアの相談を受け付けています</h2>
      <p className="mx-auto mt-2.5 mb-6 max-w-120 text-[13.5px]">
        記事を読んで分からなかったこと、学習の進め方やキャリアの悩みなど、お気軽にご相談ください。
      </p>
      <div className="flex flex-wrap justify-center gap-3.5 max-md:flex-col max-md:items-center">
        <Link href="/contact" className={`${pillClass} !bg-yellow`}>
          お問い合わせ <span className={arrowClass}><ArrowIcon /></span>
        </Link>
      </div>
    </div>
  );
}

function PostSection({
  posts,
  label,
  title,
  mobileOnly = false,
}: {
  posts: ArticleCard[];
  label: string;
  title: string;
  mobileOnly?: boolean;
}) {
  if (posts.length === 0) return null;

  return (
    <section className={`border-t-[1.5px] border-navy bg-cream py-22 max-md:py-16 ${mobileOnly ? 'hidden max-lg:block' : ''}`}>
      <div className={innerClass}>
        <div className="fade mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="block font-[family-name:var(--font-oswald)] text-[clamp(34px,5vw,56px)] leading-none font-bold tracking-[.06em] text-transparent uppercase [-webkit-text-stroke:1.5px_#1D2B50]">{label}</span>
            <h2 className="mt-2.5 text-[clamp(20px,2.6vw,26px)] font-black">{title}</h2>
          </div>
          <Link href="/column" className={pillClass}>
            記事一覧を見る <span className={arrowClass}><ArrowIcon /></span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4.5 max-md:grid-cols-1">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/column/${post.id}`}
              className="fade grid grid-cols-[110px_1fr] items-center gap-4 rounded-xl border-2 border-navy bg-white p-3.5 transition-[transform,border-color] duration-250 hover:-translate-y-0.75 hover:border-[#d9a521] max-md:grid-cols-1 max-md:gap-0 max-md:overflow-hidden max-md:p-0"
            >
              <span className="relative aspect-16/9 overflow-hidden rounded-lg border-[1.5px] border-navy bg-white max-md:aspect-video max-md:rounded-none max-md:border-0 max-md:border-b-2">
                <Image
                  src={post.image.url}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 110px"
                  className="object-cover"
                />
              </span>
              <span className="max-md:px-5 max-md:pt-4 max-md:pb-5.5">
                <span className="mb-1 flex items-center gap-2.5">
                  <span className="rounded-full bg-blue px-3 py-0.5 text-[10.5px] font-bold text-white">{post.category.name}</span>
                  <time className="font-[family-name:var(--font-oswald)] text-[11px] tracking-[.08em] text-navy/70">
                    {dayjs(post.publishedAt).format('YYYY.MM.DD')}
                  </time>
                </span>
                <span className="line-clamp-2 text-[13.5px] leading-[1.65] font-bold max-md:text-base">{post.title}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function ColumnPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getColumnPost(id);
  const [latestPosts, relatedPosts] = await Promise.all([
    getLatestColumnPosts(id),
    getRelatedColumnPosts(id, post.category.id),
  ]);
  const bodyHtml = addSectionLabels(addHeadingIds(decodeHtmlEntities(post.body)));
  const toc = renderToc(bodyHtml);
  const articleUrl = getAbsoluteUrl(`/column/${id}`);
  const revisedAt = post.revisedAt && dayjs(post.revisedAt).isAfter(post.publishedAt)
    ? post.revisedAt
    : undefined;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    headline: post.title,
    description: createMetaDescription(post.title),
    image: [post.image.url],
    datePublished: post.publishedAt,
    ...(revisedAt ? { dateModified: revisedAt } : {}),
    author: { '@type': 'Organization', name: siteName, url: getAbsoluteUrl('/') },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: getAbsoluteUrl('/images/site-logo.png') },
    },
  };

  return (
    <>
      <ArticleProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <nav className="mt-19 overflow-x-auto border-b-[1.5px] border-navy bg-white py-2.5 text-xs whitespace-nowrap max-md:mt-16 max-md:py-2 max-md:text-[11px]" aria-label="パンくずリスト">
        <div className={innerClass}>
          <ol className="flex items-center gap-2.5">
            <li><Link href="/" className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">TOP</Link></li>
            <li className="text-navy/50">›</li>
            <li><Link href="/column" className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">お役立ち記事一覧</Link></li>
            <li className="text-navy/50">›</li>
            <li><Link href={`/column/category/${post.category.id}`} className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue">{post.category.name}の記事一覧</Link></li>
            <li className="text-navy/50">›</li>
            <li className="text-navy/60" aria-current="page">{post.title}</li>
          </ol>
        </div>
      </nav>

      <div className="py-14 pb-27.5 max-md:py-9 max-md:pb-18">
        <div className={`${innerClass} grid grid-cols-[minmax(0,1fr)_300px] items-start gap-10 max-lg:grid-cols-1`}>
          <main className="min-w-0">
            <div className="fade is-show">
              <div className="mb-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded-full bg-blue px-4 py-1 text-xs font-bold text-white">{post.category.name}</span>
                <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-navy/70">
                  <span className="inline-flex items-baseline gap-1.5">
                    <span className="font-bold">公開日</span>
                    <time className="font-[family-name:var(--font-oswald)] text-[13px] tracking-[.08em]" dateTime={post.publishedAt}>
                      {dayjs(post.publishedAt).format('YYYY.MM.DD')}
                    </time>
                  </span>
                  {revisedAt && (
                    <span className="inline-flex items-baseline gap-1.5">
                      <span className="font-bold">更新日</span>
                      <time className="font-[family-name:var(--font-oswald)] text-[13px] tracking-[.08em]" dateTime={revisedAt}>
                        {dayjs(revisedAt).format('YYYY.MM.DD')}
                      </time>
                    </span>
                  )}
                </span>
              </div>
              <h1 className="mb-6 border-l-8 border-yellow pl-4.5 text-[clamp(24px,3vw,33px)] leading-[1.6] font-black max-md:border-l-6 max-md:pl-3.5 max-md:text-[22px]">
                {post.title}
              </h1>
              <figure className="relative mb-13 overflow-hidden rounded-xl border-2 border-navy max-md:mb-9 max-md:rounded-[10px]">
                <Image
                  src={post.image.url}
                  width={post.image.width}
                  height={post.image.height}
                  alt={post.title}
                  className="h-auto w-full"
                  priority
                />
              </figure>
              <SummaryBox items={post.summaryItems ?? []} />
              <TableOfContents toc={toc} variant="mobile" />
            </div>

            <article className={`${styles.content} mt-10`}>
              {renderContent(bodyHtml, post.recommendBlocks)}
              <AuthorBox />
              <ConsultationCard />
            </article>
          </main>

          <aside className="sticky top-25 flex flex-col gap-7 max-lg:hidden">
            <div className="rounded-xl border-2 border-navy bg-white px-5 py-5.5">
              <h2 className="mb-3.5 flex items-baseline gap-2.5 border-b-2 border-navy pb-2.5 text-[15px] font-black">
                目次
                <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.2em] text-blue uppercase">index</span>
              </h2>
              <TableOfContents toc={toc} variant="sidebar" />
            </div>
            <SidebarNewPosts posts={latestPosts} />
          </aside>
        </div>
      </div>

      <PostSection posts={relatedPosts} label="Related" title="関連記事" />
      <PostSection posts={latestPosts} label="New Posts" title="新着記事" mobileOnly />
    </>
  );
}
