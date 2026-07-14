import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '../../components/ArrowIcon';
import { ProfileCard } from '../../components/ProfileCard';
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
import {
  createBreadcrumbListJsonLd,
  createProfilePageJsonLd,
} from '../../libs/structured-data';

const title = withSiteName('運営者について');
const description =
  'Labite運営者のプロフィール。未経験からWebエンジニアになり、実務でPHP・Laravel・JavaScriptを用いた開発に従事。学習・開発・キャリア情報を発信しています。';

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
    title: 'バックエンド開発',
    description:
      'PHP・Laravelを用いたWebアプリ開発。サーバーサイドの設計・実装を、初学者にも分かるように解説します。',
  },
  {
    number: '02',
    title: 'フロントエンド',
    description:
      'JavaScriptを中心に、画面の実装やUIの動きを分かりやすく届けます。',
  },
  {
    number: '03',
    title: '学習設計・キャリア',
    description:
      '未経験から学ぶ順序の整理と、職場選び・転職準備など働く前に知っておきたい判断軸を伝えます。',
  },
];

const career = [
  { title: '未経験からスタート', description: '別分野からWeb開発の世界へ' },
  { title: 'オンラインスクールで学習', description: 'HTML・CSS・JavaScript・PHPを学ぶ' },
  { title: '実務へ（2年以上）', description: 'PHP・Laravel・JavaScriptで開発に従事' },
  { title: 'Labiteで発信', description: '同じ道を目指す人へ、現場の知見を整理' },
];

const policies = [
  '専門用語をできるだけかみ砕き、初めて学ぶ方にも伝わる表現を使います。',
  '手順だけでなく、なぜその方法を選ぶのかまで説明します。',
  '実際の開発や学習で再現しやすい、具体的な内容を大切にします。',
];

export default function AboutPage() {
  const breadcrumbJsonLd = createBreadcrumbListJsonLd([
    { name: 'TOP', path: '/' },
    { name: '運営者について', path: '/about' },
  ]);

  const profilePageJsonLd = createProfilePageJsonLd();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
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
            <li className="flex items-center gap-2.5 text-navy/60">
              <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
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
            未経験からWebエンジニアになり、現在は実務でPHP・Laravel・JavaScriptを用いた開発に従事しています。同じ道を通った経験をもとに、学習・開発・キャリアに役立つ情報を、現場の目線で発信しています。
          </p>
        </div>
      </header>

      <section className="border-y-[1.5px] border-navy bg-pale-blue py-20 max-md:py-14">
        <div className={innerClass}>
          <ProfileCard />
        </div>
      </section>

      <section className="border-b-[1.5px] border-navy py-24 max-md:py-16">
        <div className={innerClass}>
          <div className="fade mb-12 max-md:mb-8">
            <span className={outlineTitleClass}>Career</span>
            <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">これまでの歩み</h2>
          </div>
          <ol className="fade relative mx-auto max-w-180 pl-9 before:absolute before:top-2 before:bottom-2 before:left-2 before:w-0.5 before:bg-navy">
            {career.map((item) => (
              <li
                className="relative pb-7 last:pb-0 before:absolute before:top-1 before:-left-9 before:size-5 before:rounded-full before:border-[1.5px] before:border-navy before:bg-yellow"
                key={item.title}
              >
                <h3 className="font-bold">{item.title}</h3>
                <p className="mt-1 text-[13.5px] text-navy/75">{item.description}</p>
              </li>
            ))}
          </ol>
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
            <span className={`${outlineTitleClass} text-[clamp(28px,4vw,44px)]`}>Contact</span>
            <h2 className="mb-3.5 text-[clamp(20px,2.6vw,26px)]">
              お仕事・ご相談・ご質問
            </h2>
            <p className="mx-auto mb-7.5 max-w-140 text-[14px]">
              記事へのご質問のほか、執筆・開発のご依頼、その他のご相談も受け付けています。お気軽にご連絡ください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link className={yellowPillClass} href="/contact">
                お問い合わせ
                <span className={yellowPillArrowClass}>
                  <ArrowIcon />
                </span>
              </Link>
              <Link className={pillClass} href="/column">
                記事一覧を見る
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
