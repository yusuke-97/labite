import Link from 'next/link';
import { ArticleListSection } from '../components/ArticleListSection';
import { getColumnCategories, getLatestColumnPosts } from '../libs/column';

export default async function Home() {
  const [posts, categories] = await Promise.all([
    getLatestColumnPosts(),
    getColumnCategories(),
  ]);

  return (
    <main>
      <section className="relative min-h-[520px] overflow-hidden bg-[url('/images/fv.png')] bg-cover bg-center max-lg:min-h-[480px] max-sm:min-h-[430px]">
        <div className="absolute inset-0 bg-white/55" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.66)_46%,rgba(255,255,255,0.2)_100%)]" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[520px] w-full max-w-7xl items-center justify-center px-10 py-20 max-lg:min-h-[480px] max-lg:px-6 max-lg:py-12 max-sm:min-h-[430px] max-sm:px-4 max-sm:py-10">
          <div className="flex max-w-[680px] flex-col items-center gap-6 text-center">
            <div className="grid gap-4">
              <h1 className="m-0 text-6xl leading-normal font-bold max-sm:text-5xl">
                Labite Blog
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/column"
                className="inline-flex min-h-12 items-center justify-center bg-[#1496A0] px-6 text-base leading-normal font-bold text-white no-underline transition-opacity hover:opacity-85"
              >
                記事一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ArticleListSection title="新着記事" posts={posts} variant="primary" />

      {categories.length > 0 && (
        <section className="mx-auto w-full max-w-7xl px-10 py-20 max-lg:px-6 max-lg:py-12 max-sm:px-4">
          <div className="mb-8 flex items-end justify-between gap-6 max-sm:flex-col max-sm:items-start">
            <div>
              <p className="mb-3 text-sm leading-normal font-bold tracking-normal text-[#1496A0]">CATEGORY</p>
              <h2 className="m-0 text-3xl leading-normal font-bold max-sm:text-2xl">カテゴリーから探す</h2>
            </div>
            <Link
              href="/column"
              className="inline-flex min-h-11 items-center justify-center border border-[#1496A0] bg-[#1496A0] px-5 text-sm leading-normal font-bold text-white no-underline shadow-[0_8px_20px_rgba(20,150,160,0.18)] transition-colors hover:bg-white hover:text-[#1496A0]"
            >
              すべての記事を見る
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/column/category/${category.id}`}
                className="group flex min-h-24 items-center justify-between border border-[#1496A0]/20 bg-white px-6 py-5 text-lg leading-normal font-bold text-inherit no-underline shadow-[0_12px_30px_rgba(17,17,17,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#1496A0] hover:bg-[#f3fbfc] hover:shadow-[0_16px_34px_rgba(20,150,160,0.14)]"
              >
                <span>{category.name}</span>
                <span
                  className="inline-flex size-9 items-center justify-center rounded-full bg-[#bbe0e3] text-[#1496A0] transition-colors group-hover:bg-[#1496A0] group-hover:text-white"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
