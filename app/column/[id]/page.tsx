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
    <div className={styles.summaryBox}>
      <p className={styles.summaryTitle}>この記事でわかること</p>
      <ul className={styles.summaryList}>
        {items.map((item) => (
          <li key={item.text}>{item.text}</li>
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
    <div className={styles.recommendCard}>
      <p className={styles.recommendCardTitle}>こちらもチェック</p>
      <Link href={`/column/${article.id}`} className={styles.recommendCardLink}>
        <div className={styles.recommendCardImage}>
          <Image
            src={article.image.url}
            width={article.image.width}
            height={article.image.height}
            alt={article.title}
          />
        </div>
        <div className={styles.recommendCardBody}>
          <p className={styles.recommendCardHeading}>{article.title}</p>
          {text && <p className={styles.recommendCardText}>{text}</p>}
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
    <section className={styles.sidebarRelated}>
      <h2 className={styles.sidebarTitle}>関連記事</h2>
      <div className={styles.sidebarRelatedList}>
        {posts.map((post) => (
          <Link key={post.id} href={`/column/${post.id}`} className={styles.sidebarRelatedCard}>
            <div className={styles.sidebarRelatedImage}>
              <Image
                src={post.image.url}
                width={post.image.width}
                height={post.image.height}
                alt={post.title}
              />
            </div>
            <div className={styles.sidebarRelatedBody}>
              <span className={styles.sidebarRelatedCategory}>{post.category.name}</span>
              <p className={styles.sidebarRelatedTitle}>{post.title}</p>
              <time className={styles.sidebarRelatedDate} dateTime={post.publishedAt}>
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
    <main className={styles.article}>
      <nav className={styles.breadcrumb} aria-label="breadcrumb">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href="/" itemProp="item">
              <span itemProp="name">TOP</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href={`/category/${post.category.id}`} itemProp="item">
              <span itemProp="name">{post.category.name}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>
      <div className={styles.contents}>
        <article className={styles.articleSection}>
          <div className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <time className={styles.date} itemProp="datePublished">{publishedAt}</time>
            <p className={styles.category}>{post.category.name}</p>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src={post.image.url}
              width={post.image.width}
              height={post.image.height}
              alt={post.title}
              priority
            />
          </div>
          <TableOfContents toc={toc} styles={styles} expandable />
          <div className={styles.content}>
            {renderContent(post.body, post.recommendBlocks, post.summaryItems)}
          </div>
          <ArticleListSection title="新着記事" posts={latestPosts} variant="primary" />
          <ArticleListSection title="関連記事" posts={relatedPosts} variant="light" />
        </article>
        <aside className={styles.sidebar}>
          <SidebarRelatedArticles posts={relatedPosts} />
          <TableOfContents toc={toc} styles={styles} />
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
