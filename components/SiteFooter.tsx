import Image from 'next/image';
import Link from 'next/link';

const footerItems = [
  { href: '/', label: 'TOP' },
  { href: '/roadmap', label: '学習ロードマップ' },
  { href: '/column', label: 'コラム' },
  { href: '/about', label: '運営者について' },
  { href: '/privacy-policy', label: 'プライバシーポリシー' },
];

function MailIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-[1.5px] border-navy bg-[#EFE7D5] pt-13 pb-20.5 text-navy max-md:px-5.5 max-md:pt-9 max-md:pb-24">
      <div className="mx-auto max-w-280 px-8 max-md:px-0">
        <div className="flex items-start justify-between gap-10 border-b border-navy/18 pb-7.5 max-md:block max-md:pb-5.5">
          <div>
            <Link href="/" aria-label="Labite トップページへ">
              <Image className="h-8 w-auto max-md:h-7.5" src="/images/site-logo.svg" width={150} height={50} alt="Labite" />
            </Link>
            <p className="mt-3.5 text-[12.5px] leading-[2] text-[#4A5468] max-md:mt-3 max-md:text-xs">
              未経験からWebエンジニアを目指す技術ブログ
            </p>
          </div>
          <nav className="flex flex-wrap gap-7 max-md:mt-5.5 max-md:flex-col max-md:gap-3.5 max-md:border-t max-md:border-navy/18 max-md:pt-5.5" aria-label="フッターナビゲーション">
            {footerItems.map((item) => (
              <Link className="group text-[12.5px] font-bold max-md:text-[13px]" href={item.href} key={item.label}>
                <span className="transition-colors duration-180 group-hover:text-[#C08A00]">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-between gap-6 border-b border-navy/18 py-6.5 max-md:block max-md:border-b-0 max-md:py-5.5">
          <span className="text-[13px] font-bold max-md:block">ご質問・お仕事のご相談などはこちらから。</span>
          <Link
            className="inline-flex items-center gap-2.75 rounded-full border-[1.5px] border-navy bg-yellow py-1.5 pr-5.5 pl-1.5 text-[13px] font-extrabold text-navy shadow-[3px_3px_0_#17233D] hover:-translate-x-px hover:-translate-y-px hover:text-navy hover:shadow-[4px_4px_0_#17233D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none max-md:mt-5.5 max-md:w-full max-md:justify-center"
            href="/contact"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-navy text-yellow">
              <MailIcon />
            </span>
            お問い合わせ
          </Link>
        </div>

        <div className="flex items-center justify-between gap-5 pt-5 max-md:mt-5.5 max-md:block max-md:border-t max-md:border-navy/18 max-md:pt-4.5">
          <span className="font-mono text-[11px] tracking-[.14em] text-[#8A8266] max-md:block max-md:text-[10px]">
            © 2026 Labite. All Rights Reserved.
          </span>
          <span className="font-mono text-[11px] tracking-[.14em] text-[#8A8266] max-md:mt-2 max-md:block max-md:text-[10px]">
            MADE FOR ASPIRING ENGINEERS
          </span>
        </div>
      </div>
    </footer>
  );
}
