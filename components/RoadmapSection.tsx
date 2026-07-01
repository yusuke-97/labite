import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  innerClass,
  outlineTitleClass,
  sectionClass,
  yellowPillArrowClass,
  yellowPillClass,
} from './site-design';
import type { RoadmapStep } from '../libs/roadmap';

const roadmapIcons = [
  (
    <svg key="base" className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="6" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 38h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 16l-4 4 4 4M28 16l4 4-4 4" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="habit" className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M18 6l-2 6h12l-2-6" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="10" y="12" width="24" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="25" r="6" stroke="#FFC94B" strokeWidth="2.5" />
    </svg>
  ),
  (
    <svg key="skill" className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2.5" />
      <path d="M14 22h6M14 16h12M14 28h9" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="31" cy="29" r="4" fill="#FFC94B" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  (
    <svg key="career" className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path d="M8 36V14l14-8 14 8v22" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M8 36h28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M17 36V24h10v12" stroke="#FFC94B" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  (
    <svg key="survival" className="mt-2.5 mb-3 h-11 text-navy max-md:col-start-1 max-md:m-0 max-md:h-10.5" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <rect x="8" y="14" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 14v-3a4 4 0 014-4h4a4 4 0 014 4v3" stroke="currentColor" strokeWidth="2.5" />
      <path d="M16 25h12" stroke="#4A7DFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
];

type Props = {
  steps: RoadmapStep[];
  className?: string;
};

export function RoadmapSection({ steps, className = '' }: Props) {
  if (steps.length === 0) return null;

  return (
    <section className={`${sectionClass} bg-pale-blue ${className}`} id="roadmap">
      <div className={innerClass}>
        <div className="fade mb-12">
          <span className={outlineTitleClass}>Roadmap</span>
          <h2 className="mt-3.5 text-[clamp(22px,3vw,30px)] font-bold">
            未経験からWebエンジニアになるための5つのSTEP
          </h2>
          <p className="mt-3.5 max-w-170">
            何から始めればいいか迷わないように、学習の流れを5つの段階に分けました。各STEPのまとめ記事から読み進めてください。
          </p>
        </div>
        <div className="relative mb-12 grid grid-cols-5 gap-4.5 max-md:grid-cols-1 max-md:gap-6.5">
          {steps.map((step, index) => (
            <div className="fade relative flex min-h-58 flex-col rounded-xl border-[1.5px] border-navy bg-white px-4.5 pt-6 pb-5 transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-[#d9a521] max-md:grid max-md:min-h-0 max-md:grid-cols-[48px_1fr] max-md:items-center max-md:gap-x-3.5" key={step.id}>
              <span className="absolute -top-4 left-4 rounded-full border-[1.5px] border-navy bg-yellow px-3 py-1 font-[family-name:var(--font-oswald)] text-xs font-bold tracking-[.08em]">STEP {step.stepNumber}</span>
              {roadmapIcons[index % roadmapIcons.length]}
              <h3 className="mb-2 text-[17px] max-md:col-start-2 max-md:mb-0">{step.title}</h3>
              <p className="text-[13px] leading-[1.7] text-navy/85 max-md:col-span-2 max-md:mt-3 max-md:text-[13.5px]">{step.lead}</p>
            </div>
          ))}
        </div>
        <div className="fade text-center">
          <Link className={yellowPillClass} href="/roadmap">
            学習ロードマップを見る
            <span className={yellowPillArrowClass}><ArrowIcon /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
