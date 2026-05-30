import { client } from '../../../libs/microcms';
import styles from './page.module.scss';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleListSection } from '../../../components/ArticleListSection';
import { TableOfContents } from '../../../components/TableOfContents';
import {
  getLatestColumnPosts,
  getRelatedColumnPosts,
  type ArticleCard,
  type Category,
  type ImageField,
} from '../../../libs/column';
import { renderToc } from '../../../libs/render-toc';

type Props = {
  id: string;
  title: string;
  image: ImageField;
  body: string;
  publishedAt: string;
  category: Category;
  summaryItems?: {
    text: string;
  }[];
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

async function getColumnPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `column/${id}`,
    queries: {
      depth: 2,
    },
  });
  return data;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function SummaryBox({ items }: { items: NonNullable<Props['summaryItems']> }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <p className="mb-0 flex w-fit items-center gap-2 border-2 border-b-0 border-[#1496A0] bg-[rgba(20,150,160,0.3)] px-3 py-2 text-xl leading-normal font-bold text-[#1496A0]">
        <span className="block h-8 w-8 shrink-0 bg-[url('/images/summary-title-icon.svg')] bg-contain bg-center bg-no-repeat" aria-hidden="true" />
        この記事でわかること
      </p>
      <ul className="m-0 grid list-none gap-3 border-2 border-[#1496A0] p-6">
        {items.map((item) => (
          <li key={item.text} className="relative m-0 pl-9 text-base leading-normal font-bold">
            <span className="absolute top-0 left-0 h-6 w-6 bg-[url('/images/summary-list-icon.svg')] bg-contain bg-center bg-no-repeat" aria-hidden="true" />
            {item.text}
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
  const text = stripHtml(article.body);

  return (
    <div className="mt-12">
      <p className="m-0 flex w-fit items-center gap-2 border-2 border-b-0 border-[#565656] px-3 py-2 text-xl leading-normal font-bold">
        <span className="block h-8 w-8 shrink-0 bg-[url('/images/recommend-title-icon.svg')] bg-contain bg-center bg-no-repeat" aria-hidden="true" />
        こちらもチェック
      </p>
      <Link href={`/column/${article.id}`} className="grid grid-cols-[calc(2/9*100%)_1fr] gap-9 border-2 border-[#565656] p-6 max-sm:p-4 text-inherit no-underline max-sm:grid-cols-1 max-sm:gap-4">
        <div className="max-sm:grid max-sm:grid-cols-[40%_1fr] max-sm:gap-3">
          <div className="aspect-[3/2] w-full overflow-hidden">
            <Image
              src={article.image.url}
              width={article.image.width}
              height={article.image.height}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="hidden !text-lg leading-normal font-bold max-sm:!m-0 max-sm:block">{article.title}</p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xl leading-normal font-bold max-sm:hidden">{article.title}</p>
          {text && (
            <p className="!m-0 overflow-hidden text-base max-sm:!text-sm leading-normal [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {text}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

function SidebarRelatedArticles({ posts }: { posts: ArticleCard[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="m-0 mb-3 border-b-2 border-[#1496A0] pb-2 text-xl leading-normal font-bold">関連記事</h2>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/column/${post.id}`} className="group flex items-start justify-between no-underline">
            <div className="aspect-square w-[calc(100/300*100%)] overflow-hidden">
              <Image
                src={post.image.url}
                width={post.image.width}
                height={post.image.height}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-[calc(182/300*100%)] flex-col items-start gap-1.5">
              <span className="rounded-full bg-[#1496A0] px-4 py-1 text-xs leading-normal font-bold text-white">{post.category.name}</span>
              <p className="overflow-hidden text-sm leading-normal font-bold [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:text-[#1496A0] group-hover:underline">{post.title}</p>
              <time className="text-xs leading-normal" dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format('YYYY年MM月DD日')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function renderContent(
  body: string,
  recommendBlocks: Props['recommendBlocks'],
  summaryItems: Props['summaryItems'],
) {
  const blocks = recommendBlocks ?? [];
  const parts = body.split(/<p>\s*(\[summary\]|\[recommend:([\w-]+)\])\s*<\/p>/g);

  return parts.map((part, index) => {
    if (!part || parts[index - 1]?.startsWith('[recommend:')) {
      return null;
    }

    if (part === '[summary]') {
      return <SummaryBox key="summary" items={summaryItems ?? []} />;
    }

    if (part.startsWith('[recommend:')) {
      const marker = part.match(/\[recommend:([\w-]+)\]/)?.[1];
      const block = blocks.find((item) => item.marker === marker);

      if (!block) {
        return null;
      }

      return <RecommendCard key={`recommend-${marker}`} article={block.recommendCard.article} />;
    }

    return <div key={`body-${index}`} dangerouslySetInnerHTML={{ __html: part }} />;
  });
}

export default async function ColumnPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getColumnPost(id);
  const [latestPosts, relatedPosts] = await Promise.all([
    getLatestColumnPosts(id),
    getRelatedColumnPosts(id, post.category.id),
  ]);
  const publishedAt = dayjs(post.publishedAt).format('YYYY/MM/DD');
  const toc = renderToc(post.body);

  return (
    <main className="mx-auto w-full max-w-7xl px-10 max-lg:px-6 max-sm:px-4 py-20 max-lg:py-12 max-sm:py-10">
      <nav className="text-sm leading-normal" aria-label="breadcrumb">
        <ol className="m-0 flex list-none flex-wrap p-0" itemScope itemType="https://schema.org/BreadcrumbList">
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
            <Link href={`/category/${post.category.id}`} className="text-[#1496A0] underline hover:opacity-80" itemProp="item">
              <span itemProp="name">{post.category.name}</span>
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
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>
      <div className="flex items-start justify-between max-lg:flex-col">
        <article className="w-[calc(900/1280*100%)] max-w-[900px] pt-10 max-sm:pt-6 max-lg:w-full max-lg:max-w-none">
          <div className="mb-8 flex flex-col gap-4 max-sm:gap-2">
            <h1 className="text-5xl max-sm:text-4xl leading-normal font-bold">{post.title}</h1>
            <time className="block text-sm leading-normal" itemProp="datePublished">{publishedAt}</time>
            <p className="w-fit border border-[#1496A0] px-2 py-1 text-xs leading-normal text-[#1496A0]">{post.category.name}</p>
          </div>
          <div className="aspect-[3/2] w-full overflow-hidden">
            <Image
              src={post.image.url}
              width={post.image.width}
              height={post.image.height}
              alt={post.title}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <TableOfContents toc={toc} expandable />
          <div className={styles.content}>
            {renderContent(post.body, post.recommendBlocks, post.summaryItems)}
          </div>
          <ArticleListSection title="新着記事" posts={latestPosts} variant="primary" />
          <ArticleListSection title="関連記事" posts={relatedPosts} variant="light" />
        </article>
        <aside className="sticky top-[82px] w-[calc(300/1280*100%)] pt-10 pb-10 max-lg:hidden">
          <SidebarRelatedArticles posts={relatedPosts} />
          <TableOfContents toc={toc} variant="sidebar" />
        </aside>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'column' });

  return contentIds.map((contentId) => ({
    id: contentId,
  }));
}
