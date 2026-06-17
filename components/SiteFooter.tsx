import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  innerClass,
  yellowPillArrowClass,
  yellowPillClass,
} from './site-design';

const footerItems = [
  { href: '/', label: 'TOP', sub: 'top' },
  { href: '/roadmap', label: '学習ロードマップ', sub: 'roadmap' },
  { href: '/column', label: 'コラム', sub: 'column', prefetch: false },
  { href: '/about', label: '運営者について', sub: 'about' },
  { href: '/privacy-policy', label: 'プライバシーポリシー', sub: 'privacy' },
];

export function SiteFooter() {
  return (
    <footer className="border-t-[1.5px] border-navy bg-pale-blue text-navy">
      <div className={innerClass}>
        <div className="grid grid-cols-[1.2fr_1fr_.9fr] gap-10 pt-16 pb-10 max-md:grid-cols-1 max-md:gap-8 max-md:pt-12 max-md:pb-8">
          <div>
            <Link href="/" aria-label="Labite トップページへ">
              <Image className="h-7 w-auto" src="/images/site-logo.svg" width={150} height={50} alt="Labite" />
            </Link>
            <p className="mt-3.5 text-[13px] text-navy/85">未経験からWebエンジニアを目指す技術ブログ</p>
          </div>
          <nav aria-label="フッターナビゲーション">
            <ul>
              {footerItems.map((item) => (
                <li className="border-b-[1.5px] border-dashed border-navy/45" key={item.sub}>
                  <Link className="flex justify-between px-0.5 py-2.5 text-[13.5px]" href={item.href} prefetch={item.prefetch}>
                    {item.label}
                    <span className="font-[family-name:var(--font-oswald)] text-[10px] tracking-[.1em] text-blue uppercase">{item.sub}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            {/* 将来、相談・コンサルサービス開始時に「学習・キャリアの相談はこちらから。」へ戻す。 */}
            <p className="mb-3.5 text-[13px] text-navy/85">ご質問・お仕事のご相談などはこちらから。</p>
            <Link className={yellowPillClass} href="/contact">
              お問い合わせ
              <span className={yellowPillArrowClass}><ArrowIcon /></span>
            </Link>
          </div>
        </div>
        <div className="border-t border-navy/25 py-4.5 text-center font-[family-name:var(--font-oswald)] text-[11.5px] tracking-[.08em] text-navy/60">
          © 2026 Labite. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
