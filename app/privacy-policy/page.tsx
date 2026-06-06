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

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-10 py-20 max-lg:px-6 max-lg:py-12 max-sm:px-4 max-sm:py-10">
      <nav className="mb-10 overflow-x-auto text-sm leading-normal whitespace-nowrap" aria-label="breadcrumb">
        <ol className="m-0 flex w-max min-w-full list-none p-0" itemScope itemType="https://schema.org/BreadcrumbList">
          <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="text-[#1496A0] underline hover:opacity-80" itemProp="item">
              <span itemProp="name">TOP</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            aria-current="page"
          >
            <span className="mx-3.5 h-0 w-0 border-y-[6px] border-l-[6px] border-y-transparent border-l-[#111]" aria-hidden="true" />
            <span itemProp="name">プライバシーポリシー</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      <header className="mb-12">
        <p className="mb-3 text-sm leading-normal font-bold tracking-normal text-[#1496A0]">PRIVACY POLICY</p>
        <h1 className="m-0 text-4xl leading-normal font-bold max-sm:text-3xl">プライバシーポリシー</h1>
        <p className="mt-5 mb-0 text-base leading-8 text-[#555]">
          当サイト「Labite」は、個人情報の重要性を認識し、以下の方針に基づいて適切な取り扱いに努めます。
        </p>
      </header>

      <div className="grid gap-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="m-0 border-l-4 border-[#1496A0] pl-4 text-2xl leading-normal font-bold max-sm:text-xl">
              {section.title}
            </h2>
            <div className="mt-5 grid gap-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="m-0 text-base leading-8 text-[#333]">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-[#1496A0]/20 pt-6 text-sm leading-7 text-[#555]">
        <p className="m-0">制定日: 2026年6月6日</p>
      </footer>
    </main>
  );
}
