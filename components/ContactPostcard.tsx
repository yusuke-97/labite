import Image from 'next/image';
import { TrackedContactLink } from './TrackedContactLink';

type Props = {
  location: 'home' | 'column_detail' | 'column_archive';
  className?: string;
};

function ContactStamp({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'relative w-18.5 flex-none' : 'relative w-24'} aria-hidden="true">
      <div className={`${compact ? 'rounded-[5px] border-2 p-1.25' : 'rounded-md border-2 p-1.75'} rotate-[3deg] overflow-hidden border-dashed border-navy bg-[#DCE8FA]`}>
        <Image className="h-auto w-full" src="/images/contact-person.svg" alt="" width={compact ? 74 : 96} height={compact ? 74 : 96} />
        <div className={`${compact ? 'pt-0.5 pb-px text-[6.5px] tracking-[.18em]' : 'pt-0.75 pb-0.5 text-[7.5px] tracking-[.2em]'} text-center font-mono leading-none font-bold text-navy`}>LABITE</div>
      </div>
      <svg className={`${compact ? '-bottom-2.5 -left-16 w-23' : '-bottom-4.5 -left-21 w-30.5'} absolute text-navy opacity-70`} viewBox="0 0 104 48" fill="none">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeDasharray="4 3" strokeWidth="2" />
        <image href="/images/rail-site-logo.svg" x="13" y="13" width="22" height="22" preserveAspectRatio="xMidYMid meet" />
        <path d="M52 12 q5 -5 10 0 t10 0 t10 0 t10 0M52 24 q5 -5 10 0 t10 0 t10 0 t10 0M52 36 q5 -5 10 0 t10 0 t10 0 t10 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function ContactPostcard({ location, className = '' }: Props) {
  return (
    <div className={`${className} rounded-2xl border-[1.5px] border-navy bg-[repeating-linear-gradient(45deg,#F2635F_0_9px,#FFF8EC_9px_18px,#A9C4EE_18px_27px,#FFF8EC_27px_36px)] p-2 shadow-[7px_7px_0_rgba(23,35,61,.15)]`}>
      <div className="relative overflow-hidden rounded-[10px] border-[1.5px] border-navy bg-white px-5 py-5.5 pb-6">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(23,35,61,.04)_1.5px,transparent_1.5px)] [background-size:16px_16px]" aria-hidden="true" />
        <div className="relative flex min-h-24 items-start justify-between gap-3.5">
          <p className="!mb-0 pt-1 font-mono !text-[9px] !leading-none font-bold tracking-[.3em] text-[#8A8266]">POST CARD</p><ContactStamp compact />
        </div>
        <div className="relative mt-4 block">
          <div className="min-w-0 flex-1">
            <h2 className="!m-0 !border-0 !bg-transparent !p-0 !text-xl !leading-[1.55] font-black text-navy before:!hidden">お問い合わせを<br /><span className="bg-[linear-gradient(transparent_62%,#F5C543_62%,#F5C543_92%,transparent_92%)] px-0.5">受け付けています</span></h2>
            <p className="!mt-3 !mb-0 max-w-130 !text-[12.5px] !leading-[1.95] text-[#4A5468]">サイトや記事に関するご質問、お仕事のご相談、その他のご連絡など、内容を問わずお気軽にお問い合わせください。</p>
            <div className="my-5.5 block"><p className="!mb-0 font-mono !text-[8.5px] !leading-none font-bold tracking-[.24em] text-[#8A8266]">TO :</p><p className="!mb-0 border-b-[1.5px] border-navy/30 py-2.5 pb-1.5 !text-[13.5px] !leading-none font-extrabold text-navy">Labite サイト運営者 宛</p></div>
            <TrackedContactLink className="group flex w-full items-center justify-center gap-2.75 rounded-full border-[1.5px] border-navy bg-[#F2635F] py-2 pr-4.5 pl-2 text-sm font-extrabold !text-white shadow-[3px_3px_0_#17233D] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:!text-white hover:shadow-[5px_5px_0_#17233D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none" location={location}>
              <span className="inline-flex size-8.5 items-center justify-center rounded-full border-[1.5px] border-navy bg-white text-[#F2635F]"><svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M22 2 11 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg></span>
              お問い合わせフォームへ
            </TrackedContactLink>
          </div>
        </div>
      </div>
    </div>
  );
}
