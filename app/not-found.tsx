import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowIcon } from '../components/ArrowIcon';
import {
  bluePillArrowClass,
  bluePillClass,
  pillArrowClass,
  pillClass,
} from '../components/site-design';

export const metadata: Metadata = {
  title: 'ページが見つかりません（404）',
  robots: {
    index: false,
    follow: false,
  },
};

const tickerItems = [
  '404 NOT FOUND —',
  'PAGE NOT FOUND —',
  '404 NOT FOUND —',
  'PAGE NOT FOUND —',
];

export default function NotFound() {
  return (
    <main data-not-found-page>
      <style>{`
        a[aria-label="ページ上部へ戻る"] {
          display: none !important;
        }
        aside[aria-hidden="true"] > div:last-child {
          font-size: 0 !important;
        }
        aside[aria-hidden="true"] > div:last-child::after {
          content: "404";
          font-family: var(--font-oswald), sans-serif;
          font-size: 11px;
          font-weight: 600;
        }
      `}</style>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-37.5 pb-20 text-center max-md:min-h-0 max-md:pt-27.5 max-md:pb-14">
        <span
          className="pointer-events-none absolute top-1/2 right-0 left-0 z-0 -translate-y-1/2 select-none whitespace-nowrap text-center font-[family-name:var(--font-oswald)] text-[clamp(120px,18vw,260px)] leading-none font-bold text-transparent uppercase [-webkit-text-stroke:1.5px_rgba(29,43,80,.07)]"
          aria-hidden="true"
        >
          Not Found
        </span>

        <div className="relative z-10 mx-auto w-full max-w-280 px-6">
          <div className="fade is-show">
            <p className="block font-[family-name:var(--font-oswald)] text-[clamp(110px,20vw,220px)] leading-none font-bold tracking-[.06em] text-yellow [-webkit-text-stroke:3px_#1D2B50] [paint-order:stroke_fill]">
              404
            </p>

            <p className="my-2.5 mb-5.5 inline-flex items-center gap-3.5 font-[family-name:var(--font-oswald)] text-[15px] font-semibold tracking-[.26em] text-blue uppercase before:h-[1.5px] before:w-9 before:bg-blue before:content-[''] after:h-[1.5px] after:w-9 after:bg-blue after:content-['']">
              page not found
            </p>

            <h1 className="mb-3.5 text-[clamp(20px,2.8vw,28px)] font-black tracking-[.04em]">
              お探しのページが見つかりませんでした
            </h1>
            <p className="mx-auto mb-9 max-w-140 text-[14.5px] text-navy/88 max-md:text-[13.5px]">
              URLが変更・削除されたか、アドレスが正しく入力されていない可能性があります。
              お手数ですが、以下のリンクからお進みください。
            </p>

            <div className="flex flex-wrap justify-center gap-4 max-md:flex-col max-md:items-center max-md:gap-3">
              <Link className={bluePillClass} href="/">
                TOPへ戻る
                <span className={bluePillArrowClass}><ArrowIcon /></span>
              </Link>
              <Link className={pillClass} href="/column" prefetch={false}>
                記事一覧を見る
                <span className={pillArrowClass}><ArrowIcon /></span>
              </Link>
            </div>

            <div className="mx-auto mt-11 max-w-130 overflow-hidden rounded-xl border-2 border-navy bg-white text-left max-md:mt-9">
              <div className="flex items-center gap-2 border-b-2 border-navy bg-pale-blue px-3.5 py-2.25">
                <i className="size-2.5 rounded-full border-[1.5px] border-navy bg-yellow" />
                <i className="size-2.5 rounded-full border-[1.5px] border-navy bg-white" />
                <i className="size-2.5 rounded-full border-[1.5px] border-navy bg-blue" />
                <span className="ml-auto font-[family-name:var(--font-oswald)] text-[11px] tracking-[.14em] text-navy/70 uppercase">
                  console
                </span>
              </div>
              <pre className="overflow-x-auto bg-[#16223f] px-5 py-4.5 font-mono text-[13px] leading-[1.9] text-pale-blue max-md:px-3.5 max-md:py-3.5 max-md:text-xs">
                <code>
                  <span className="text-[#7e93c4]">{'// ページの取得に失敗しました'}</span>
                  {'\n'}
                  <span className="text-[#7fa4f7]">GET</span>
                  {' /unknown-page '}
                  <span className="text-yellow">404 (Not Found)</span>
                  {'\n'}
                  <span className="text-[#7e93c4]">{'// 大丈夫です。学習も開発も、迷ったら戻ればOKです'}</span>
                  {'\n'}
                  <span className="text-[#7fa4f7]">location</span>
                  {'.href = '}
                  <span className="text-yellow">&apos;/&apos;</span>
                  {';'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y-[1.5px] border-navy bg-yellow py-3" aria-hidden="true">
        <div className="flex w-max animate-[tick_30s_linear_infinite] items-center gap-10 whitespace-nowrap font-[family-name:var(--font-oswald)] text-[15px] font-semibold tracking-[.12em] uppercase hover:[animation-play-state:paused] motion-reduce:animate-none max-md:gap-7 max-md:text-[13px]">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
