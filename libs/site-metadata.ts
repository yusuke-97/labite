export const siteName = 'Labite';

export const siteTitle =
  '未経験からWebエンジニアを目指す学習ロードマップ | Labite';

export const siteDescription =
  'Labiteは、未経験からWebエンジニアを目指す方のための技術ブログです。学習の進め方や開発の基礎知識、キャリアに関する情報を発信しています。';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const ogImage = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
};

export function withSiteName(title: string) {
  return `${title} | ${siteName}`;
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
