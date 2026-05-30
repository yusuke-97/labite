import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 w-full bg-white shadow-[0_8px_24px_rgba(17,17,17,0.08)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-10 max-lg:px-6 max-sm:px-4 py-4 max-sm:py-4">
        <Link href="/" className="inline-flex items-center no-underline" aria-label="トップページへ">
          <Image
            src="/images/site-logo.svg"
            width={150}
            height={50}
            alt="Labite"
            className="block h-auto w-[150px] max-sm:w-[120px] transition-opacity hover:opacity-50"
            priority
          />
        </Link>
        <nav className="flex items-center justify-end gap-12 max-sm:gap-4" aria-label="グローバルナビゲーション">
          <Link href="/" className="inline-flex items-center text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline max-sm:px-2 max-sm:py-1.5 max-sm:text-[13px]">TOP</Link>
          <Link href="/" className="inline-flex items-center text-base leading-normal font-bold no-underline transition-colors hover:text-[#1496A0] hover:underline max-sm:px-2 max-sm:py-1.5 max-sm:text-[13px]">コラム</Link>
        </nav>
      </div>
    </header>
  );
}
