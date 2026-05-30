'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-[#bbe0e3] shadow-[0_8px_24px_rgba(17,17,17,0.08)] backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-10 py-4 max-lg:px-6 max-sm:px-4 max-sm:py-4">
        <Link href="/" className="inline-flex items-center no-underline" aria-label="トップページへ" onClick={closeMenu}>
          <Image
            src="/images/site-logo.svg"
            width={150}
            height={50}
            alt="Labite"
            className="block h-auto w-[150px] max-sm:w-[90px] transition-opacity hover:opacity-50"
            priority
          />
        </Link>
        <nav className="flex items-center justify-end gap-12 max-sm:gap-4 max-md:hidden" aria-label="グローバルナビゲーション">
          <Link href="/" className="inline-flex items-center text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline max-sm:px-2 max-sm:py-1.5 max-sm:text-[13px]">TOP</Link>
          <Link href="/" className="inline-flex items-center text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline max-sm:px-2 max-sm:py-1.5 max-sm:text-[13px]">コラム</Link>
        </nav>
        <button
          className="hidden h-[34px] w-[34px] flex-col items-center justify-center gap-2 bg-transparent text-[#171717] transition-colors hover:text-[#1496A0] max-md:inline-flex"
          type="button"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          aria-controls="site-header-mobile-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="relative block h-4 w-6" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute top-2 left-0 h-0.5 w-6 bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-current transition-transform ${isMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
          </span>
          <span className="text-[10px] leading-none tracking-normal">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
        </button>
        <nav
          id="site-header-mobile-menu"
          className={`absolute top-full left-1/2 min-h-[calc(100vh-66px)] w-screen -translate-x-1/2 bg-white shadow-[0_12px_28px_rgba(17,17,17,0.12)] ${
            isMenuOpen ? 'block md:hidden' : 'hidden'
          }`}
          aria-label="モバイルナビゲーション"
        >
          <Link href="/" className="block border-b border-[#1496A0]/10 px-6 py-4 text-base leading-normal font-bold no-underline transition-colors hover:bg-[rgba(20,150,160,0.08)] hover:text-[#1496A0]" onClick={closeMenu}>TOP</Link>
          <Link href="/" className="block px-6 py-4 text-base leading-normal font-bold no-underline transition-colors hover:bg-[rgba(20,150,160,0.08)] hover:text-[#1496A0]" onClick={closeMenu}>コラム</Link>
        </nav>
      </div>
    </header>
  );
}
