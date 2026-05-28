'use client';

import { useState } from 'react';
import type { TocItem } from '../libs/render-toc';

type Props = {
  toc: TocItem[];
  styles: Record<string, string>;
};

const INITIAL_VISIBLE_COUNT = 6;

export function TableOfContents({ toc, styles }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (toc.length === 0) {
    return null;
  }

  const hasHiddenItems = toc.length > INITIAL_VISIBLE_COUNT;
  const visibleToc = isExpanded ? toc : toc.slice(0, INITIAL_VISIBLE_COUNT);

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className={styles.toc} aria-label="目次">
      <p className={styles.tocTitle}>目次</p>
      <ol className={styles.tocList}>
        {visibleToc.map((item) => (
          <li key={item.id} className={styles[item.name]}>
            <button type="button" onClick={() => scrollToHeading(item.id)}>
              {item.text}
            </button>
          </li>
        ))}
      </ol>
      {hasHiddenItems && (
        <button
          className={styles.tocMoreButton}
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? '閉じる' : '全てを見る'}
        </button>
      )}
    </nav>
  );
}
