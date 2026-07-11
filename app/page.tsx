import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleListSection } from '../components/ArticleListSection';
import { ArrowIcon } from '../components/ArrowIcon';
import { HomeHero } from '../components/HomeHero';
import { ProfileCard } from '../components/ProfileCard';
import { RoadmapSection } from '../components/RoadmapSection';
import {
  cardDotsClass,
  innerClass,
  outlineTitleClass,
  sectionClass,
  yellowPillArrowClass,
  yellowPillClass,
} from '../components/site-design';
import {
  getColumnCategoryCounts,
  getLatestColumnPosts,
  getRecommendedColumnPosts,
} from '../libs/column';
import { getRoadmapSteps } from '../libs/roadmap';
import {
  getAbsoluteUrl,
  ogImage,
  siteDescription,
  siteTitle,
} from '../libs/site-metadata';
import {
  createSitePersonJsonLd,
  createWebSiteJsonLd,
} from '../libs/structured-data';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: getAbsoluteUrl('/'),
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: '/',
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
};

/* const categories = [
  {
    no: 'NO.01',
    title: '学習を始めたい',
    description: '基礎知識・学習手順の記事。最初の一歩をここから。',
    icon: (
      <svg className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="2.5" />
        <path d="M22 14v8l6 4" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    no: 'NO.02',
    title: '学習を続けたい',
    description: '学習習慣・挫折対策の記事。働きながらでも続く方法を。',
    icon: (
      <svg className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M8 34c4-16 8-22 14-22s10 6 14 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 26h16" stroke="#FFC94B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    no: 'NO.03',
    title: '転職の準備をしたい',
    description: '職場選び・キャリアの記事。後悔しない選択のために。',
    icon: (
      <svg className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 14v-3a4 4 0 014-4h4a4 4 0 014 4v3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M8 23h28" stroke="#4A7DFF" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    no: 'NO.04',
    title: '実務に備えたい',
    description: 'コードリーディング・開発ノウハウの記事。現場目線で。',
    icon: (
      <svg className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M14 12l-8 10 8 10M30 12l8 10-8 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25 8l-6 28" stroke="#FFC94B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
]; */

const categoryOrder = ['career', 'programming', 'beginner', 'study-method'];

const categoryStyles = [
  { color: '#F3C9A6', english: 'CAREER' },
  { color: '#C6D9F5', english: 'PROGRAMMING' },
  { color: '#F5C543', english: 'BEGINNER' },
  { color: '#C3E3CE', english: 'LEARNING' },
] as const;

function CategoryBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden" aria-hidden="true">
      <svg className="absolute -top-7 right-16 size-51 opacity-[.06] max-md:-top-4 max-md:right-4 max-md:size-29.5" viewBox="0 0 24 24" fill="none">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
      <svg className="absolute bottom-2 left-[2%] size-37.5 opacity-[.05] max-md:bottom-2 max-md:left-[3%] max-md:size-21.5" viewBox="0 0 24 24" fill="none">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

function CategoryHeadingIcon() {
  return (
    <span className="inline-flex size-7.5 items-center justify-center rounded-[9px] border-[1.5px] border-navy bg-yellow text-navy max-md:size-7 max-md:rounded-lg">
      <svg className="size-4 max-md:size-3.75" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect width="7" height="7" x="14" y="3" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect width="7" height="7" x="14" y="14" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect width="7" height="7" x="3" y="14" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}

function CategoryIcon({ id }: { id: string }) {
  const iconClass = 'size-5.75 max-md:size-5.25';

  if (id === 'programming') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (id === 'beginner') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8ZM14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  if (id === 'study-method') {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="19" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CategoryRings() {
  return (
    <span className="pointer-events-none absolute top-0 bottom-0 left-[67px] z-5 flex -translate-x-1/2 flex-col items-center justify-around py-8 max-md:left-[58.5px] max-md:py-5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((ring) => (
        <span className="relative h-2.75 w-9.5 flex-none max-md:h-2.75 max-md:w-6.5" key={ring}>
          <span className="absolute top-1/2 -left-1 z-1 size-2.25 -translate-y-1/2 rounded-full border-[1.5px] border-navy bg-[#EFE7D5] max-md:-left-1" />
          <span className="absolute top-1/2 -right-1 z-1 size-2.25 -translate-y-1/2 rounded-full border-[1.5px] border-navy bg-[#EFE7D5] max-md:-right-1" />
          <span className="absolute inset-0 z-2 rounded-full border-[1.5px] border-navy bg-[#EFE7D5]" />
        </span>
      ))}
    </span>
  );
}

