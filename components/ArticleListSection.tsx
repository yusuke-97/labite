import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleCard } from '../libs/column';
import { ArrowIcon } from './ArrowIcon';
import {
  innerClass,
  outlineTitleClass,
  pillArrowClass,
  pillClass,
  sectionClass,
} from './site-design';

type Props = {
  posts: ArticleCard[];
  title?: string;
  variant?: 'primary' | 'light';
};

function PostMeta({ post }: { post: ArticleCard }) {
  return (
    <div className="mb-2.5 flex items-center gap-3">
      <span className="rounded-full bg-blue px-3 py-0.75 text-[11px] font-bold text-white">{post.category.name}</span>
      <time className="font-[family-name:var(--font-oswald)] text-xs tracking-[.04em] text-navy/70" dateTime={post.publishedAt}>
        {dayjs(post.publishedAt).format('YYYY.MM.DD')}
      </time>
    </div>
  );
}

export function ArticleListSection({ posts, title = '新着記事', variant = 'primary' }: Props) {
  if (posts.length === 0) {
    return null;
  }

  const [featuredPost, ...restPosts] = posts;
  const cardClass =
    'fade border-[1.5px] border-navy bg-white transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-[#d9a521]';
  const thumbClass =
    'relative flex aspect-video items-center justify-center overflow-hidden border-b-[1.5px] border-navy bg-[repeating-linear-gradient(-45deg,#EAF1FB,#EAF1FB_12px,#dfeafd_12px,#dfeafd_24px)]';

  return (
    <section className={`${sectionClass} article-list-section article-list-section--${variant}`}>
      <div className={innerClass}>
        <div className="fade mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className={outlineTitleClass}>New Posts</span>
            <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">{title}</h2>
          </div>
          <Link className={pillClass} href="/column">
            記事一覧を見る
            <span className={pillArrowClass}><ArrowIcon /></span>
          </Link>
        </div>
        <div className="mt-2 grid grid-cols-[1.05fr_.95fr] gap-7 max-md:grid-cols-1">
          <Link className={`${cardClass} block overflow-hidden rounded-xl`} href={`/column/${featuredPost.id}`}>
            <div className={thumbClass}>
              <Image
                src={featuredPost.image.url}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 540px"
                className="!h-full !w-full object-cover opacity-100"
              />
            </div>
            <div className="px-5.5 pt-5 pb-6">
              <PostMeta post={featuredPost} />
              <h3 className="line-clamp-2 text-[19px] leading-[1.6]">{featuredPost.title}</h3>
            </div>
          </Link>
          <div className="flex flex-col gap-4">
            {restPosts.slice(0, 3).map((post) => (
              <Link className={`${cardClass} grid grid-cols-[120px_1fr] items-center gap-4 rounded-xl p-3.5 max-md:grid-cols-1 max-md:gap-0 max-md:overflow-hidden max-md:p-0`} key={post.id} href={`/column/${post.id}`}>
                <div className={`${thumbClass} aspect-16/9 rounded-lg border border-navy max-md:aspect-video max-md:rounded-none max-md:border-0 max-md:border-b-2`}>
                  <Image
                    src={post.image.url}
                    alt={post.title}
                    fill
                    sizes="120px"
                    className="!h-full !w-full object-cover opacity-100"
                  />
                </div>
                <div className="max-md:px-5 max-md:pt-4 max-md:pb-5.5">
                  <PostMeta post={post} />
                  <h3 className="line-clamp-2 mt-1.5 text-[14.5px] leading-[1.6] max-md:mt-0 max-md:text-[16.5px]">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
