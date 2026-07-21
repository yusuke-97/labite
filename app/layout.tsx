import type { Metadata } from "next";
import { Noto_Sans_JP, Oswald } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { ScrollProgressBar } from "../components/ScrollProgressBar";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import {
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "../libs/site-metadata";
import "./globals.css";
import "./globals.scss";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const gtmId = "GTM-N932H479";
const adsenseClientId = "ca-pub-1529257554548780";
const isProduction = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: ogImage.url,
        width: ogImage.width,
        height: ogImage.height,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${oswald.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <head>
        {isProduction && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      {isProduction && <GoogleTagManager gtmId={gtmId} />}
      <body id="top" className="min-h-full flex flex-col overflow-x-hidden bg-cream text-base leading-[1.8] text-navy [overflow-wrap:anywhere] max-md:text-[15px]">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <ScrollProgressBar />
      </body>
    </html>
  );
}
