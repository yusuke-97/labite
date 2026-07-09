const affiliateUrl =
  'https://px.a8.net/svt/ejp?a8mat=4B62OI+9Z0EK2+4K3S+60WN5';
const bannerUrl =
  'https://www29.a8.net/svt/bgt?aid=260623890603&wid=001&eno=01&mid=s00000021268001012000&mc=1';
const impressionUrl =
  'https://www18.a8.net/0.gif?a8mat=4B62OI+9Z0EK2+4K3S+60WN5';

export function SkillHacksAffiliate({
  placement = 'before-author',
}: {
  placement?: 'after-summary' | 'before-author';
}) {
  return (
    <aside
      className={
        placement === 'after-summary'
          ? 'mt-8 mb-10 flex flex-col items-center'
          : 'mt-18 mb-8 flex flex-col items-center'
      }
      aria-label="広告"
    >
      <a
        href={affiliateUrl}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        className="block cursor-pointer rounded-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_8px_18px_rgba(29,43,80,0.22)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-blue"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bannerUrl}
          width="300"
          height="250"
          alt=""
          className="block border-0"
        />
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={impressionUrl}
        width="1"
        height="1"
        alt=""
        className="border-0"
      />
    </aside>
  );
}
