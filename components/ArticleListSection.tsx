import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleCard } from '../libs/column';

type Props = {
  title: string;
  posts: ArticleCard[];
  variant?: 'primary' | 'light';
};

export function ArticleListSection({ title, posts, variant = 'primary' }: Props) {
  if (posts.length === 0) {
    return null;
  }

  const sectionClassName = `mt-18 max-sm:mt-12 px-6 max-sm:px-4 py-12 max-sm:py-8 ${
    variant === 'primary' ? 'bg-[#bbe0e3]' : 'bg-[#fafafa]'
  }`;

  return (
    <section className={sectionClassName}>
      <h2 className="relative m-0 mb-6 border-b-4 border-[#1496A0] px-8 max-sm:px-6 py-4 text-[32px] max-sm:text-2xl leading-normal font-bold before:absolute before:top-0 before:left-0 before:h-8 before:w-8 before:bg-[url('/images/section-title-icon.svg')] before:bg-contain before:bg-center before:bg-no-repeat before:content-['']">
        {title}
      </h2>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-5 gap-y-10">
        {posts.map((post) => (
          <Link key={post.id} href={`/column/${post.id}`} className="group grid grid-cols-[40%_1fr] gap-4 text-inherit no-underline">
            <div className="w-full overflow-hidden">
              <Image
                src={post.image.url}
                width={post.image.width}
                height={post.image.height}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="m-0 overflow-hidden text-base leading-normal font-bold [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:text-[#1496A0] group-hover:underline">
                {post.title}
              </p>
              <time className="text-xs leading-normal" dateTime={post.publishedAt}>
                {dayjs(post.publishedAt).format('YYYY.MM.DD')}
              </time>
              <span className="border border-[#1496A0] px-2 py-1 text-xs leading-normal text-[#1496A0]">{post.category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