function CategoryCard({
  category,
  count,
  index,
}: {
  category: { id: string; name: string; metaDescription?: string };
  count: number;
  index: number;
}) {
  const style = categoryStyles[index % categoryStyles.length];

  return (
    <Link
      className="fade relative flex min-h-48 items-stretch gap-1.5 rounded-2xl text-navy transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgba(23,35,61,.16)] max-md:min-h-0 max-md:gap-1.25"
      href={`/column/category/${encodeURIComponent(category.id)}`}
    >
      <div className="w-16 shrink-0 rounded-l-2xl border-[1.5px] border-navy max-md:w-14" style={{ backgroundColor: style.color }} />
      <div className="relative flex-1 overflow-hidden rounded-r-2xl border-[1.5px] border-navy bg-white px-7 py-6.5 max-md:px-5.5 max-md:py-5.5">
        <span className="absolute top-3 right-5.5 font-mono text-[60px] leading-none font-bold text-navy/7 max-md:top-2.5 max-md:right-4 max-md:text-[48px]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative z-1 flex items-center gap-3.5 max-md:gap-2.75">
          <span className="inline-flex size-11.5 items-center justify-center rounded-xl border-[1.5px] border-navy text-navy max-md:size-10.5 max-md:rounded-[11px]" style={{ backgroundColor: style.color }}>
            <CategoryIcon id={category.id} />
          </span>
          <span className="flex min-w-0 flex-col gap-1 max-md:gap-0.75">
            <span className="flex min-w-0 flex-wrap items-center gap-2.5 max-md:gap-2">
              <h3 className="text-[19px] leading-[1.4] font-black max-md:text-[17px]">{category.name}</h3>
              <span className="inline-flex items-center gap-1.25 rounded-full border-[1.5px] border-navy px-2.5 py-1 font-mono text-[10px] leading-none font-bold max-md:px-2.25 max-md:py-0.75 max-md:text-[9px]" style={{ backgroundColor: style.color }}>
                <span className="size-1.25 rounded-full bg-navy max-md:size-1" />
                {count}記事
              </span>
            </span>
            <span className="font-mono text-[10px] leading-none tracking-[.28em] text-[#98A1B5] uppercase max-md:text-[9px] max-md:tracking-[.2em]">
              {style.english}
            </span>
          </span>
        </div>
        {category.metaDescription && (
          <p className="relative z-1 mt-4 text-[13px] leading-[2] text-[#414B60] max-md:mt-3.25 max-md:text-[12.5px] max-md:leading-[1.9]">
            {category.metaDescription}
          </p>
        )}
      </div>
      <CategoryRings />
    </Link>
  );
}

function SectionHeading({
  english,
  title,
  lead,
}: {
  english: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="fade mb-12">
      <span className={outlineTitleClass}>{english}</span>
      <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">{title}</h2>
      {lead && <p className="mt-3.5 max-w-170">{lead}</p>}
    </div>
  );
}

