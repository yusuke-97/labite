export const innerClass = 'mx-auto max-w-280 px-6';

export const sectionClass = 'py-24 max-md:py-16';

export const outlineTitleClass =
  'block font-[family-name:var(--font-oswald)] text-[clamp(40px,6vw,72px)] font-bold leading-none tracking-[.06em] text-transparent uppercase [-webkit-text-stroke:1.5px_#1D2B50]';

export const pillClass =
  'group inline-flex items-center gap-3 rounded-full border-2 border-navy bg-white px-6.5 py-3.5 text-[15px] font-bold text-navy transition-[transform,background] duration-250 hover:-translate-y-0.75';

export const pillArrowClass =
  'inline-flex size-7 items-center justify-center rounded-full bg-navy text-[13px] text-white transition-transform duration-250 group-hover:translate-x-1';

export const yellowPillClass = `${pillClass} !bg-yellow`;

export const yellowPillArrowClass = `${pillArrowClass} !text-yellow`;

export const bluePillClass = `${pillClass} !bg-blue !text-white`;

export const bluePillArrowClass = `${pillArrowClass} !bg-yellow !text-navy`;

export const cardDotsClass =
  'before:absolute before:left-3.5 before:top-3.5 before:size-2.5 before:rounded-full before:border-[1.5px] before:border-navy before:bg-yellow before:content-[""] after:absolute after:right-3.5 after:bottom-3.5 after:size-2.5 after:rounded-full after:border-[1.5px] after:border-navy after:bg-yellow after:content-[""]';
