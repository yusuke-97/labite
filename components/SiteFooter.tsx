import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[rgba(20,150,160,0.18)] bg-[#1496a04d] max-sm:mt-14">
      <div className="mx-auto flex w-full max-w-[1280px] items-start justify-between px-10 max-lg:px-6 py-12 max-lg:py-10 max-sm:flex-col max-sm:gap-7 max-sm:px-4 max-sm:pt-10 max-sm:pb-7">
        <div className="grid gap-4">
          <Link href="/" className="block w-60 no-underline transition-opacity hover:opacity-50" aria-label="トップページへ">
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
          <Link href="/" className="text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline">コラム</Link>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-[1280px] px-10 py-6 max-sm:px-4 max-sm:py-3.5">
        <small className="block text-sm leading-normal">© 2026 Labite. All Rights Reserved.</small>
      </div>
    </footer>
  );
}
