'use client';

import { useState } from 'react';
import type { TocItem } from '../libs/render-toc';

type Props = {
  toc: TocItem[];
  expandable?: boolean;
  variant?: 'default' | 'sidebar';
};

const INITIAL_VISIBLE_COUNT = 6;

export function TableOfContents({ toc, expandable = false, variant = 'default' }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (toc.length === 0) {
    return null;
  }

  const hasHiddenItems = expandable && toc.length > INITIAL_VISIBLE_COUNT;
  const visibleToc = hasHiddenItems && !isExpanded ? toc.slice(0, INITIAL_VISIBLE_COUNT) : toc;
  const isSidebar = variant === 'sidebar';
  const navClassName = isSidebar
    ? 'mt-12 bg-transparent p-0'
    : 'mt-12 bg-[#1496a04d] p-3';
  const titleClassName = isSidebar
    ? 'm-0 border-b-2 border-[#1496A0] bg-transparent pb-2 text-left text-xl leading-normal font-bold'
    : 'm-0 border-b border-[#1496a0] bg-white px-6 py-4 text-center text-xl leading-normal font-bold';
  const listClassName = isSidebar
    ? 'm-0 list-none overflow-y-auto bg-transparent p-0'
    : 'm-0 list-none bg-white p-0';

  const scrollToHeading = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <nav className={navClassName} aria-label="目次">
      <p className={titleClassName}>目次</p>
      <ol className={listClassName}>
        {visibleToc.map((item) => (
          <li
            key={item.id}
            className={
              isSidebar
                ? `py-3 text-sm leading-normal before:content-none ${
                    item.name === 'h2' ? 'text-[15px] font-bold' : 'pl-5 font-normal'
                  }`
                : `relative px-6 py-3 text-base leading-normal font-bold before:absolute before:top-[21px] before:left-9 before:h-0 before:w-0 before:border-x-[6px] before:border-t-[6px] before:border-x-transparent before:border-t-[#1496a0] before:content-[''] ${
                    item.name === 'h2' ? 'text-lg before:content-none' : 'pl-[60px]'
                  }`
            }
          >
            <button
              className="w-full cursor-pointer border-0 bg-transparent p-0 text-left font-[inherit] leading-[1.6] text-inherit hover:text-[#1496A0] hover:underline"
              type="button"
              onClick={() => scrollToHeading(item.id)}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ol>
      {hasHiddenItems && (
        <button
          className="mx-auto mt-3 block w-60 cursor-pointer rounded border border-[#999] bg-white px-6 py-3 text-sm leading-normal font-bold hover:border-[#1496A0] hover:text-[#1496A0]"
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? '閉じる' : '全てを見る'}
        </button>
      )}
    </nav>
  );
}
