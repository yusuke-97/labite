import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[rgba(20,150,160,0.18)] bg-[#bbe0e3] max-sm:mt-12">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between px-10 max-sm:px-4 py-12 max-sm:py-6 max-sm:flex-col max-sm:gap-10">
        <div>
          <Link href="/" className="block w-60 max-sm:w-40 no-underline transition-opacity hover:opacity-50" aria-label="トップページへ">
            <Image
              src="/images/site-logo.svg"
              width={240}
              height={80}
              alt="Labite"
              className="h-full w-full object-contain max-sm:w-36"
            />
          </Link>
        </div>
        <nav className="flex items-center justify-end gap-12 max-sm:justify-start max-sm:gap-6" aria-label="フッターナビゲーション">
          <Link href="/" className="text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline">TOP</Link>
          <Link href="/column" prefetch={false} className="text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline">コラム</Link>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-7xl px-10 py-6 max-sm:px-4 max-sm:py-4">
        <small className="block text-sm max-sm:text-xs leading-normal">© 2026 Labite. All Rights Reserved.</small>
      </div>
    </footer>
  );
}
