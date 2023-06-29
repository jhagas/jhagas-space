import { AppProps } from "next/app";
import "../styles/index.css";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { Analytics } from "@vercel/analytics/react";
import { useState } from "react";
import { createContext } from "react";
import darkTypes from "../interfaces/dark";
import Head from "next/head";

export const inter = Inter({ subsets: ["latin"] });

export const DarkContext = createContext<darkTypes>({} as darkTypes);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(true);
  return (
    <DarkContext.Provider value={{ dark, setDark }}>
      <div className={inter.className}>
        <div
          className={`transition-color duration-300 ${
            dark && "dark bg-zinc-900 text-slate-100"
          }`}
        >
          <DefaultSeo {...SEO} />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1690174069927248"
            crossOrigin="anonymous"
          ></script>
          <script
            async
            custom-element="amp-auto-ads"
            src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
          ></script>
          <Component {...pageProps} />
          <Analytics />
        </div>
      </div>
    </DarkContext.Provider>
  );
}
