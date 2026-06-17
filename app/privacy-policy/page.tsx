import type { Metadata } from 'next';
import Link from 'next/link';
import { withSiteName } from '../../libs/site-metadata';

const title = withSiteName('プライバシーポリシー');
const description =
  'Labiteのプライバシーポリシーです。個人情報の取り扱い、アクセス解析、Cookie、広告・アフィリエイト、免責事項について掲載しています。';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title,
    description,
    url: '/privacy-policy',
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
};

const sections = [
  {
    title: '個人情報の利用目的',
    paragraphs: [
      '当サイトでは、お問い合わせやコメント等の際に、名前、メールアドレス等の個人情報をご入力いただく場合があります。',
      '取得した個人情報は、お問い合わせへの回答や必要な情報を電子メール等でご連絡する場合に利用し、これらの目的以外では利用しません。',
    ],
  },
  {
    title: '個人情報の第三者への開示',
    paragraphs: [
      '当サイトでは、法令に基づき開示が必要となる場合を除き、本人の同意なく個人情報を第三者に開示することはありません。',
    ],
  },
  {
    title: 'アクセス解析ツールについて',
    paragraphs: [
      '当サイトでは、サイトの利用状況を把握し、コンテンツ改善に役立てるため、Google Tag Manager等のアクセス解析関連ツールを利用する場合があります。',
      'これらのツールはCookieを使用して匿名のトラフィックデータを収集することがあります。収集される情報は個人を特定するものではありません。',
      'Cookieの使用を望まない場合は、ブラウザの設定によりCookieを無効にできます。',
    ],
  },
  {
    title: 'Cloudflare Turnstileの利用について',
    paragraphs: [
      '当サイトでは、お問い合わせフォームの不正利用やスパム送信を防止するため、Cloudflare, Inc.が提供するCloudflare Turnstileを利用しています。',
      'Turnstileの利用に伴い、IPアドレス、ブラウザ情報、TLSフィンガープリント、ユーザーエージェント、サイトキーおよびアクセス元などの情報がCloudflareによって処理される場合があります。',
      'これらの情報は、利用者が人間であるか自動化されたプログラムであるかを判定し、当サイトの安全性を確保する目的で使用されます。',
    ],
    link: {
      href: 'https://www.cloudflare.com/turnstile-privacy-policy/',
      label: 'Cloudflare Turnstile Privacy Addendum',
    },
  },
  {
    title: '広告・アフィリエイトプログラムについて',
    paragraphs: [
      '当サイトでは、今後、第三者配信の広告サービスやアフィリエイトプログラムを利用する場合があります。',
      '広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。',
      '当サイトに掲載している商品・サービスの購入や契約は、リンク先の販売店・事業者との直接取引となります。商品・サービスに関するお問い合わせは、リンク先の事業者へお願いいたします。',
    ],
  },
  {
    title: '免責事項',
    paragraphs: [
      '当サイトに掲載する情報は、できる限り正確な内容を提供するよう努めていますが、正確性や安全性を保証するものではありません。',
      '当サイトの情報を利用することで生じた損害等について、当サイトでは責任を負いかねます。',
      '当サイトからリンクやバナー等によって他サイトへ移動した場合、移動先サイトで提供される情報・サービス等について当サイトでは責任を負いません。',
    ],
  },
  {
    title: '著作権について',
    paragraphs: [
      '当サイトに掲載している文章、画像、動画等の著作物の無断転載・無断使用を禁じます。',
      '引用の範囲を超える利用を行う場合は、事前にお問い合わせください。',
    ],
  },
  {
    title: 'プライバシーポリシーの変更について',
    paragraphs: [
      '当サイトは、法令の変更や運営方針の変更に応じて、本ポリシーの内容を予告なく変更する場合があります。',
      '変更後のプライバシーポリシーは、当ページに掲載した時点で効力を生じるものとします。',
    ],
  },
];

