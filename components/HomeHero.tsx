'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  // bluePillArrowClass,
  // bluePillClass,
  innerClass,
  pillArrowClass,
  pillClass,
} from './site-design';

const titleSegments = [
  { text: '実務で使える技術を、' },
  { break: true },
  { text: '未経験', marked: true },
  { text: 'から。' },
] as const;

const titleSegmentStarts = titleSegments.map((_, index) =>
  titleSegments
    .slice(0, index)
    .reduce((length, segment) => length + ('text' in segment ? segment.text.length : 0), 0),
);

function WaveText() {
  const text = 'Labite Labite Labite\u00a0';

  return (
    <div className="fv-marquee" aria-hidden="true">
      {[0, 1].map((copy) => (
        <span className="fv-marquee-track" key={copy}>
          {[...text].map((character, index) => (
            <i key={`${copy}-${index}`}>
              <b style={{ animationDelay: `${index * 0.14}s` }}>
                {character === ' ' || character === '\u00a0' ? '\u00a0' : character}
              </b>
            </i>
          ))}
        </span>
      ))}
    </div>
  );
}

function FvIllustration() {
  return (
    <svg viewBox="0 0 480 360" fill="none" aria-hidden="true">
      <rect x="40" y="30" width="400" height="270" rx="14" stroke="#1D2B50" strokeWidth="3" fill="#fff" />
      <line x1="40" y1="78" x2="440" y2="78" stroke="#1D2B50" strokeWidth="3" />
      <circle cx="68" cy="54" r="7" fill="#FFC94B" stroke="#1D2B50" strokeWidth="2.5" />
      <circle cx="94" cy="54" r="7" fill="#fff" stroke="#1D2B50" strokeWidth="2.5" />
      <circle cx="120" cy="54" r="7" fill="#4A7DFF" stroke="#1D2B50" strokeWidth="2.5" />
      <rect x="68" y="104" width="120" height="12" rx="6" fill="#4A7DFF" opacity=".3" />
      <rect x="68" y="132" width="220" height="12" rx="6" fill="#EAF1FB" stroke="#1D2B50" strokeWidth="1.5" opacity=".35" />
      <rect x="96" y="160" width="170" height="12" rx="6" fill="#FFC94B" opacity=".35" />
      <rect x="96" y="188" width="240" height="12" rx="6" fill="#EAF1FB" stroke="#1D2B50" strokeWidth="1.5" opacity=".35" />
      <rect x="68" y="216" width="90" height="12" rx="6" fill="#1D2B50" opacity=".3" />
      <rect x="68" y="248" width="150" height="12" rx="6" fill="#EAF1FB" stroke="#1D2B50" strokeWidth="1.5" opacity=".35" />
      <path d="M395 250l40 40" stroke="#1D2B50" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      <circle cx="430" cy="120" r="26" fill="#FFC94B" stroke="#1D2B50" strokeWidth="3" />
      <path d="M420 120l7 7 13-14" stroke="#1D2B50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 320q60-24 120 0t120 0t120 0t60-12" stroke="#1D2B50" strokeWidth="2.5" strokeDasharray="1 10" strokeLinecap="round" />
    </svg>
  );
}

export function HomeHero() {
  const [visibleCharacters, setVisibleCharacters] = useState<number | null>(null);
  const fullTextLength = titleSegments.reduce(
    (length, segment) => length + ('text' in segment ? segment.text.length : 0),
    0,
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let count = 0;
    let interval: number | undefined;
    const startTimer = window.setTimeout(() => {
      setVisibleCharacters(0);
      interval = window.setInterval(() => {
        count += 1;
        setVisibleCharacters(count);
        if (count >= fullTextLength) {
          window.clearInterval(interval);
          window.setTimeout(() => setVisibleCharacters(null), 1500);
        }
      }, 110);
    }, 500);

    return () => {
      window.clearTimeout(startTimer);
      if (interval !== undefined) {
        window.clearInterval(interval);
      }
    };
  }, [fullTextLength]);

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden pt-40 pb-24 max-md:min-h-[100svh] max-md:pt-19 max-md:pb-7">
      {/* <a
        className="absolute bottom-0 left-6 flex items-center gap-2.5 font-[family-name:var(--font-oswald)] text-[11px] tracking-[.3em] transition-colors hover:text-[#C99514] after:block after:h-16 after:w-0.5 after:rounded-sm after:bg-navy after:content-[''] after:animate-[scrollLine_1.8s_ease-in-out_infinite] hover:after:bg-[#C99514] [writing-mode:vertical-rl] max-md:hidden"
        href="#roadmap"
        aria-label="次のセクションへスクロール"
      >
        SCROLL
      </a> */}
      <div className={`${innerClass} relative z-2 grid w-full grid-cols-[1fr_1.15fr] items-center gap-8 max-md:grid-cols-1 max-md:gap-8.75`}>
        <div className="fade is-show">
          <h1 className={`${visibleCharacters !== null ? 'typing-cursor' : ''} mb-5.5 text-[48px] leading-[1.5] font-black text-yellow [-webkit-text-stroke:4px_#1D2B50] [paint-order:stroke_fill] max-md:mb-3 max-md:text-[32px]`}>
            {titleSegments.map((segment, index) => {
              if ('break' in segment) {
                return <br className="min-[640px]:max-md:hidden" key={index} />;
              }

              const start = titleSegmentStarts[index];
              const shown =
                visibleCharacters === null
                  ? segment.text
                  : segment.text.slice(0, Math.max(0, visibleCharacters - start));

              return 'marked' in segment && segment.marked
                ? <span key={index}>{shown}</span>
                : <span key={index}>{shown}</span>;
            })}
          </h1>
          <p className="fv-description mb-8.5 max-w-130 max-md:mb-4 max-md:text-sm">
            Labiteは、未経験からWebエンジニアを目指す人のための技術ブログです。学習の手順、開発ノウハウ、キャリアの情報を、現場の目線で整理して発信しています。
          </p>
        </div>
        <div className="fade is-show relative">
          <WaveText />
          <div className="relative z-1 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:w-full max-md:[&_svg]:max-w-[430px]">
            <FvIllustration />
          </div>
          <div className="absolute bottom-[30%] left-1/2 z-2 flex w-max max-w-[80%] -translate-x-1/2 flex-col items-center gap-2.5">
            {/* <Link className={`${bluePillClass} !px-5 !py-2.75 !text-[13.5px] whitespace-nowrap max-md:!px-4.5 max-md:!py-2.5 max-md:!text-[12.5px]`} href="#roadmap">
              学習ロードマップを見る
              <span className={`${bluePillArrowClass} !size-6 !text-xs`}><ArrowIcon /></span>
            </Link> */}
            <Link className={`${pillClass} !px-5 !py-2.75 !text-[13.5px] whitespace-nowrap max-md:!px-4.5 max-md:!py-2.5 max-md:!text-[12.5px]`} href="/column">
              記事一覧を見る
              <span className={`${pillArrowClass} !size-6 !text-xs`}><ArrowIcon /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
