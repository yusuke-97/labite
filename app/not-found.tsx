import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden bg-[#f7fbfb] text-[#171717]">
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(20,150,160,0.16),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.95),transparent_26%),linear-gradient(135deg,#ffffff_0%,#edf8f9_48%,#ffffff_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full border border-[#1496A0]/15 max-sm:h-52 max-sm:w-52"
        aria-hidden="true"
      />

      <section className="mx-auto grid min-h-[calc(100vh-190px)] w-full max-w-7xl place-items-center px-10 py-20 max-lg:px-6 max-lg:py-16 max-sm:px-4 max-sm:py-12">
        <div className="w-full max-w-4xl text-center">
          <p className="mb-5 text-sm leading-normal font-bold tracking-[0.2em] text-[#1496A0]">
            PAGE NOT FOUND
          </p>

          <div className="relative mx-auto mb-8 flex w-full max-w-[620px] items-center justify-center">
            <span
              className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[#1496A0]/35 to-transparent"
              aria-hidden="true"
            />
            <h1 className="relative m-0 bg-[#f7fbfb] px-6 text-[clamp(5rem,16vw,11rem)] leading-none font-black tracking-normal text-[#1496A0]">
              404
            </h1>
          </div>

          <div className="mx-auto max-w-2xl">
            <h2 className="m-0 text-4xl leading-normal font-bold max-sm:text-3xl">
              ページが見つかりませんでした
            </h2>
            <p className="mx-auto mt-5 mb-0 max-w-xl text-base leading-8 font-medium text-[#555]">
              URLが変更されたか、ページが削除された可能性があります。
              トップページから目的のページをお探しください。
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              prefetch={false}
              className="inline-flex min-h-12 items-center justify-center bg-[#1496A0] px-7 text-base leading-normal font-bold text-white no-underline shadow-[0_14px_28px_rgba(20,150,160,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#107982] hover:shadow-[0_18px_34px_rgba(20,150,160,0.26)]"
            >
              トップページへ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