const innerClass = 'mx-auto w-full max-w-220 px-6';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <nav
        className="mt-18 overflow-x-auto border-b-[1.5px] border-navy bg-white py-2.5 text-xs leading-[1.8] whitespace-nowrap max-md:mt-15 max-md:py-2 max-md:text-[11px]"
        aria-label="パンくずリスト"
      >
        <div className={innerClass}>
          <ol
            className="flex items-center gap-2.5"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                className="breadcrumb-link font-medium hover:border-b-[1.5px] hover:border-dotted hover:border-blue"
                itemProp="item"
              >
                <span itemProp="name">TOP</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li
              className="flex items-center gap-2.5 text-navy/60"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              aria-current="page"
            >
              <span className="breadcrumb-separator text-navy/50" aria-hidden="true" />
              <span itemProp="name">プライバシーポリシー</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      <header className="pt-14 pb-9 max-md:pt-9 max-md:pb-6">
        <div className={`${innerClass} fade is-show`}>
          <span className="block w-fit origin-left scale-x-[1.12] font-[family-name:var(--font-oswald)] text-[clamp(34px,5.5vw,64px)] leading-none font-bold tracking-[.05em] text-transparent uppercase [-webkit-text-stroke:1.5px_#1D2B50]">
            Privacy Policy
          </span>
          <h1 className="mt-3.5 text-[clamp(24px,3vw,32px)] font-black tracking-[.04em]">
            プライバシーポリシー
          </h1>
          <p className="mt-3.5 max-w-170 text-[14.5px] text-navy/88 max-md:text-[13.5px]">
            当サイト「Labite」は、個人情報の重要性を認識し、以下の方針に基づいて適切な取り扱いに努めます。
          </p>
          <span className="mt-4.5 inline-flex items-baseline gap-2 rounded-full border-2 border-navy bg-white px-5.5 py-0.75 text-[12.5px] font-bold">
            制定日
            <span className="font-[family-name:var(--font-oswald)] text-[13px] tracking-[.04em] text-blue">
              2026.06.14
            </span>
          </span>
        </div>
      </header>

      <div className="pb-27.5 max-md:pb-18">
        <div className={innerClass}>
          <article className="fade is-show rounded-2xl border-2 border-navy bg-white px-12 pt-12 pb-10 max-md:px-5.5 max-md:pt-8 max-md:pb-7 max-sm:border-0 max-sm:bg-transparent max-sm:px-0 max-sm:pt-1">
            {sections.map((section, index) => (
              <section key={section.title}>
                <h2
                  className={`${index === 0 ? 'mt-0' : 'mt-16 max-md:mt-12'} relative mb-6 flex items-baseline gap-3 overflow-hidden rounded-xl border-2 border-navy bg-white py-3.5 pr-4.5 pl-8 text-[clamp(18px,2vw,21px)] leading-[1.6] font-black before:absolute before:inset-y-0 before:left-0 before:w-3 before:border-r-2 before:border-navy before:bg-yellow before:content-[''] max-md:mb-5 max-md:py-3 max-md:pr-3.5 max-md:pl-6.5 max-md:text-[17px] max-md:before:w-2.25`}
                >
                  <span className="shrink-0 font-[family-name:var(--font-oswald)] text-[15px] font-semibold tracking-[.06em] text-blue">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-6 text-[15.5px] leading-[2] last:mb-0 max-md:text-[14.5px]"
                  >
                    {paragraph}
                  </p>
                ))}
                {'link' in section && section.link && (
                  <p className="mt-[-8px]">
                    <a
                      className="font-bold text-blue underline decoration-dotted underline-offset-4 hover:opacity-75"
                      href={section.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {section.link.label}
                    </a>
                  </p>
                )}
              </section>
            ))}

            <p className="mt-12 border-t-[1.5px] border-dashed border-navy/45 pt-4.5 text-right text-[13px] font-bold">
              制定日:
              <span className="ml-1.5 font-[family-name:var(--font-oswald)] text-[13.5px] tracking-[.04em] text-blue">
                2026.06.14
              </span>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
