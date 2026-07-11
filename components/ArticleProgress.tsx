'use client';

import { useEffect, useState } from 'react';

export function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-show');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    const observeFadeElements = () => {
      document.querySelectorAll('.fade:not(.is-show)').forEach((element) => {
        fadeObserver.observe(element);
      });
    };
    const updateProgress = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0
        ? Math.min(100, (window.scrollY / documentHeight) * 100)
        : 0;

      setProgress(nextProgress);
    };

    observeFadeElements();
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      fadeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed top-18 right-0 left-0 z-90 h-1 bg-navy/12 max-md:top-15" aria-hidden="true">
      <div
        className="h-full border-r-[1.5px] border-navy bg-yellow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
