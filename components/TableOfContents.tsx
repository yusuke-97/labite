'use client';

import { useState } from 'react';
import type { TocItem } from '../libs/render-toc';

type Props = {
  toc: TocItem[];
  variant?: 'mobile' | 'sidebar';
};

const INITIAL_VISIBLE_COUNT = 6;

export function TableOfContents({ toc, variant = 'mobile' }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (toc.length === 0) {
    return null;
  }

  const isSidebar = variant === 'sidebar';
  const hasHiddenItems = !isSidebar && toc.length > INITIAL_VISIBLE_COUNT;
  const visibleToc = hasHiddenItems && !isExpanded ? toc.slice(0, INITIAL_VISIBLE_COUNT) : toc;
  const numberedToc = visibleToc.map((item, index) => ({
    ...item,
    sectionNumber: visibleToc
      .slice(0, index + 1)
      .filter((tocItem) => tocItem.name === 'h2').length,
  }));

  const list = (
    <ol className={isSidebar ? 'max-h-115 overflow-y-auto pr-2' : 'max-h-55.5 overflow-hidden px-4.5 py-3.5'}>
      {numberedToc.map((item) => (
          <li
            key={item.id}
            className={
              item.name === 'h2'
                ? 'py-0.75 text-[14.5px] font-bold'
                : 'py-0.75 pl-5.5 text-[13.5px] text-navy/75'
            }
          >
            <a
              className="group flex w-full cursor-pointer items-baseline gap-2.5 rounded-md border-0 bg-transparent px-2 py-1 text-left font-[inherit] leading-[1.6] text-inherit hover:text-blue"
              href={`#${item.id}`}
            >
              {item.name === 'h2' ? (
                <span className="inline-flex size-5.5 shrink-0 translate-y-0.75 items-center justify-center rounded-full font-[family-name:var(--font-oswald)] text-xs font-semibold text-blue">
                  {String(item.sectionNumber).padStart(2, '0')}
                </span>
              ) : null}
              <span>{item.text}</span>
            </a>
          </li>
      ))}
    </ol>
  );

  if (isSidebar) {
    return list;
  }

  return (
    <nav className="mt-8 hidden overflow-hidden rounded-xl border-2 border-navy bg-white max-lg:block" aria-label="目次">
      <div className="flex items-center justify-between border-b-[1.5px] border-dashed border-navy bg-pale-blue px-4.5 py-3.5 font-bold">
        <span>目次</span>
        <span className="font-[family-name:var(--font-oswald)] text-[11px] tracking-[.2em] text-blue uppercase">index</span>
      </div>
      <div className={isExpanded ? '[&>ol]:max-h-none' : ''}>{list}</div>
      {hasHiddenItems && (
        <button
          className="block w-full cursor-pointer border-0 border-t-[1.5px] border-dashed border-navy bg-pale-blue p-2.75 text-[13px] font-bold tracking-[.06em] text-navy"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? (
            <>
              閉じる <span className="text-[10px]">▲</span>
            </>
          ) : (
            <>
              すべてを見る <span className="text-[10px]">▼</span>
            </>
          )}
        </button>
      )}
    </nav>
  );
}
