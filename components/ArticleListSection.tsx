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
  englishTitle?: string;
  lead?: string;
  variant?: 'primary' | 'light';
  className?: string;
  showArchiveLink?: boolean;
};

function PostMeta({ post }: { post: ArticleCard }) {
  const categoryColor = getCategoryColor(post.category.id);

  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 max-md:mb-2 max-md:gap-2.25">
      <span
        className="rounded-full border-[1.5px] border-navy px-3 py-1 text-[11px] leading-none font-bold text-navy max-md:px-2.5 max-md:py-0.75 max-md:text-[10px]"
        style={{ backgroundColor: categoryColor }}
      >
        {post.category.name}
      </span>
      <time className="font-mono text-[11px] tracking-[.1em] text-[#8A93A8] max-md:text-[10px] max-md:tracking-[.04em]" dateTime={post.publishedAt}>
        {dayjs(post.publishedAt).format('YYYY.MM.DD')}
      </time>
    </div>
  );
}

function getCategoryColor(categoryId: string) {
  if (categoryId === 'career') {
    return '#F3C9A6';
  }

  if (categoryId === 'programming') {
    return '#C6D9F5';
  }

  if (categoryId === 'study-method') {
    return '#C3E3CE';
  }

  return '#F5C543';
}

function SectionBackground({ type }: { type: 'recommended' | 'new' }) {
  const isRecommended = type === 'recommended';

  return (
    <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden" aria-hidden="true">
      {isRecommended ? (
        <>
          <svg className="absolute -top-8.5 right-17.5 size-52.5 opacity-[.06] max-md:-top-4.5 max-md:right-4.5 max-md:size-30" viewBox="0 0 24 24" fill="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
          <svg className="absolute bottom-1.5 left-[3%] size-37.5 opacity-[.05] max-md:bottom-2 max-md:left-[4%] max-md:size-21.5" viewBox="0 0 24 24" fill="none">
            <polyline points="16 18 22 12 16 6" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
            <polyline points="8 6 2 12 8 18" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
        </>
      ) : (
        <>
          <svg className="absolute -top-7 right-16.5 size-50 opacity-[.06] max-md:-top-4 max-md:right-4 max-md:size-29" viewBox="0 0 24 24" fill="none">
            <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
          <svg className="absolute bottom-3 left-[3%] size-35 opacity-[.05] max-md:bottom-2.5 max-md:left-[4%] max-md:size-20.5" viewBox="0 0 24 24" fill="none">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
          </svg>
        </>
      )}
      <svg className="absolute top-[42%] right-[33%] size-13 opacity-[.06] max-md:hidden" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 2 12l10 10 10-10z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

function HeadingIcon() {
  return (
    <span className="inline-flex size-7.5 items-center justify-center rounded-[9px] border-[1.5px] border-navy bg-yellow text-navy max-md:size-7 max-md:rounded-lg">
      <svg className="size-4.25 max-md:size-3.75" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.68 5.43 5.99.87-4.34 4.23 1.02 5.97L12 15.68 6.65 18.5l1.02-5.97L3.33 8.3l5.99-.87L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </span>
  );
}

export function ArticleListSection({
  posts,
  title = '新着記事',
  englishTitle = 'New Posts',
  lead,
  variant = 'primary',
  className = '',
  showArchiveLink = true,
}: Props) {
  if (posts.length === 0) {
    return null;
  }

  const [featuredPost, ...restPosts] = posts;
  const isRecommended = englishTitle.toLowerCase().includes('recommended');
  const sectionType = isRecommended ? 'recommended' : 'new';
  const cardClass =
    'fade border-[1.5px] border-navy bg-white text-navy transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(23,35,61,.14)]';
  const thumbClass =
    'relative flex aspect-video items-center justify-center overflow-hidden bg-[#EFE7D5]';
  const featuredOrderClass = isRecommended ? 'md:order-1' : 'md:order-2';
  const listOrderClass = isRecommended ? 'md:order-2' : 'md:order-1';

  return (
    <section className={`relative isolate overflow-hidden ${sectionClass} article-list-section article-list-section--${variant} ${className}`}>
      <SectionBackground type={sectionType} />
      <div className={innerClass}>
        <div className="fade flex flex-wrap items-end justify-between gap-8 max-md:block">
          <div>
            <span className={outlineTitleClass}>{englishTitle}</span>
            <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
              <HeadingIcon />
              <h2 className="text-lg leading-[1.5] font-black max-md:text-base">{title}</h2>
            </div>
            {lead && <p className="mt-4 max-w-160 text-sm leading-[2] text-[#33405A] max-md:mt-3.5 max-md:text-[13px] max-md:leading-[1.95]">{lead}</p>}
          </div>
          {showArchiveLink && (
            <Link className={`${pillClass} mb-0.5 max-md:hidden`} href="/column">
              記事一覧を見る
              <span className={pillArrowClass}><ArrowIcon /></span>
            </Link>
          )}
        </div>
        <div className="mt-9.5 grid grid-cols-[1.08fr_1fr] items-start gap-6.5 max-md:mt-6 max-md:grid-cols-1 max-md:gap-3.5">
          <Link className={`${cardClass} ${featuredOrderClass} order-1 block overflow-hidden rounded-2xl shadow-[6px_6px_0_rgba(23,35,61,.08)] max-md:rounded-2xl max-md:shadow-[5px_5px_0_rgba(23,35,61,.1)]`} href={`/column/${featuredPost.id}`}>
            <div className={`${thumbClass} border-b-[1.5px] border-navy`}>
              <Image
                src={featuredPost.image.url}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 768px) calc(100vw - 44px), 575px"
                className="!h-full !w-full object-cover opacity-100"
              />
            </div>
            <div className="px-6 py-5.5 max-md:px-4.5 max-md:py-4.5">
              <PostMeta post={featuredPost} />
              <h3 className="line-clamp-2 text-xl leading-[1.65] font-extrabold max-md:text-[17px] max-md:leading-[1.6]">{featuredPost.title}</h3>
            </div>
          </Link>
          <div className={`${listOrderClass} order-2 flex flex-col gap-4 max-md:gap-3.25`}>
            {restPosts.slice(0, 3).map((post) => (
              <Link className={`${cardClass} grid grid-cols-[136px_1fr] items-center gap-4 rounded-[14px] p-3 max-md:grid-cols-[112px_1fr] max-md:gap-3.5 max-md:p-2.75`} key={post.id} href={`/column/${post.id}`}>
                <div className={`${thumbClass} rounded-lg border border-navy/25`}>
                  <Image
                    src={post.image.url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 112px, 136px"
                    className="!h-full !w-full object-cover opacity-100"
                  />
                </div>
                <div className="min-w-0">
                  <PostMeta post={post} />
                  <h3 className="line-clamp-2 text-[14.5px] leading-[1.7] font-bold max-md:text-[13px] max-md:leading-[1.65]">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
