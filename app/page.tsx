import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleListSection } from '../components/ArticleListSection';
import { HomeHero } from '../components/HomeHero';
import { ProfileCard } from '../components/ProfileCard';
import { RoadmapSection } from '../components/RoadmapSection';
import { outlineTitleClass } from '../components/site-design';
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
        <span className="absolute top-3 right-5.5 font-mono text-6xl leading-none font-bold text-navy/7 max-md:top-2.5 max-md:right-4 max-md:text-5xl">
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

function AboutBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden" aria-hidden="true">
      <svg className="absolute -top-7 right-18 size-50 opacity-[.06] max-md:-top-4 max-md:right-4 max-md:size-29" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="5" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
        <path d="M20 21a8 8 0 0 0-16 0" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
      <svg className="absolute bottom-2 left-[3%] size-37.5 opacity-[.05] max-md:size-21" viewBox="0 0 24 24" fill="none">
        <path d="m7 11 2-2-2-2M11 13h4" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
        <rect width="18" height="18" x="3" y="3" rx="2" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
      <svg className="absolute top-[42%] right-[33%] size-13 opacity-[.06] max-md:hidden" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 2 12l10 10 10-10z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

function AboutHeadingIcon() {
  return (
    <span className="inline-flex size-7.5 items-center justify-center rounded-[9px] border-[1.5px] border-navy bg-yellow text-navy max-md:size-7 max-md:rounded-lg">
      <svg className="size-4 max-md:size-3.75" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </span>
  );
}

function ContactHeadingIcon() {
  return (
    <span className="inline-flex size-7.5 items-center justify-center rounded-[9px] border-[1.5px] border-navy bg-yellow text-navy max-md:size-7 max-md:rounded-lg">
      <svg className="size-4 max-md:size-3.75" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </span>
  );
}

