import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';

function LabiteWordmarkBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-center overflow-hidden"
      aria-hidden="true"
    >
      {[
        { margin: '-1%', size: 'text-[154px]' },
        { margin: '-20%', size: 'text-[154px]' },
        { margin: '-6%', size: 'text-[154px]' },
        { margin: '-24%', size: 'text-[154px]' },
        { margin: '-3%', size: 'text-[154px]' },
      ].map((row, index) => (
        <div
          className={`${row.size} font-[family-name:var(--font-oswald)] leading-[.96] font-bold tracking-[.04em] whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1.5px_rgba(29,43,80,.09)] max-md:text-[84px] max-md:[-webkit-text-stroke:1.2px_rgba(29,43,80,.1)]`}
          key={index}
          style={{ marginLeft: row.margin }}
        >
          Labite Labite Labite Labite Labite Labite Labite Labite
        </div>
      ))}
    </div>
  );
}

function BrowserPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-[506px] max-lg:max-w-[560px]">
      <div className="relative overflow-hidden rounded-[16px] border-[1.5px] border-navy bg-white shadow-[8px_8px_0_rgba(29,43,80,.1)]">
        <div className="flex h-12 items-center gap-2.5 border-b-[1.5px] border-navy bg-[#EFE7D5] px-4 max-md:h-10 max-md:gap-2 max-md:px-3">
          <span className="size-3 rounded-full border border-navy bg-[#E8695B] max-md:size-2.5" />
          <span className="size-3 rounded-full border border-navy bg-yellow max-md:size-2.5" />
          <span className="size-3 rounded-full border border-navy bg-[#5FB878] max-md:size-2.5" />
          <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-full border-[1.5px] border-navy bg-white px-3 py-1 leading-none max-md:ml-1 max-md:px-2">
            <svg className="size-3 shrink-0 text-[#5B6473] max-md:size-2.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
            <span className="truncate font-mono text-[11px] tracking-[.04em] text-[#33405A] max-md:text-[10px]">
              labite-tech.com
            </span>
          </span>
        </div>

        <div className="relative aspect-[16/12.1] bg-[#EFE7D5]">
          <Image
            src="/images/top-fv.png"
            alt="ノートPCで作業する男性"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 506px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="absolute right-3 -bottom-4 flex h-9 w-15 rotate-[-4deg] items-center justify-center rounded-[10px] border-[1.5px] border-navy bg-yellow font-mono text-[15px] font-black text-navy shadow-[3px_3px_0_#1D2B50] max-md:right-2 max-md:-bottom-3 max-md:h-8 max-md:w-13 max-md:text-[13px]">
        &lt;/&gt;
      </div>
    </div>
  );
}

function HeroButton({
  href,
  children,
  variant = 'yellow',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'yellow' | 'white';
}) {
  const isYellow = variant === 'yellow';

  return (
    <Link
      className={`group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border-[1.5px] border-navy px-7 text-[14px] font-black whitespace-nowrap text-navy shadow-[3px_3px_0_rgba(29,43,80,.08)] transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.75 hover:shadow-[5px_5px_0_rgba(29,43,80,.14)] max-md:w-full max-md:px-5 max-md:text-[13.5px] ${isYellow ? 'bg-yellow hover:bg-[#f0b92f]' : 'bg-white hover:bg-pale-blue'}`}
      href={href}
    >
      {children}
      <span
        className={`inline-flex size-6 items-center justify-center rounded-full text-[12px] transition-transform duration-200 group-hover:translate-x-0.75 ${isYellow ? 'bg-navy text-yellow' : 'bg-navy text-white'}`}
      >
        <ArrowIcon />
      </span>
    </Link>
  );
}

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-cream pt-40 pb-24 max-md:min-h-[100svh] max-md:pt-19 max-md:pb-7">
      <LabiteWordmarkBackground />

      <div className="relative z-1 mx-auto grid max-w-[1120px] grid-cols-[1fr_506px] items-center gap-18 px-8 max-xl:max-w-[1040px] max-xl:grid-cols-[1fr_480px] max-xl:gap-12 max-lg:grid-cols-1 max-lg:gap-8 max-md:px-5">
        <div className="fade is-show max-w-[560px] max-lg:max-w-none">
          <div className="mb-7 flex items-center gap-3 max-md:mb-4">
            <span className="size-3 rotate-45 border-[1.5px] border-navy bg-yellow max-md:size-2.5" />
            <span className="font-mono text-[12px] font-semibold tracking-[.42em] text-navy uppercase max-md:text-[9px] max-md:tracking-[.22em]">
              TECH BLOG FOR ASPIRING WEB ENGINEERS
            </span>
          </div>

          <h1 className="mb-7 text-[42px] leading-[1.48] font-black tracking-normal text-navy max-md:mb-5 max-md:text-[29px] max-md:leading-[1.5]">
            <span className="bg-linear-to-t from-yellow from-[31%] to-transparent to-[31%]">
              実務で使える技術を、
            </span>
            <br />
            未経験から。
          </h1>

          <div className="mb-7 hidden max-md:block">
            <BrowserPhoto />
          </div>

          <p className="max-w-[560px] text-[15.5px] leading-[2.15] font-medium text-navy max-md:text-[13.5px] max-md:leading-[2]">
            Labiteは、未経験からWebエンジニアを目指す人のための技術ブログです。学習の手順、開発ノウハウ、キャリアの情報を、現場の目線で整理して発信しています。
          </p>

          <div className="mt-9 flex flex-wrap gap-4 max-md:mt-7 max-md:flex-col max-md:gap-3">
            <HeroButton href="/roadmap">学習ロードマップを見る</HeroButton>
            <HeroButton href="/column" variant="white">記事一覧を見る</HeroButton>
          </div>
        </div>

        <div className="fade is-show relative max-lg:mx-auto max-lg:w-full max-md:hidden">
          <BrowserPhoto />
        </div>
      </div>
    </section>
  );
}
