import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '../../components/ArrowIcon';
import {
  cardDotsClass,
  innerClass,
  outlineTitleClass,
  pillArrowClass,
  pillClass,
  yellowPillArrowClass,
  yellowPillClass,
} from '../../components/site-design';
import { ogImage, withSiteName } from '../../libs/site-metadata';

const title = withSiteName('運営者について');
const description =
  'Labiteの運営者プロフィール、Webエンジニアを目指す方に向けた発信方針、得意分野について紹介します。';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title,
    description,
    url: '/about',
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

const specialties = [
  {
    number: '01',
    title: 'フロントエンド開発',
    description:
      'HTML・CSS・JavaScriptを中心に、画面設計から実装までを分かりやすく解説します。',
  },
  {
    number: '02',
    title: '学習設計',
    description:
      '未経験から学ぶときに迷いやすい順序を整理し、無理なく継続できる学習方法を考えます。',
  },
  {
    number: '03',
    title: 'キャリア選択',
    description:
      '職場選びや転職準備など、Webエンジニアとして働く前に知っておきたい判断軸を届けます。',
  },
];

const policies = [
  '専門用語をできるだけかみ砕き、初めて学ぶ方にも伝わる表現を使います。',
  '手順だけではなく、なぜその方法を選ぶのかまで説明します。',
  '実際の開発や学習で再現しやすい、具体的な内容を大切にします。',
];

export default function AboutPage() {
  return (
    <main data-rail-label="01">
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
            <li className="flex items-center gap-2.5 text-navy/60">
              <span className="text-navy/50" aria-hidden="true">›</span>
              運営者について
            </li>
          </ol>
        </div>
      </nav>

      <header className="pt-15 pb-12 max-md:pt-10 max-md:pb-8">
        <div className={`${innerClass} fade is-show`}>
          <span className={outlineTitleClass}>About</span>
          <h1 className="mt-3.5 text-[clamp(24px,3vw,32px)] font-black tracking-[.04em]">
            運営者について
          </h1>
          <p className="mt-3.5 max-w-170 text-[14.5px] text-navy/88 max-md:text-[13.5px]">
            Labiteを運営し、未経験からWebエンジニアを目指す方に向けて、学習・開発・キャリアに役立つ情報を発信しています。
          </p>
        </div>
      </header>

      <section className="border-y-[1.5px] border-navy bg-pale-blue py-20 max-md:py-14">
        <div className={innerClass}>
          <div
            className={`fade relative rounded-2xl border-[1.5px] border-navy bg-white px-12 py-14 max-md:px-5.5 max-md:py-10 ${cardDotsClass}`}
          >
            <div className="grid grid-cols-[240px_1fr] items-center gap-12 max-md:grid-cols-1 max-md:justify-items-center max-md:gap-8">
              <div className="flex size-50 items-center justify-center overflow-hidden rounded-full border-[3px] border-yellow bg-pale-blue max-md:size-35">
                <Image
                  className="h-11 w-auto max-md:h-9"
                  src="/images/site-logo.svg"
                  alt="Labite運営者"
                  width={150}
                  height={50}
                  priority
                />
              </div>
              <div className="w-full">
                <p className="mb-1 text-xl font-bold">Labite 運営者</p>
                <p className="mb-4 text-[13px] font-bold text-[#C99514]">Webエンジニア</p>
                <p className="mb-6 text-[15px] text-navy/90">
                  Web開発の現場で得た知識をもとに、未経験の方がつまずきやすいポイントを整理して記事にしています。情報を並べるだけでなく、次に何をすればよいかが分かる発信を目指しています。
                </p>
                <dl>
                  <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
                    <dt className="font-bold text-blue">経験</dt>
                    <dd>Web開発の実務経験</dd>
                  </div>
                  <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
                    <dt className="font-bold text-blue">得意分野</dt>
                    <dd>フロントエンド開発・学習設計</dd>
                  </div>
                  <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
                    <dt className="font-bold text-blue">発信内容</dt>
                    <dd>学習手順・開発ノウハウ・キャリア情報</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 max-md:py-16">
        <div className={innerClass}>
          <div className="fade mb-12 max-md:mb-8">
            <span className={outlineTitleClass}>Specialty</span>
            <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">得意分野</h2>
          </div>
          <div className="grid grid-cols-3 gap-5.5 max-md:grid-cols-1">
            {specialties.map((specialty) => (
              <article
                className={`fade relative flex min-h-63 flex-col rounded-2xl border-2 border-navy bg-white px-6 pt-9 pb-7 transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-[#d9a521] max-md:min-h-0 ${cardDotsClass}`}
                key={specialty.number}
              >
                <span className="absolute -top-4 left-5 rounded-full border-[1.5px] border-navy bg-yellow px-3.5 py-1 font-[family-name:var(--font-oswald)] text-[12px] font-bold tracking-[.12em] text-navy">
                  NO.{specialty.number}
                </span>
                <h3 className="mb-3 border-b-[1.5px] border-dashed border-navy/35 pb-3 text-lg font-bold">
                  {specialty.title}
                </h3>
                <p className="text-[13.5px] leading-[1.85] text-navy/85">{specialty.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-[1.5px] border-navy bg-yellow py-24 max-md:py-16">
        <div className={innerClass}>
          <div className="grid grid-cols-[.8fr_1.2fr] gap-16 max-md:grid-cols-1 max-md:gap-8">
            <div className="fade">
              <span className={outlineTitleClass}>Policy</span>
              <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">発信で大切にしていること</h2>
            </div>
            <ol className="fade rounded-xl border-[1.5px] border-navy bg-white px-8 py-5 max-md:px-5">
              {policies.map((policy, index) => (
                <li
                  className="grid grid-cols-[42px_1fr] items-start gap-4 border-b-[1.5px] border-dashed border-navy/40 py-5 last:border-b-0"
                  key={policy}
                >
                  <span className="flex size-10 items-center justify-center rounded-full border-[1.5px] border-navy bg-pale-blue font-[family-name:var(--font-oswald)] text-sm font-bold text-blue">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="pt-1 text-[14px] font-medium">{policy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 max-md:py-16">
        <div className={innerClass}>
          <div
            className={`fade relative mx-auto max-w-210 rounded-2xl border-[1.5px] border-navy bg-white px-8 py-16 text-center max-md:px-5.5 max-md:py-12 ${cardDotsClass}`}
          >
            <span className={`${outlineTitleClass} text-[clamp(28px,4vw,44px)]`}>Next</span>
            <h2 className="mb-3.5 text-[clamp(20px,2.6vw,26px)]">
              学習に役立つ記事を読む
            </h2>
            <p className="mx-auto mb-7.5 max-w-140 text-[14px]">
              学習の始め方から開発、キャリアまで、今の目的に合った記事を探せます。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link className={yellowPillClass} href="/column">
                記事一覧を見る
                <span className={yellowPillArrowClass}>
                  <ArrowIcon />
                </span>
              </Link>
              <Link className={pillClass} href="/contact">
                お問い合わせ
                <span className={pillArrowClass}>
                  <ArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
