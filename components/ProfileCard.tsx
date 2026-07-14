import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  cardDotsClass,
  pillArrowClass,
  pillClass,
  yellowPillArrowClass,
  yellowPillClass,
} from './site-design';

const skills = [
  { name: 'PHP', color: '#C6D9F5' },
  { name: 'Laravel', color: '#F3C9A6' },
  { name: 'JavaScript', color: '#C3E3CE' },
];

const profileSummary =
  '未経験からWebエンジニアを目指し、オンラインスクールの学習でつまずきを重ねて現場に立ちました。現在は実務でPHP・Laravel・JavaScriptを用いた開発に2年以上従事しています。同じ場所でつまずいた経験があるからこそ、未経験の方がどこで迷い、何を知れば前に進めるかが分かります。情報を並べるだけでなく「次に何をすればいいか」が見える発信を心がけています。';

const profileItems = [
  {
    title: '実務経験',
    text: 'PHP・Laravel・JavaScript（2年以上）',
    icon: (
      <svg className="size-3.5 flex-none text-[#C08A00]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 7h-9M14 17H5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="2.2" />
        <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    title: '得意分野',
    text: 'バックエンド開発・学習設計',
    icon: (
      <svg className="size-3.5 flex-none text-[#C08A00]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    title: '発信内容',
    text: '学習手順・開発ノウハウ・キャリア情報',
    icon: (
      <svg className="size-3.5 flex-none text-[#C08A00]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 7v14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
        <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
      </svg>
    ),
  },
];

type ProfileCardProps = {
  showProfileLink?: boolean;
  variant?: 'default' | 'top';
};

export function ProfileCard({ showProfileLink = false, variant = 'default' }: ProfileCardProps) {
  if (variant === 'top') {
    return (
      <div className="fade mt-8.5 rounded-2xl border-[1.5px] border-navy bg-white px-12 py-11 shadow-[8px_8px_0_rgba(23,35,61,.10)] max-md:mt-6 max-md:px-5.5 max-md:py-7">
        <div className="grid grid-cols-[200px_1fr] items-start gap-11 max-md:grid-cols-1 max-md:justify-items-center max-md:gap-5.5 max-md:text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative size-46 overflow-hidden rounded-full border-[1.5px] border-navy bg-[#EFE7D5] max-md:size-33">
              <Image
                className="object-cover"
                src="/images/profile-shu.png"
                alt="Labite運営者 しゅう"
                fill
                sizes="(max-width: 768px) 132px, 184px"
              />
            </div>
            <span className="inline-flex rounded-full border-[1.5px] border-navy bg-yellow px-4 py-1.25 font-mono text-[10px] leading-none font-bold tracking-[.14em]">
              AUTHOR
            </span>
          </div>

          <div className="w-full min-w-0">
            <div className="flex flex-wrap items-center gap-4 max-md:justify-center max-md:gap-2.5">
              <p className="text-[26px] leading-none font-black max-md:text-2xl">しゅう</p>
              <span className="rounded-full border-[1.5px] border-navy bg-[#D9E4F6] px-3.5 py-1 text-[11px] leading-none font-bold">
                Webエンジニア ｜ Labite運営者
              </span>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2 max-md:justify-center">
              {skills.map((skill) => (
                <span
                  className="rounded-full border-[1.5px] border-navy px-3.5 py-1 font-mono text-[10px] leading-none font-bold"
                  key={skill.name}
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-[2.1] text-[#33405A] max-md:text-left max-md:text-[13px] max-md:leading-[2]">
              {profileSummary}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 max-lg:grid-cols-1 max-md:mt-4.5 max-md:gap-2.5">
              {profileItems.map((item) => (
                <div className="rounded-xl border-[1.5px] border-navy bg-cream px-4 py-3.5 text-left max-md:px-3.5 max-md:py-3" key={item.title}>
                  <div className="flex items-center gap-1.75">
                    {item.icon}
                    <p className="text-[12px] leading-none font-extrabold">{item.title}</p>
                  </div>
                  <p className="mt-1.5 text-xs leading-[1.7] text-[#414B60]">{item.text}</p>
                </div>
              ))}
            </div>
            {showProfileLink && (
              <Link className={`${pillClass} mt-6.5 bg-white px-5.5 py-2.75 text-[13px] max-md:mt-5`} href="/about">
                プロフィールを見る
                <span className={`${pillArrowClass} size-5 text-[11px] text-yellow`}><ArrowIcon /></span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fade relative rounded-2xl border-[1.5px] border-navy bg-white px-12 py-14 max-md:px-5.5 max-md:py-10 ${cardDotsClass}`}
    >
      <div className="grid grid-cols-[240px_1fr] items-center gap-12 max-md:grid-cols-1 max-md:justify-items-center max-md:gap-8">
        <div className="relative size-50 overflow-hidden rounded-full border-[3px] border-yellow bg-pale-blue max-md:size-35">
          <Image
            className="object-cover"
            src="/images/profile-shu.png"
            alt="Labite運営者 しゅう"
            fill
            sizes="(max-width: 768px) 140px, 200px"
            priority
          />
        </div>
        <div className="w-full">
          <p className="mb-1 text-xl font-bold">しゅう</p>
          <p className="mb-4 text-[13px] font-bold text-[#C99514]">Webエンジニア ｜ Labite運営者</p>
          <div className="mb-5 flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-navy bg-white px-3.5 py-1 text-xs font-bold"
                key={skill.name}
              >
                <span className="size-2.25 rounded-full" style={{ backgroundColor: skill.color }} aria-hidden="true" />
                {skill.name}
              </span>
            ))}
          </div>
          <p className="mb-6 text-[15px] text-navy/90">
            {profileSummary}
          </p>
          <dl>
            <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
              <dt className="font-bold text-blue">実務経験</dt>
              <dd>PHP・Laravel・JavaScript（2年以上）</dd>
            </div>
            <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
              <dt className="font-bold text-blue">得意分野</dt>
              <dd>バックエンド開発・学習設計</dd>
            </div>
            <div className="grid grid-cols-[8.5em_1fr] gap-4 border-b-[1.5px] border-dashed border-navy/45 px-0.5 py-2.5 text-[13.5px] max-md:grid-cols-[6em_1fr]">
              <dt className="font-bold text-blue">発信内容</dt>
              <dd>学習手順・開発ノウハウ・キャリア情報</dd>
            </div>
          </dl>
          {showProfileLink && (
            <Link className={`${yellowPillClass} mt-7`} href="/about">
              プロフィールを見る
              <span className={yellowPillArrowClass}><ArrowIcon /></span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
