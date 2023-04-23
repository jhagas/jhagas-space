import { AppProps } from "next/app";
import "../styles/index.css";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <DefaultSeo {...SEO} />
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1690174069927248"
        crossOrigin="anonymous"
      ></Script>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}