export default async function Home() {
  const [posts, recommendedPosts, categoryCounts, roadmapSteps] = await Promise.all([
    getLatestColumnPosts(),
    getRecommendedColumnPosts(),
    getColumnCategoryCounts(),
    getRoadmapSteps(),
  ]);
  const websiteJsonLd = createWebSiteJsonLd();
  const personJsonLd = createSitePersonJsonLd();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <HomeHero />

      <div className="group overflow-hidden border-y-[1.5px] border-navy bg-yellow py-3" aria-hidden="true">
        <div className="flex w-max animate-[tick_30s_linear_infinite] items-center gap-10 whitespace-nowrap font-[family-name:var(--font-oswald)] text-[15px] font-semibold tracking-[.12em] uppercase group-hover:[animation-play-state:paused] max-md:gap-7 max-md:text-[13px] motion-reduce:animate-none">
          {[...Array(4)].map((_, groupIndex) => (
            <span key={groupIndex} className="contents">
              <Image className="h-5.5 w-auto flex-none max-md:h-4.5" src="/images/rail-site-logo.svg" alt="Labite" width={150} height={50} />
              <span>— LEARN / BUILD / WORK —</span>
              <Image className="h-5.5 w-auto flex-none max-md:h-4.5" src="/images/rail-site-logo.svg" alt="Labite" width={150} height={50} />
              <span>— WEB ENGINEERING FOR BEGINNERS —</span>
            </span>
          ))}
        </div>
      </div>

      <ArticleListSection
        posts={recommendedPosts}
        title="おすすめ記事"
        englishTitle="Recommended Posts"
        lead="未経験からWebエンジニアを目指す方に、まず読んでほしい記事をまとめています。学習の進め方やキャリアの考え方など、迷ったときの入口になる内容をピックアップしています。"
        className="border-b-[1.5px] border-navy"
        showArchiveLink={false}
      />

      <RoadmapSection steps={roadmapSteps} className="border-b-[1.5px] border-navy" />

      <ArticleListSection
        posts={posts}
        lead="Webエンジニア学習、未経験からの転職、現場で役立つ考え方など、Labiteで公開した最新の記事を掲載しています。気になるテーマから読み進めてください。"
      />

      <section className="relative isolate overflow-hidden border-t-[1.5px] border-navy bg-[#E7EEF9] py-[88px] max-md:px-[22px] max-md:py-12">
        <CategoryBackground />
        <div className="mx-auto max-w-280 px-8 max-md:px-0">
          <div className="fade">
            <span className={outlineTitleClass}>Category</span>
            <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
              <CategoryHeadingIcon />
              <h2 className="text-[17px] leading-[1.5] font-black max-md:text-[16px]">目的から探す</h2>
            </div>
            <p className="mt-4 max-w-160 text-[14px] leading-[2] text-[#33405A] max-md:mt-3.5 max-md:text-[13px] max-md:leading-[1.95]">
              単語ではなく目的で記事をまとめています。今の状況に近いものから選んでください。
            </p>
          </div>
          <div className="mt-9.5 grid grid-cols-2 gap-5 max-md:mt-6 max-md:grid-cols-1 max-md:gap-3.5">
            {[...categoryCounts]
              .sort((a, b) => {
                const aIndex = categoryOrder.indexOf(a.category.id);
                const bIndex = categoryOrder.indexOf(b.category.id);
                return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
              })
              .map(({ category, count }, index) => (
                <CategoryCard category={category} count={count} index={index} key={category.id} />
              ))}
          </div>
        </div>
      </section>

      <section className={`${sectionClass} border-y-[1.5px] border-navy bg-pale-blue`} id="about">
        <div className={innerClass}>
          <SectionHeading english="About" title="このサイトの運営者" />
          <ProfileCard showProfileLink />
        </div>
      </section>

      <section className={sectionClass} id="cta">
        <div className={innerClass}>
          <div className={`fade relative mx-auto max-w-210 rounded-2xl border-[1.5px] border-navy bg-white px-8 py-16 text-center max-md:px-5.5 max-md:py-12 ${cardDotsClass}`}>
            <span className={`${outlineTitleClass} text-[clamp(28px,4vw,44px)]`}>Contact</span>
            <h2 className="mb-3.5 text-[clamp(20px,2.6vw,26px)]">お問い合わせを受け付けています</h2>
            <p className="mx-auto mb-7.5 max-w-140">サイトや記事に関するご質問、お仕事のご相談、その他のご連絡など、内容を問わずお気軽にお問い合わせください。</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link className={yellowPillClass} href="/contact">
                お問い合わせ
                <span className={yellowPillArrowClass}><ArrowIcon /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
