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
  createSiteOrganizationJsonLd,
  createSitePersonJsonLd,
  createWebSiteJsonLd,
} from '../libs/structured-data';

export const dynamic = 'force-dynamic';

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

const categoryIcons = [
  (
    <svg key="clock" className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path d="M22 14v8l6 4" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="mountain" className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M8 34c4-16 8-22 14-22s10 6 14 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 26h16" stroke="#FFC94B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg key="briefcase" className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="28" height="20" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 14v-3a4 4 0 014-4h4a4 4 0 014 4v3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 23h28" stroke="#4A7DFF" strokeWidth="2.5" />
    </svg>
  ),
  (
    <svg key="code" className="w-11 flex-none text-[#1D2B50]" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M14 12l-8 10 8 10M30 12l8 10-8 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 8l-6 28" stroke="#FFC94B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
];

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
  const organizationJsonLd = createSiteOrganizationJsonLd();
  const personJsonLd = createSitePersonJsonLd();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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

      <section className={`${sectionClass} border-t-[1.5px] border-navy bg-white`}>
        <div className={innerClass}>
          <SectionHeading
            english="Category"
            title="目的から探す"
            lead="単語ではなく目的で記事をまとめています。今の状況に近いものから選んでください。"
          />
          <div className="grid grid-cols-2 gap-5.5 max-md:grid-cols-1">
            {categoryCounts.map(({ category, count }, index) => (
              <Link className="fade relative flex items-start gap-5 rounded-xl border-[1.5px] border-navy bg-cream py-7 pr-18 pl-7 transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-[#d9a521]" href={`/column/category/${encodeURIComponent(category.id)}`} key={category.id}>
                <span className="absolute -top-3.5 left-5 rounded-full border-[1.5px] border-navy bg-yellow px-3 py-0.5 font-[family-name:var(--font-oswald)] text-[11px] font-bold tracking-[.08em]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {categoryIcons[index % categoryIcons.length]}
                <div>
                  <span className="inline-flex w-fit rounded-full border-[1.5px] border-navy bg-white px-3 py-0.75 text-[12px] font-bold text-blue">
                    {count}記事
                  </span>
                  <h3 className="mt-0.5 mb-1.5 text-lg">{category.name}</h3>
                  {category.metaDescription && (
                    <p className="text-[13.5px] text-[#1D2B50]/85">{category.metaDescription}</p>
                  )}
                </div>
                <span className="absolute top-1/2 right-5 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-navy bg-yellow text-[13px]"><ArrowIcon /></span>
              </Link>
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
