import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '../../components/ContactForm';
import {
  cardDotsClass,
  innerClass,
  outlineTitleClass,
} from '../../components/site-design';
import { ogImage, withSiteName } from '../../libs/site-metadata';

// 将来、相談・コンサルサービスを開始する際は「無料相談」へ戻す。
const title = withSiteName('お問い合わせ');
const description =
  'Labiteへのご質問、ご感想、お仕事のご相談、その他のご連絡を受け付けています。';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title,
    description,
    url: '/contact',
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

const flow = [
  {
    number: '01',
    title: 'フォームを入力',
    description: '必要事項とお問い合わせ内容をご記入ください。',
  },
  {
    number: '02',
    title: 'メールを送信',
    description: '入力内容を確認して、お使いのメールアプリから送信します。',
  },
  {
    number: '03',
    title: '内容を確認して返信',
    description: 'お問い合わせ内容を確認後、入力いただいたメールアドレスへ返信します。',
  },
];

export default function ContactPage() {
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
              お問い合わせ
            </li>
          </ol>
        </div>
      </nav>

      <header className="pt-15 pb-12 max-md:pt-10 max-md:pb-8">
        <div className={`${innerClass} fade is-show`}>
          <span className={outlineTitleClass}>Contact</span>
          {/* 将来、相談・コンサルサービスを開始する際は「無料相談」へ戻す。 */}
          <h1 className="mt-3.5 text-[clamp(24px,3vw,32px)] font-black tracking-[.04em]">
            お問い合わせ
          </h1>
          <p className="mt-3.5 max-w-170 text-[14.5px] text-navy/88 max-md:text-[13.5px]">
            サイトや記事に関するご質問、お仕事のご相談、その他のご連絡など、内容を問わずお気軽にお問い合わせください。
          </p>
        </div>
      </header>

      <section className="border-y-[1.5px] border-navy bg-pale-blue py-20 max-md:py-14">
        <div className={innerClass}>
          <div className="grid grid-cols-[.82fr_1.18fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-10">
            <div className="fade">
              {/* 将来の相談・コンサル向け表記: Consultation / 相談できること */}
              <span className="font-[family-name:var(--font-oswald)] text-[12px] font-bold tracking-[.18em] text-blue uppercase">
                Inquiry
              </span>
              <h2 className="mt-2 mb-4 text-[clamp(22px,3vw,30px)] font-black">
                お問い合わせについて
              </h2>
              <p className="mb-7 text-[14px] text-navy/85">
                内容がまとまっていなくても問題ありません。確認したいことや伝えたいことを、分かる範囲でご記入ください。
              </p>
              <ul className="space-y-3">
                {[
                  'サイトや掲載記事に関するご質問',
                  'Webサイト制作や開発など、お仕事のご相談',
                  'その他、Labiteへのご連絡',
                ].map((item) => (
                  <li
                    className="flex items-start gap-3 rounded-lg border-[1.5px] border-navy bg-white px-4 py-3 text-[13.5px] font-medium"
                    key={item}
                  >
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] border-navy bg-yellow text-[10px] font-black">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-lg border-[1.5px] border-dashed border-navy/45 bg-white/70 px-4 py-3 text-[12px] text-navy/70">
                内容によっては回答までにお時間をいただく場合や、返信できない場合があります。あらかじめご了承ください。
              </div>
            </div>

            <div
              className={`fade relative rounded-2xl border-[1.5px] border-navy bg-white px-10 py-11 max-md:px-5.5 max-md:py-8 ${cardDotsClass}`}
            >
              <div className="mb-8 border-b-[1.5px] border-dashed border-navy/40 pb-5">
                {/* 将来の相談・コンサル向け表記: 相談フォーム */}
                <h2 className="text-xl font-black">お問い合わせフォーム</h2>
                <p className="mt-1 text-[12.5px] text-navy/65">
                  すべての必須項目をご入力ください。
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 max-md:py-16">
        <div className={innerClass}>
          <div className="fade mb-12 max-md:mb-8">
            <span className={outlineTitleClass}>Flow</span>
            {/* 将来の相談・コンサル向け表記: ご相談の流れ */}
            <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">お問い合わせの流れ</h2>
          </div>
          <ol className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {flow.map((step) => (
              <li
                className="fade relative rounded-xl border-[1.5px] border-navy bg-cream px-6 pt-9 pb-7"
                key={step.number}
              >
                <span className="absolute -top-4 left-5 rounded-full border-[1.5px] border-navy bg-yellow px-3 py-1 font-[family-name:var(--font-oswald)] text-xs font-bold tracking-[.08em]">
                  STEP {step.number}
                </span>
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="text-[13.5px] text-navy/80">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
