import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import { outlineTitleClass } from './site-design';
import type { RoadmapStep } from '../libs/roadmap';

const stepColors = ['#C6D9F5', '#C3E3CE', '#F3C9A6', '#E0CDEF', '#F5C543'] as const;

const iconClass = 'size-6 max-md:size-6';

const roadmapIcons = [
  (
    <svg key="mindset" className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="m15.8 8.2-2.1 5.5-5.5 2.1 2.1-5.5 5.5-2.1Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="habit" className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 3v4M16 3v4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M4 10h16M9 15l2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="skill" className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m17 8 4 4-4 4M7 8l-4 4 4 4M14.5 4l-5 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="career" className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 20V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="goal" className={iconClass} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  ),
];

type Props = {
  steps: RoadmapStep[];
  className?: string;
};

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-1 overflow-hidden" aria-hidden="true">
      <svg className="absolute -top-7 right-12 size-52 opacity-[.06] max-md:-top-4 max-md:right-4 max-md:size-30" viewBox="0 0 24 24" fill="none">
        <path d="M14.1 5.55a2 2 0 0 0 1.8 0l3.65-1.82A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.55 2.27a2 2 0 0 1-1.8 0l-4.2-2.1a2 2 0 0 0-1.8 0l-3.65 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9L8.1 3.45a2 2 0 0 1 1.8 0l4.2 2.1Z" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
        <path d="M15 5.76v15M9 3.24v15" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
      <svg className="absolute bottom-2 left-[2%] size-38 opacity-[.05] max-md:bottom-2 max-md:left-[3%] max-md:size-22" viewBox="0 0 24 24" fill="none">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v19" stroke="#17233D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" />
      </svg>
    </div>
  );
}

function HeadingIcon() {
  return (
    <span className="inline-flex size-7.5 items-center justify-center rounded-[9px] border-[1.5px] border-navy bg-yellow text-navy max-md:size-7 max-md:rounded-lg">
      <svg className="size-4.5 max-md:size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </span>
  );
}

function NotebookRings() {
  return (
    <span className="pointer-events-none absolute top-[33px] right-0 left-0 z-10 flex -translate-y-1/2 items-center justify-around px-5.5" aria-hidden="true">
      {[0, 1, 2].map((ring) => (
        <span className="relative h-7 w-3 flex-none" key={ring}>
          <span className="absolute -top-1 left-1/2 z-1 size-2.25 -translate-x-1/2 rounded-full border-[1.5px] border-navy bg-[#98A1B5]" />
          <span className="absolute -bottom-1 left-1/2 z-1 size-2.25 -translate-x-1/2 rounded-full border-[1.5px] border-navy bg-[#98A1B5]" />
          <span className="absolute inset-0 z-2 rounded-full border-[1.5px] border-navy bg-[#EFE7D5]" />
        </span>
      ))}
    </span>
  );
}

function RoadmapButton({ full = false }: { full?: boolean }) {
  return (
    <Link
      className={`${full ? 'w-full' : ''} group inline-flex min-h-11.5 items-center justify-center gap-3 rounded-full border-[1.5px] border-navy bg-yellow px-7.5 text-sm font-black text-navy transition-[transform,box-shadow,background] duration-200 hover:-translate-y-0.75 hover:bg-[#f0b92f] hover:shadow-[4px_4px_0_rgba(23,35,61,.25)] max-md:min-h-12 max-md:px-5`}
      href="/roadmap"
    >
      学習ロードマップを見る
      <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-navy text-[11px] text-yellow transition-transform duration-200 group-hover:translate-x-0.75 max-md:size-5">
        <ArrowIcon />
      </span>
    </Link>
  );
}

