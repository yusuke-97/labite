import type { Metadata } from 'next';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '../../components/ArrowIcon';
import {
  cardDotsClass,
  innerClass,
  outlineTitleClass,
  pillArrowClass,
  pillClass,
  sectionClass,
  yellowPillArrowClass,
  yellowPillClass,
} from '../../components/site-design';
import { getRoadmapPointText, getRoadmapSteps, type RoadmapStep } from '../../libs/roadmap';
import { ogImage, withSiteName } from '../../libs/site-metadata';
import { createBreadcrumbListJsonLd } from '../../libs/structured-data';

const title = withSiteName('未経験からWebエンジニアになる学習ロードマップ');
const description =
  '何から始めればいいか迷わないよう、未経験からWebエンジニアになるまでの学習を5つのSTEPに整理しました。マインドセットから実務サバイバルまで、進む順番がわかるロードマップです。';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title,
    description,
    url: '/roadmap',
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage.url],
  },
};

function Description({ html }: { html: string }) {
  if (html.includes('<')) {
    return (
      <div
        className="mb-5 max-w-190 text-[14.5px] leading-[1.9] text-navy/88 [&_p]:mb-4 [&_p:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <p className="mb-5 max-w-190 text-[14.5px] leading-[1.9] text-navy/88">{html}</p>;
}

function RelatedArticles({ step }: { step: RoadmapStep }) {
  const articles = step.relatedArticles ?? [];

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border-t-[1.5px] border-dashed border-navy/35 pt-8">
      <h3 className="mb-5 flex items-baseline gap-2.5 text-[15px] font-black">
        このSTEPで読みたい記事
        <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.18em] text-blue uppercase">
          related posts
        </span>
      </h3>
      <div className="grid max-w-180 grid-cols-2 gap-5 max-md:grid-cols-1">
        {articles.map((article) => (
          <Link
            className="group overflow-hidden rounded-xl border-[1.5px] border-navy bg-cream transition-[transform,border-color] duration-250 hover:-translate-y-0.75 hover:border-[#d9a521]"
            href={`/column/${article.id}`}
            key={article.id}
          >
            <div className="relative aspect-video overflow-hidden border-b-[1.5px] border-navy bg-pale-blue">
              <Image
                src={article.image.url}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="px-5 py-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue px-2.5 py-0.5 text-[10.5px] font-bold text-white">
                  {article.category.name}
                </span>
                <time className="font-[family-name:var(--font-oswald)] text-[11px] tracking-[.08em] text-navy/65" dateTime={article.publishedAt}>
                  {dayjs(article.publishedAt).format('YYYY.MM.DD')}
                </time>
              </div>
              <p className="line-clamp-2 text-[13.5px] leading-[1.7] font-bold">{article.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function RoadmapPage() {
  const steps = await getRoadmapSteps();
  const breadcrumbJsonLd = createBreadcrumbListJsonLd([
    { name: 'TOP', path: '/' },
    { name: '学習ロードマップ', path: '/roadmap' },
  ]);

  return (
    <main data-rail-label="01">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav
        className="mt-18 overflow-x-auto border-b-[1.5px] border-navy bg-white py-2.5 text-xs leading-[1.8] whitespace-nowrap max-md:mt-15 max-md:py-2 max-md:text-[11px]"
        aria-label="パンくずリスト"
      >
        <div className={innerClass}>
          <ol className="flex items-center gap-2.5">
            <li>
              <Link
                href="/"
                className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue"
              >
                TOP
              </Link>
            </li>
            <li className="flex items-center gap-2.5 text-navy/60" aria-current="page">
              <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
              学習ロードマップ
            </li>
          </ol>
        </div>
      </nav>

      <header className="pt-15 pb-12 max-md:pt-10 max-md:pb-8">
        <div className={`${innerClass} fade is-show`}>
          <span className={outlineTitleClass}>Roadmap</span>
          <h1 className="mt-3.5 text-[clamp(24px,3vw,32px)] font-black tracking-[.04em]">
            未経験からWebエンジニアを目指すロードマップ
          </h1>
          <p className="mt-3.5 max-w-180 text-[14.5px] leading-[1.9] text-navy/88 max-md:text-[13.5px]">
            何から始めればいいか迷わないよう、未経験からWebエンジニアになるまでの学習を5つのSTEPに整理しました。マインドセットから実務サバイバルまで、進む順番がわかるロードマップです。
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link className={yellowPillClass} href="#steps">
              STEPを見る
              <span className={yellowPillArrowClass}><ArrowIcon /></span>
            </Link>
            <Link className={pillClass} href="/column">
              記事一覧を見る
              <span className={pillArrowClass}><ArrowIcon /></span>
            </Link>
          </div>
        </div>
      </header>

      <section className={`${sectionClass} border-y-[1.5px] border-navy bg-pale-blue`} id="steps">
        <div className={innerClass}>
          <div className="flex flex-col gap-12 max-md:gap-9">
            {steps.map((step) => {
              const points = (step.points ?? [])
                .map(getRoadmapPointText)
                .filter(Boolean);

              return (
                <section
                  className={`fade relative grid grid-cols-[150px_minmax(0,1fr)] gap-10 rounded-2xl border-2 border-navy bg-white px-10 py-12 max-lg:grid-cols-1 max-lg:gap-6 max-md:px-5.5 max-md:py-8 ${cardDotsClass}`}
                  id={`step-${step.stepNumber}`}
                  key={step.id}
                >
                  <div>
                    <span className="inline-flex rounded-full border-2 border-navy bg-yellow px-4 py-1 font-[family-name:var(--font-oswald)] text-[13px] font-bold tracking-[.12em]">
                      STEP {step.stepNumber}
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 font-[family-name:var(--font-oswald)] text-[12px] font-bold tracking-[.16em] text-blue uppercase">
                      {step.lead}
                    </p>
                    <h2 className="mb-5 text-[clamp(20px,2.5vw,26px)] font-black">{step.title}</h2>
                    <Description html={step.description} />
                    {points.length > 0 && (
                      <ul className="mt-6 grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                        {points.map((point) => (
                          <li
                            className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-navy bg-pale-blue px-4 py-3 text-[13px] font-bold"
                            key={point}
                          >
                            <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-navy bg-yellow text-[10px]">✓</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <RelatedArticles step={step} />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-navy py-20 max-md:py-14">
        <div className={innerClass}>
          <div className={`fade relative mx-auto max-w-210 rounded-2xl border-2 border-navy bg-white px-8 py-14 text-center max-md:px-5.5 max-md:py-11 ${cardDotsClass}`}>
            <span className={`${outlineTitleClass} text-[clamp(28px,4vw,44px)]`}>Next</span>
            <h2 className="mb-3.5 text-[clamp(20px,2.6vw,26px)]">今のステップに合う記事を探す</h2>
            <p className="mx-auto mb-7.5 max-w-140 text-[14px]">
              ロードマップで現在地を確認したら、記事一覧から必要な内容を読み進めてください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link className={yellowPillClass} href="/column">
                記事一覧を見る
                <span className={yellowPillArrowClass}><ArrowIcon /></span>
              </Link>
              <Link className={pillClass} href="/contact">
                お問い合わせ
                <span className={pillArrowClass}><ArrowIcon /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
