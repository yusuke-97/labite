export const siteName = 'Labite';

export const siteTitle =
  'Labite | 未経験からWebエンジニアを目指す技術ブログ';

export const siteDescription =
  'Labiteは、未経験からWebエンジニアを目指す方のための技術ブログです。学習記録や開発ノウハウ、キャリアに関する情報など、エンジニアとして成長するための知識を発信しています。';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const ogImage = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
};

export function withSiteName(title: string) {
  return `${title} | ${siteName}`;
}