function DesktopStepCard({ step, index }: { step: RoadmapStep; index: number }) {
  const color = stepColors[index % stepColors.length];
  const isGoal = index === 4;
  const label = isGoal ? 'GOAL' : `STEP ${step.stepNumber}`;
  const number = String(step.stepNumber).padStart(2, '0');

  return (
    <Link
      className="fade group relative flex min-h-55 flex-col gap-1.5 rounded-2xl text-navy transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[5px_5px_0_rgba(23,35,61,.16)]"
      href="/roadmap"
    >
      <div className="h-7.5 rounded-t-2xl border-[1.5px] border-navy" style={{ backgroundColor: color }} />
      <div
        className="relative flex flex-1 flex-col items-start gap-2.75 overflow-hidden rounded-b-2xl border-[1.5px] border-navy px-4.5 pt-6 pb-5.5"
        style={{ backgroundColor: isGoal ? color : '#FFFFFF' }}
      >
        <span className="absolute top-4.5 right-3.5 font-mono text-[46px] leading-none font-bold text-navy/7 group-last:text-navy/10">
          {number}
        </span>
        <span
          className="relative z-1 inline-flex size-13 items-center justify-center rounded-[14px] border-[1.5px] border-navy text-navy"
          style={{ backgroundColor: isGoal ? '#FFFFFF' : color }}
        >
          {roadmapIcons[index % roadmapIcons.length]}
        </span>
        <span
          className="relative z-1 rounded-full border-[1.5px] border-navy px-2.75 py-0.5 font-mono text-[10px] leading-none font-bold tracking-[.1em]"
          style={{ backgroundColor: isGoal ? '#FFFFFF' : color }}
        >
          {label}
        </span>
        <h3 className="relative z-1 text-[16.5px] leading-[1.5] font-black">{step.title}</h3>
        <p className="relative z-1 text-xs leading-[1.85] text-[#414B60]">{step.lead}</p>
      </div>
      <NotebookRings />
    </Link>
  );
}

function MobileStepCard({ step, index }: { step: RoadmapStep; index: number }) {
  const color = stepColors[index % stepColors.length];
  const isGoal = index === 4;
  const label = isGoal ? 'GOAL' : `STEP ${step.stepNumber}`;

  return (
    <Link className="fade relative z-1 flex items-start gap-3.5 text-navy" href="/roadmap">
      <span
        className="flex size-13 flex-none items-center justify-center rounded-[14px] border-[1.5px] border-navy"
        style={{ backgroundColor: color }}
      >
        {roadmapIcons[index % roadmapIcons.length]}
      </span>
      <span
        className="flex-1 rounded-xl border-[1.5px] border-navy px-3.75 py-3 shadow-[3px_3px_0_rgba(23,35,61,.12)]"
        style={{ backgroundColor: isGoal ? color : '#FFFFFF' }}
      >
        <span
          className="inline-flex rounded-full border-[1.5px] border-navy px-2.25 py-0.25 font-mono text-[9px] font-bold tracking-[.1em]"
          style={{ backgroundColor: isGoal ? '#FFFFFF' : color }}
        >
          {label}
        </span>
        <span className="mt-1.5 block text-[15px] leading-[1.5] font-black">{step.title}</span>
        <span className="mt-1 block text-[11.5px] leading-[1.8] text-[#414B60]">{step.lead}</span>
      </span>
    </Link>
  );
}

export function RoadmapSection({ steps, className = '' }: Props) {
  if (steps.length === 0) return null;

  const displaySteps = steps.slice(0, 5);

  return (
    <section className={`relative isolate overflow-hidden bg-[#E7EEF9] py-22 max-md:px-5.5 max-md:py-12 ${className}`} id="roadmap">
      <SectionBackground />

      <div className="mx-auto max-w-280 px-8 max-md:px-0">
        <div className="fade">
          <span className={outlineTitleClass}>Roadmap</span>
          <div className="mt-3.5 flex items-center gap-3 max-md:mt-3 max-md:gap-2.5">
            <HeadingIcon />
            <h3 className="text-[17px] leading-[1.5] font-black max-md:text-[15px]">
              <span className="max-md:hidden">未経験からWebエンジニアになるための5つのSTEP</span>
              <span className="hidden max-md:inline">未経験からの5つのSTEP</span>
            </h3>
          </div>
          <p className="mt-4 max-w-160 text-sm leading-[2] text-[#33405A] max-md:mt-3.5 max-md:text-[13px] max-md:leading-[1.95]">
            何から始めればいいか迷わないように、学習の流れを5つの段階に分けました。各STEPのまとめ記事から読み進めてください。
          </p>
        </div>

        <div className="relative mt-10.5 max-md:hidden">
          <div className="absolute top-11.5 right-[2%] left-[2%] border-t-2 border-dashed border-navy/32" aria-hidden="true" />
          <div className="relative grid grid-cols-5 gap-4">
            {displaySteps.map((step, index) => (
              <DesktopStepCard index={index} key={step.id} step={step} />
            ))}
          </div>
        </div>

        <div className="hidden max-md:block">
          <div className="relative mt-6 flex flex-col gap-3.5">
            <div className="absolute top-3.5 bottom-3.5 left-6.5 border-l-2 border-dashed border-navy/32" aria-hidden="true" />
            {displaySteps.map((step, index) => (
              <MobileStepCard index={index} key={step.id} step={step} />
            ))}
          </div>
        </div>

        <div className="fade mt-10.5 flex justify-center max-md:mt-6">
          <RoadmapButton full={false} />
        </div>
      </div>
    </section>
  );
}
