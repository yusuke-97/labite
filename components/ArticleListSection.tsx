import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleCard } from '../libs/column';
import styles from './ArticleListSection.module.scss';

type Props = {
  title: string;
  posts: ArticleCard[];
  variant?: 'primary' | 'light';
};

export function ArticleListSection({ title, posts, variant = 'primary' }: Props) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`${styles.section} ${styles[variant]}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.list}>
        {posts.map((post) => (
          <Link key={post.id} href={`/column/${post.id}`} className={styles.card}>
            <div className={styles.image}>
              <Image
                src={post.image.url}
                width={post.image.width}
                height={post.image.height}
                alt={post.title}
              />
            </div>
            <div className={styles.body}>
              <p className={styles.cardTitle}>{post.title}</p>
              <time className={styles.date} dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format('YYYY.MM.DD')}
              </time>
              <span className={styles.category}>{post.category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
