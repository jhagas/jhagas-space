import { AppProps } from "next/app";
import "../styles/index.css";
import { Inter } from "next/font/google";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

export const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </div>
  );
}
