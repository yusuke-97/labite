import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleListSection } from '../components/ArticleListSection';
import { ArrowIcon } from '../components/ArrowIcon';
import { HomeHero } from '../components/HomeHero';
import {
  cardDotsClass,
  innerClass,
  outlineTitleClass,
  sectionClass,
  yellowPillArrowClass,
  yellowPillClass,
} from '../components/site-design';
import { getColumnCategoryCounts, getLatestColumnPosts } from '../libs/column';
import {
  getAbsoluteUrl,
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
} from '../libs/site-metadata';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    absolute: siteTitle,
  },
  description: siteDescription,
  alternates: {
    canonical: '/',
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

const roadmapSteps = [
  {
    number: '1',
    title: '基礎知識',
    description: 'Webの仕組みとHTML/CSSの基本を理解する。最初に押さえる用語と考え方をまとめています。',
    icon: (
      <svg className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 38h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 16l-4 4 4 4M28 16l4 4-4 4" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '2',
    title: '開発環境',
    description: 'エディタやGitなど、開発に必要な道具を整える。つまずきやすい設定を手順で解説します。',
    icon: (
      <svg className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M18 6l-2 6h12l-2-6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="10" y="12" width="24" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="22" cy="25" r="6" stroke="#FFC94B" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'プログラミング',
    description: 'JavaScriptを中心に、手を動かしながら学ぶ。写経から自作までの進め方を整理しています。',
    icon: (
      <svg className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="6" y="6" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2.5" />
        <path d="M14 22h6M14 16h12M14 28h9" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="31" cy="29" r="4" fill="#FFC94B" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: '4',
    title: '実践',
    description: '小さな制作物を作り、コードを読む力を付ける。実務に近い練習方法を紹介します。',
    icon: (
      <svg className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <path d="M8 36V14l14-8 14 8v22" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M8 36h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 36V24h10v12" stroke="#FFC94B" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '5',
    title: 'キャリア',
    description: '職場選びや応募準備を進める。転職で後悔しないための判断軸を整理します。',
    icon: (
      <svg className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <rect x="8" y="14" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 14v-3a4 4 0 014-4h4a4 4 0 014 4v3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 25h12" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

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
  const [posts, categoryCounts] = await Promise.all([
    getLatestColumnPosts(),
    getColumnCategoryCounts(),
  ]);
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    alternateName: ['Labite Tech'],
    url: getAbsoluteUrl('/'),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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

      <section className={`${sectionClass} border-b-[1.5px] border-navy bg-pale-blue`} id="roadmap">
        <div className={innerClass}>
          <SectionHeading
            english="Roadmap"
            title="未経験からWebエンジニアになるための5つのSTEP"
            lead="何から始めればいいか迷わないように、学習の流れを5つの段階に分けました。各STEPのまとめ記事から読み進めてください。"
          />
          <div className="relative mb-12 grid grid-cols-5 gap-4.5 max-md:grid-cols-1 max-md:gap-6.5">
            {roadmapSteps.map((step) => (
              <div className="fade relative flex min-h-73 flex-col rounded-xl border-[1.5px] border-navy bg-white px-4.5 pt-6.5 pb-5.5 transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-[#d9a521] max-md:grid max-md:grid-cols-[48px_1fr] max-md:items-center max-md:gap-x-3.5" key={step.number}>
                <span className="absolute -top-4 left-4 rounded-full border-[1.5px] border-navy bg-yellow px-3 py-1 font-[family-name:var(--font-oswald)] text-xs font-bold tracking-[.08em]">STEP {step.number}</span>
                {step.icon}
                <h3 className="mb-2 text-[17px] max-md:col-start-2 max-md:mb-0">{step.title}</h3>
                <p className="text-[13px] leading-[1.7] text-navy/85 max-md:col-span-2 max-md:mt-3 max-md:text-[13.5px]">{step.description}</p>
                {/* <Link className="mt-auto self-start border-b-[1.5px] border-dashed border-blue pt-3 text-xs font-bold text-blue max-md:col-span-2 max-md:mt-3 max-md:justify-self-start max-md:pt-0" href="/column">まとめ記事へ</Link> */}
              </div>
            ))}
          </div>
          {/* <div className="fade text-center">
            <Link className={yellowPillClass} href="/column">
              ロードマップの記事一覧へ
              <span className={yellowPillArrowClass}><ArrowIcon /></span>
            </Link>
          </div> */}
        </div>
      </section>

      <ArticleListSection posts={posts} />

      <section className={`${sectionClass} bg-white`}>
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
          <SectionHeading english="About" title="この記事を書いている人" />
          <div className={`fade relative rounded-2xl border-[1.5px] border-navy bg-white px-12 py-14 max-md:px-5.5 max-md:py-10 ${cardDotsClass}`}>
            <div className="grid grid-cols-[240px_1fr] items-center gap-12 max-md:grid-cols-1 max-md:justify-items-center max-md:gap-8 max-md:text-left">
              <div className="fade flex size-50 items-center justify-center overflow-hidden rounded-full border-[3px] border-yellow bg-pale-blue max-md:size-35">
                <Image className="h-11 w-auto" src="/images/site-logo.svg" alt="運営者アバター" width={150} height={50} />
              </div>
              <div className="fade">
                <p className="mb-1 text-xl font-bold">Labite 運営者</p>
                <p className="mb-4 text-[13px] font-bold text-[#C99514]">Webエンジニア</p>
                <p className="mb-5.5 max-w-150 text-[15px] text-navy/90">
                  Web開発の現場で得た知識をもとに、未経験の人がつまずきやすいポイントを整理して記事にしています。経歴・得意分野の詳細はプロフィールページをご覧ください。
                </p>
                <ul className="mb-6.5 max-w-150">
                  <li className="flex gap-4 border-b-[1.5px] border-dashed border-[#1D2B50]/45 px-0.5 py-2.5 text-[13.5px]"><span className="w-[8.5em] flex-none font-bold text-[#4A7DFF]">経験</span><span>Web開発の実務経験</span></li>
                  <li className="flex gap-4 border-b-[1.5px] border-dashed border-[#1D2B50]/45 px-0.5 py-2.5 text-[13.5px]"><span className="w-[8.5em] flex-none font-bold text-[#4A7DFF]">得意分野</span><span>フロントエンド開発・学習設計</span></li>
                  <li className="flex gap-4 border-b-[1.5px] border-dashed border-[#1D2B50]/45 px-0.5 py-2.5 text-[13.5px]"><span className="w-[8.5em] flex-none font-bold text-[#4A7DFF]">このサイトで</span><span>学習手順・開発ノウハウ・キャリア情報を発信</span></li>
                </ul>
                <Link className={yellowPillClass} href="/about">
                  プロフィールを見る
                  <span className={yellowPillArrowClass}><ArrowIcon /></span>
                </Link>
              </div>
            </div>
          </div>
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
