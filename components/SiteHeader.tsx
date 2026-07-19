'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrackedContactLink } from './TrackedContactLink';

const navItems = [
  { href: '/', label: 'TOP', sub: 'TOP', color: '#F5C543', hover: 'hover:bg-[#FCEFC0]' },
  { href: '/roadmap', label: '学習ロードマップ', sub: 'ROADMAP', color: '#5FB878', hover: 'hover:bg-[#D6EEDF]' },
  { href: '/column', label: 'コラム', sub: 'COLUMN', color: '#6FA0E8', hover: 'hover:bg-[#DCE8FA]' },
  { href: '/about', label: '運営者について', sub: 'ABOUT', color: '#B98CE0', hover: 'hover:bg-[#ECDFF6]' },
];

function MailIcon({ className = 'size-3.75' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="size-3.75" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m9 6 6 6-6 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [isToTopVisible, setIsToTopVisible] = useState(false);
  const [isTopClicked, setIsTopClicked] = useState(false);
  const [logoSpinKey, setLogoSpinKey] = useState(0);

  useEffect(() => {
    const updatePageState = () => {
      setIsNotFoundPage(Boolean(document.querySelector('[data-not-found-page]')));
    };
    const observer = new MutationObserver(updatePageState);

    updatePageState();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsToTopVisible(window.scrollY > window.innerHeight * 0.9);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-show');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    const observeFadeElements = () => {
      document.querySelectorAll('.fade:not(.is-show)').forEach((element) => {
        fadeObserver.observe(element);
      });
    };
    const mutationObserver = new MutationObserver(observeFadeElements);

    observeFadeElements();
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsTopClicked(true);
    setLogoSpinKey((key) => key + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-100 border-b-[1.5px] border-navy bg-[#EFE7D5]/94 backdrop-blur-[8px]">
        <div className="mx-auto flex h-18 w-full max-w-280 items-center justify-between gap-8 px-8 max-md:h-14.5 max-md:px-5">
          <Link className="flex items-center" href="/" aria-label="Labite トップページへ" onClick={closeDrawer}>
            <Image className="h-8.5 w-auto max-md:h-7" src="/images/site-logo.svg" width={150} height={50} alt="Labite" priority />
          </Link>

          <nav className="flex items-center gap-8.5 max-md:hidden" aria-label="グローバルナビゲーション">
            {navItems.map((item) => (
              <Link key={item.sub} href={item.href} className="group flex flex-col items-center gap-px">
                <span className="text-[13.5px] leading-[1.35] font-bold group-hover:text-[#C08A00]">{item.label}</span>
                <span className="font-mono text-[9px] leading-[1.35] tracking-[.2em] text-[#98A1B5]">{item.sub}</span>
              </Link>
            ))}
          </nav>

          <TrackedContactLink
            location="header_desktop"
            className="inline-flex items-center gap-2.75 rounded-full border-[1.5px] border-navy bg-yellow py-1.5 pr-5 pl-1.5 text-[13.5px] font-extrabold shadow-[3px_3px_0_#17233D] hover:-translate-x-px hover:-translate-y-px hover:text-navy hover:shadow-[4px_4px_0_#17233D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none max-md:hidden"
          >
            <span className="inline-flex size-7.5 items-center justify-center rounded-full bg-navy text-yellow">
              <MailIcon />
            </span>
            お問い合わせ
          </TrackedContactLink>

          <button
            className="hidden h-10.5 w-14 cursor-pointer items-center justify-center rounded-[14px] bg-transparent text-navy outline-none [-webkit-tap-highlight-color:transparent] focus:outline-none focus-visible:outline-none active:outline-none max-md:flex"
            type="button"
            aria-expanded={isDrawerOpen}
            aria-controls="drawer"
            aria-label={isDrawerOpen ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setIsDrawerOpen((open) => !open)}
          >
            <span className="relative block h-6 w-7">
              <span className={`${isDrawerOpen ? 'translate-y-2.5 rotate-45' : ''} absolute top-0 left-0 h-[3px] w-7 rounded-sm bg-navy transition-transform duration-300`} />
              <span className={`${isDrawerOpen ? 'scale-x-[.2] opacity-0' : ''} absolute top-2.5 left-0 h-[3px] w-7 rounded-sm bg-navy transition-[opacity,transform] duration-200`} />
              <span className={`${isDrawerOpen ? '-translate-y-2.5 -rotate-45' : ''} absolute top-5 left-0 h-[3px] w-7 rounded-sm bg-navy transition-transform duration-300`} />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`${isDrawerOpen ? 'flex' : 'hidden'} fixed top-14.5 right-0 bottom-0 left-0 z-90 flex-col overflow-hidden bg-[#EFE7D5]`}
        id="drawer"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(23,35,61,.06)_1.5px,transparent_1.5px)] [background-size:20px_20px]" aria-hidden="true" />
        <div className="relative flex items-center gap-3 px-5.5 pt-6.5 pb-2.5">
          <span className="font-mono text-[10px] font-bold tracking-[.28em] text-[#F2635F]">NAVIGATION</span>
          <span className="h-[1.5px] flex-1 bg-navy/16" />
        </div>
        <nav className="relative flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-0.5" aria-label="モバイルナビゲーション">
          {navItems.map((item, index) => (
            <Link
              className={`flex items-center gap-4 rounded-2xl px-3.5 py-3.5 text-navy ${item.hover} hover:translate-x-1`}
              href={item.href}
              key={item.sub}
              onClick={closeDrawer}
              style={{ animation: `menuitem-in .4s ease both ${0.05 + index * 0.05}s` }}
            >
              <span className="min-w-10.5 font-[family-name:var(--font-oswald)] text-[28px] leading-none font-bold text-transparent [-webkit-text-stroke:1.4px_#17233D]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2.25">
                  <span className="size-2.25 flex-none rotate-45 border-[1.5px] border-navy" style={{ backgroundColor: item.color }} />
                  <span className="text-xl leading-[1.2] font-black">{item.label}</span>
                </span>
                <span className="mt-1.25 block pl-4.5 font-mono text-[9px] tracking-[.2em] text-[#8A8266]">{item.sub}</span>
              </span>
              <span className="flex size-8.5 flex-none items-center justify-center rounded-full border-[1.5px] border-navy bg-white text-navy">
                <ChevronIcon />
              </span>
            </Link>
          ))}
        </nav>
        <div className="relative shrink-0 border-t-[1.5px] border-navy px-5 py-3.5 pb-5.5">
          <TrackedContactLink
            className="flex w-full items-center justify-center gap-2.75 rounded-full border-[1.5px] border-navy bg-[#F2635F] py-2.5 pr-5 pl-2.5 text-[14.5px] font-extrabold !text-white shadow-[3px_3px_0_#17233D] hover:-translate-x-px hover:-translate-y-px hover:!text-white hover:shadow-[4px_4px_0_#17233D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            location="header_mobile"
            onClick={closeDrawer}
          >
            <span className="inline-flex size-8 items-center justify-center rounded-full border-[1.5px] border-navy bg-white text-[#F2635F]">
              <MailIcon className="size-4" />
            </span>
            お問い合わせフォームへ
          </TrackedContactLink>
          <div className="mt-3.5 flex items-center justify-center gap-2">
            <Image className="h-4.5 w-auto opacity-85" src="/images/site-logo.svg" width={150} height={50} alt="Labite" />
            <span className="font-mono text-[9px] tracking-[.14em] text-[#8A8266]">© 2026 LABITE</span>
          </div>
        </div>
      </div>

      <a
        className={`${isNotFoundPage ? 'hidden' : 'flex'} ${isToTopVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} ${isTopClicked ? 'bg-white! translate-y-0!' : ''} fixed right-5 bottom-18 z-90 aspect-square size-23 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-navy bg-white transition-[opacity,transform,background] duration-400 hover:-translate-y-0.75 hover:bg-yellow max-md:right-3 max-md:bottom-16 max-md:size-18`}
        href="#"
        aria-label="ページ上部へ戻る"
        onClick={scrollToTop}
        onMouseLeave={() => setIsTopClicked(false)}
      >
        <svg className="absolute inset-1.25 size-[calc(100%_-_10px)] animate-[ttSpin_16s_linear_infinite] max-md:inset-1 max-md:size-[calc(100%_-_8px)]" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="ttCircle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
          </defs>
          <text className="fill-navy font-[family-name:var(--font-oswald)] text-[10px] font-semibold uppercase max-md:text-[9px]">
            <textPath href="#ttCircle" textLength="245" lengthAdjust="spacing">
              LABITE - BACK TO TOP&nbsp;-&nbsp;
            </textPath>
          </text>
        </svg>
        <svg
          key={logoSpinKey}
          className={`${logoSpinKey > 0 ? 'animate-[logoSpin_.9s_cubic-bezier(.2,.7,.2,1)]' : ''} absolute size-11 overflow-visible drop-shadow-[1.5px_1.5px_0_#FFC94B] max-md:size-8.5`}
          viewBox="0 0 56 60"
          aria-hidden="true"
        >
          <g transform="translate(0 60) scale(.1 -.1)" fill="#1D2B50">
            <path d="M40 300 l0 -260 145 0 145 0 -20 40 -20 40 -85 0 -85 0 0 220 0 220 -40 0 -40 0 0 -260z" />
            <path d="M180 365 l0 -195 40 0 40 0 0 45 0 45 85 0 c78 0 88 -2 110 -25 30 -30 31 -54 4 -89 -17 -21 -29 -26 -65 -26 -24 0 -44 -3 -44 -6 0 -4 10 -22 22 -41 20 -33 23 -35 65 -30 69 7 123 69 123 139 0 27 -6 37 -31 52 -59 35 -73 122 -29 179 27 33 25 49 -7 88 -41 48 -78 59 -203 59 l-110 0 0 -195z m231 97 c15 -13 22 -30 22 -52 0 -50 -31 -70 -109 -70 l-64 0 0 70 0 70 64 0 c47 0 70 -5 87 -18z" />
          </g>
        </svg>
      </a>
    </>
  );
}
