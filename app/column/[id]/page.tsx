import { client } from '../../../libs/microcms';
import styles from './page.module.scss';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { TableOfContents } from '../../../components/TableOfContents';
import { renderToc } from '../../../libs/render-toc';

type Props = {
  id: string;
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  body: string;
  publishedAt: string;
  category: { name: string };
  summaryItems?: {
    text: string;
  }[];
  recommendBlocks?: {
    marker: string;
    recommendCard: {
      article: {
        id: string;
        title: string;
        image: {
          url: string;
          width: number;
          height: number;
        };
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
              <span itemProp="name">HOME</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <span itemProp="name">{post.title}</span>
            <meta itemProp="position" content="2" />
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
            />
          </div>
          <TableOfContents toc={toc} styles={styles} />
          <div className={styles.content}>
            {renderContent(post.body, post.recommendBlocks, post.summaryItems)}
          </div>
        </article>
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