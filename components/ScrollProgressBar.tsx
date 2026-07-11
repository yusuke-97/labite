'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type ScrollState = {
  progress: number;
  direction: 'up' | 'down';
};

export function ScrollProgressBar() {
  const lastScrollYRef = useRef(0);
  const [scrollState, setScrollState] = useState<ScrollState>({ progress: 0, direction: 'down' });

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
        const currentY = window.scrollY || doc.scrollTop;
        const progress = Math.min(100, Math.max(0, (currentY / scrollable) * 100));
        const direction = currentY < lastScrollYRef.current ? 'up' : 'down';

        lastScrollYRef.current = currentY;
        setScrollState((current) => {
          if (Math.abs(progress - current.progress) <= 0.15 && direction === current.direction) {
            return current;
          }

          return { progress, direction };
        });
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const progress = scrollState.progress;
  const riderLeft = `${progress}%`;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-65 overflow-visible border-t-[1.5px] border-navy bg-[#EFE7D5] px-8 py-2 max-md:px-5.5" aria-label={`スクロール進捗 ${Math.round(progress)}%`}>
      <div className="relative mx-auto h-8 max-w-280 max-md:h-6">
        <div className="absolute top-5 right-0 left-0 h-2 rounded-full border-[1.5px] border-navy bg-transparent max-md:top-3.75 max-md:h-1.5" />
        <div
          className="absolute top-5 left-0 h-2 rounded-full border-[1.5px] border-navy bg-[#E23B34] transition-[width] duration-75 max-md:top-3.75 max-md:h-1.5"
          style={{ width: `${progress}%` }}
        />

        {[0, 25, 50, 75].map((mark) => (
          <span
            className="absolute top-1.25 h-3 w-1.5 rounded-[3px] border-[1.5px] border-navy bg-yellow transition-colors duration-150 data-[passed=true]:bg-[#E23B34] max-md:top-0.75 max-md:h-2.25 max-md:w-1.25"
            key={mark}
            data-passed={progress >= mark}
            style={{ left: `${mark}%`, transform: mark === 0 ? undefined : 'translateX(-50%)' }}
          />
        ))}

        <Image
          className="absolute right-[-9px] bottom-2 h-6.5 w-auto max-md:right-[-7px] max-md:bottom-1.5 max-md:h-5"
          src="/images/finish-flag.svg"
          alt="ゴール"
          width={26}
          height={26}
        />

        <div
          className="pointer-events-none absolute bottom-1 flex -translate-x-1/2 flex-col items-center transition-[left] duration-75 max-md:bottom-0.75"
          style={{ left: riderLeft }}
        >
          <div
            className="mb-1.5 min-w-11 whitespace-nowrap rounded-full border-[1.5px] border-navy bg-white px-2.25 py-0.5 text-center font-mono text-[9.5px] leading-none font-bold text-navy shadow-[2px_2px_0_rgba(23,35,61,.9)] max-md:mb-1 max-md:min-w-9 max-md:px-1.75 max-md:text-[8px] max-md:shadow-[1.5px_1.5px_0_rgba(23,35,61,.9)]"
            style={{
              transform: `translateX(${progress < 6 ? 28 - progress * 4.67 : progress > 94 ? -((progress - 94) * 4.67) : 0}px)`,
            }}
          >
            {Math.round(progress)}%
          </div>
          <Image
            className="mt-1 h-auto w-12.5 max-w-none shrink-0 max-md:mt-0.75 max-md:w-8.5"
            src="/images/pig-rider.svg"
            alt="読書の進み具合"
            width={50}
            height={36}
            style={{
              maxWidth: 'none',
              transform: scrollState.direction === 'up' ? 'scaleX(1)' : 'scaleX(-1)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