function ContactStamp({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? 'relative w-18.5 flex-none' : 'relative w-24'}
      aria-hidden="true"
    >
      <div className={`${compact ? 'rounded-[5px] border-2 p-1.25' : 'rounded-md border-2 p-1.75'} rotate-[3deg] overflow-hidden border-dashed border-navy bg-[#DCE8FA]`}>
        <Image
          className="h-auto w-full"
          src="/images/contact-person.svg"
          alt=""
          width={compact ? 74 : 96}
          height={compact ? 74 : 96}
        />
        <div className={`${compact ? 'pt-0.5 pb-px text-[6.5px] tracking-[.18em]' : 'pt-0.75 pb-0.5 text-[7.5px] tracking-[.2em]'} text-center font-mono leading-none font-bold text-navy`}>
          LABITE
        </div>
      </div>
      <svg
        className={`${compact ? '-bottom-2.5 -left-16 w-23' : '-bottom-4.5 -left-21 w-30.5'} absolute text-navy opacity-70`}
        viewBox="0 0 104 48"
        fill="none"
      >
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeDasharray="4 3" strokeWidth="2" />
        <image href="/images/rail-site-logo.svg" x="13" y="13" width="22" height="22" preserveAspectRatio="xMidYMid meet" />
        <path d="M52 12 q5 -5 10 0 t10 0 t10 0 t10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M52 24 q5 -5 10 0 t10 0 t10 0 t10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <path d="M52 36 q5 -5 10 0 t10 0 t10 0 t10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
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

      <section className="relative isolate overflow-hidden border-t-[1.5px] border-navy bg-[#E7EEF9] py-22 max-md:px-5.5 max-md:py-12">
        <CategoryBackground />
        <div className="mx-auto max-w-280 px-8 max-md:px-0">
          <div className="fade">
            <span className={outlineTitleClass}>Category</span>
            <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
              <CategoryHeadingIcon />
              <h2 className="text-[17px] leading-[1.5] font-black max-md:text-base">目的から探す</h2>
            </div>
            <p className="mt-4 max-w-160 text-sm leading-[2] text-[#33405A] max-md:mt-3.5 max-md:text-[13px] max-md:leading-[1.95]">
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

      <section className="relative isolate overflow-hidden border-t-[1.5px] border-navy bg-cream py-22 max-md:px-5.5 max-md:py-12" id="about">
        <AboutBackground />
        <div className="mx-auto max-w-280 px-8 max-md:px-0">
          <div className="fade">
            <span className={outlineTitleClass}>About</span>
            <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
              <AboutHeadingIcon />
              <h2 className="text-[17px] leading-[1.5] font-black max-md:text-base">このサイトの運営者</h2>
            </div>
          </div>
          <ProfileCard showProfileLink variant="top" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t-[1.5px] border-navy bg-[#E7EEF9] py-22 max-md:px-5.5 max-md:py-12" id="cta">
        <div className="mx-auto max-w-280 px-8 max-md:px-0">
          <div className="fade">
            <span className={outlineTitleClass}>Contact</span>
            <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
              <ContactHeadingIcon />
              <h2 className="text-[17px] leading-[1.5] font-black max-md:text-base">お問い合わせ</h2>
            </div>
          </div>

          <div className="fade mt-7.5 rounded-[20px] border-[1.5px] border-navy bg-[repeating-linear-gradient(45deg,#F2635F_0_12px,#FFF8EC_12px_24px,#A9C4EE_24px_36px,#FFF8EC_36px_48px)] p-2.5 shadow-[10px_10px_0_rgba(23,35,61,.15)] max-md:mt-5 max-md:rounded-2xl max-md:bg-[repeating-linear-gradient(45deg,#F2635F_0_9px,#FFF8EC_9px_18px,#A9C4EE_18px_27px,#FFF8EC_27px_36px)] max-md:p-2 max-md:shadow-[7px_7px_0_rgba(23,35,61,.15)]">
            <div className="relative overflow-hidden rounded-xl border-[1.5px] border-navy bg-white px-12 py-[46px] pb-10.5 max-md:rounded-[10px] max-md:px-5 max-md:py-5.5 max-md:pb-6">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(23,35,61,.04)_1.5px,transparent_1.5px)] [background-size:20px_20px] max-md:[background-size:16px_16px]" aria-hidden="true" />
              <div className="absolute top-6.5 right-10 max-md:hidden">
                <ContactStamp />
              </div>

              <div className="relative hidden min-h-24 items-start justify-between gap-3.5 max-md:flex">
                <p className="pt-1 font-mono text-[9px] leading-none font-bold tracking-[.3em] text-[#8A8266]">POST CARD</p>
                <ContactStamp compact />
              </div>

              <p className="absolute top-5.5 left-12 font-mono text-[10px] leading-none font-bold tracking-[.34em] text-[#8A8266] max-md:hidden">POST CARD</p>

              <div className="relative mt-6.5 flex items-start gap-14 max-md:mt-4 max-md:block">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[28px] leading-[1.55] font-black text-navy max-md:text-xl max-md:leading-[1.55]">
                    お問い合わせを
                    <br className="hidden max-md:block" />
                    <span className="bg-[linear-gradient(transparent_62%,#F5C543_62%,#F5C543_92%,transparent_92%)] px-0.75 max-md:px-0.5">受け付けています</span>
                  </h3>
                  <p className="mt-4 mb-7.5 max-w-130 text-[14.5px] leading-[2.05] text-[#4A5468] max-md:mt-3 max-md:mb-0 max-md:text-[12.5px] max-md:leading-[1.95]">
                    サイトや記事に関するご質問、お仕事のご相談、その他のご連絡など、内容を問わずお気軽にお問い合わせください。
                  </p>

                  <div className="hidden max-md:my-5.5 max-md:block">
                    <p className="font-mono text-[8.5px] leading-none font-bold tracking-[.24em] text-[#8A8266]">TO :</p>
                    <p className="border-b-[1.5px] border-navy/30 py-2.5 pb-1.5 text-[13.5px] leading-none font-extrabold text-navy">Labite サイト運営者 宛</p>
                  </div>

                  <Link
                    className="group inline-flex items-center gap-3.25 rounded-full border-[1.5px] border-navy bg-[#F2635F] py-2.25 pr-7 pl-2.25 text-[15.5px] font-extrabold !text-white shadow-[4px_4px_0_#17233D] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:!text-white hover:shadow-[5px_5px_0_#17233D] max-md:flex max-md:w-full max-md:justify-center max-md:gap-2.75 max-md:py-2 max-md:pr-4.5 max-md:pl-2 max-md:text-sm max-md:shadow-[3px_3px_0_#17233D]"
                    href="/contact"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-navy bg-white text-[#F2635F] max-md:size-8.5">
                      <svg className="size-4.75 max-md:size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="m22 2-7 20-4-9-9-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d="M22 2 11 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </span>
                    お問い合わせフォームへ
                  </Link>
                </div>

                <div className="w-75 flex-none pt-24 max-md:hidden">
                  <p className="font-mono text-[9.5px] leading-none font-bold tracking-[.26em] text-[#8A8266]">TO :</p>
                  <div className="mt-5 flex flex-col gap-7.5">
                    <span className="block border-b-[1.5px] border-navy/30 pb-1.75 text-[15px] leading-none font-extrabold text-navy">Labite サイト運営者 宛</span>
                    <span className="block border-b-[1.5px] border-navy/18" />
                    <span className="block border-b-[1.5px] border-navy/18" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
