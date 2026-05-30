import Image from 'next/image';
import Link from 'next/link';
import styles from './SiteFooter.module.scss';

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink} aria-label="トップページへ">
            <Image
              src="/images/site-logo.svg"
              width={240}
              height={80}
              alt="Labite"
              className={styles.logo}
            />
          </Link>
        </div>
        <nav className={styles.nav} aria-label="フッターナビゲーション">
          <Link href="/" className={styles.navLink}>TOP</Link>
          <Link href="/" className={styles.navLink}>コラム</Link>
        </nav>
      </div>
      <div className={styles.bottom}>
        <small className={styles.copyright}>© 2026 Labite. All Rights Reserved.</small>
      </div>
    </footer>
  );
}
