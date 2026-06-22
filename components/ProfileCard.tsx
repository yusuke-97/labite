import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
import {
  cardDotsClass,
  yellowPillArrowClass,
  yellowPillClass,
} from './site-design';

const skills = [
  { name: 'PHP', color: '#6181B6' },
  { name: 'Laravel', color: '#FF2D20' },
  { name: 'JavaScript', color: '#E8A400' },
];

export function ProfileCard({ showProfileLink = false }: { showProfileLink?: boolean }) {
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
            未経験からWebエンジニアを目指し、独学とつまずきを重ねて現場に立ちました。現在は実務でPHP・Laravel・JavaScriptを用いた開発に2年以上従事しています。同じ場所でつまずいた経験があるからこそ、未経験の方がどこで迷い、何を知れば前に進めるかが分かります。情報を並べるだけでなく「次に何をすればいいか」が見える発信を心がけています。
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
