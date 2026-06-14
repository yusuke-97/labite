'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  yellowPillClass,
  yellowPillArrowClass,
} from './site-design';

const navItems = [
  { href: '/', label: 'TOP', sub: 'top' },
  // { href: '/#roadmap', label: '学習ロードマップ', sub: 'roadmap' },
  { href: '/column', label: 'コラム', sub: 'column', prefetch: false },
  { href: '/about', label: '運営者について', sub: 'about' },
];

const menuButtonClass =
  'hidden cursor-pointer rounded-lg border-[1.5px] border-navy bg-transparent px-3 py-2 font-[family-name:var(--font-oswald)] text-xs font-semibold text-navy max-md:block';

export function SiteHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [railNo, setRailNo] = useState('01');
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [pageRailLabel, setPageRailLabel] = useState<string | null>(null);
  const [isToTopVisible, setIsToTopVisible] = useState(false);
  const [isTopClicked, setIsTopClicked] = useState(false);
  const [logoSpinKey, setLogoSpinKey] = useState(0);

  useEffect(() => {
    const updatePageState = () => {
      setIsNotFoundPage(Boolean(document.querySelector('[data-not-found-page]')));
      setPageRailLabel(
        document.querySelector<HTMLElement>('[data-rail-label]')?.dataset.railLabel ?? null,
      );
    };
    const observer = new MutationObserver(updatePageState);

    updatePageState();
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsToTopVisible(window.scrollY > window.innerHeight * 0.9);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    const sections: Element[] = Array.from(document.querySelectorAll('section'));

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target) + 1;
            setRailNo(String(index).padStart(2, '0'));
          }
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
      <aside
        className="fixed inset-y-0 left-0 z-110 flex w-16 flex-col items-center gap-3.5 border-r-[1.5px] border-navy bg-cream px-0 pt-3.25 pb-4 max-lg:hidden"
        aria-hidden="true"
      >
        <div className="flex size-9.5 items-center justify-center rounded-2.5 border-[1.5px] border-navy bg-yellow">
          <Image className="h-6 w-auto" src="/images/rail-site-logo.svg" alt="Labite" width={150} height={50} />
        </div>
        <div className="flex flex-1 items-center font-[family-name:var(--font-oswald)] text-[11px] tracking-[.3em] uppercase [writing-mode:vertical-rl]">
          web engineering for beginners — labite
        </div>
        <div className="flex size-9.5 items-center justify-center rounded-full border-[1.5px] border-navy bg-white font-[family-name:var(--font-oswald)] text-[13px] font-semibold">
          {isNotFoundPage ? '404' : pageRailLabel ?? railNo}
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-16 z-100 flex h-18 items-center border-b border-navy bg-cream max-lg:left-0 max-md:h-15">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6">
          <Link href="/" aria-label="Labite トップページへ" onClick={closeDrawer}>
            <Image className="h-7.5 w-auto max-md:h-6" src="/images/site-logo.svg" width={150} height={50} alt="Labite" priority />
          </Link>
          <nav className="flex items-center gap-7.5 max-md:hidden" aria-label="グローバルナビゲーション">
            {navItems.map((item) => (
              <Link key={item.sub} href={item.href} prefetch={item.prefetch} className="group flex flex-col items-center leading-[1.3]">
                <span className="text-sm font-bold group-hover:text-blue">{item.label}</span>
                <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.1em] text-blue uppercase">{item.sub}</span>
              </Link>
            ))}
            <Link href="/contact" className={`${yellowPillClass} px-5 py-2.5 text-sm`}>
              お問い合わせ
              <span className={yellowPillArrowClass}><ArrowIcon /></span>
            </Link>
          </nav>
          <button className={menuButtonClass} type="button" onClick={() => setIsDrawerOpen(true)}>
            MENU
          </button>
        </div>
      </header>

      <div className={`${isDrawerOpen ? 'flex' : 'hidden'} fixed inset-0 z-200 flex-col bg-cream px-6 pb-6`} id="drawer">
        <div className="-mx-6 mb-6 flex h-18 items-center justify-between border-b border-navy px-6 max-md:h-15">
          <Image className="h-7.5 w-auto max-md:h-6" src="/images/site-logo.svg" width={150} height={50} alt="Labite" />
          <button className={menuButtonClass} type="button" onClick={closeDrawer}>
            CLOSE
          </button>
        </div>
        <ul>
          {navItems.map((item) => (
            <li className="border-b-[1.5px] border-dashed border-navy" key={item.sub}>
              <Link className="flex items-baseline justify-between px-1 py-4.5 font-bold" href={item.href} prefetch={item.prefetch} onClick={closeDrawer}>
                {item.label}
                <span className="font-[family-name:var(--font-oswald)] text-[11px] text-blue uppercase">{item.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className={`${yellowPillClass} mt-7 justify-center`} onClick={closeDrawer}>
          お問い合わせ
          <span className={yellowPillArrowClass}><ArrowIcon /></span>
        </Link>
      </div>

      <a
        className={`${isNotFoundPage ? 'hidden' : 'flex'} ${isToTopVisible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} ${isTopClicked ? 'bg-white! translate-y-0!' : ''} fixed right-5 bottom-5 z-90 size-23 items-center justify-center rounded-full border-2 border-navy bg-white transition-[opacity,transform,background] duration-400 hover:-translate-y-0.75 hover:bg-yellow max-md:size-19.5`}
        href="#"
        aria-label="ページ上部へ戻る"
        onClick={scrollToTop}
        onMouseLeave={() => setIsTopClicked(false)}
      >
        <svg className="absolute inset-1.25 animate-[ttSpin_16s_linear_infinite]" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="ttCircle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
          </defs>
          <text className="fill-navy font-[family-name:var(--font-oswald)] text-[10px] font-semibold uppercase">
            <textPath href="#ttCircle" textLength="245" lengthAdjust="spacing">
              LABITE - BACK TO TOP&nbsp;-&nbsp;
            </textPath>
          </text>
        </svg>
        <svg
          key={logoSpinKey}
          className={`${logoSpinKey > 0 ? 'animate-[logoSpin_.9s_cubic-bezier(.2,.7,.2,1)]' : ''} absolute size-11 overflow-visible drop-shadow-[1.5px_1.5px_0_#FFC94B] max-md:size-9.5`}
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
