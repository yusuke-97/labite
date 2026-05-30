import Image from 'next/image';
import Link from 'next/link';
import styles from './SiteHeader.module.scss';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="トップページへ">
          <Image
            src="/images/site-logo.svg"
            width={150}
            height={50}
            alt="Labite"
            className={styles.logo}
            priority
          />
        </Link>
        <nav className={styles.nav} aria-label="グローバルナビゲーション">
          <Link href="/" className={styles.navLink}>TOP</Link>
          <Link href="/" className={styles.navLink}>コラム</Link>
        </nav>
      </div>
    </header>
  );
}
