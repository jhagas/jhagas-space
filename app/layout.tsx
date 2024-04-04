import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ThemeProvider from "../components/provider/themes";
import { Metadata } from "next";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jhagas's Space, a Science and Technology Blog",
  description:
    "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science, physics, engineering and bleeding edge technologies",
  openGraph: {
    title: "Jhagas's Space, Science and Technology Blog",
    description:
      "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science, physics, engineeringa and bleeding edge technologies",
    type: "website",
    locale: "id_ID",
    url: "https://www.jhagas.space/",
    siteName: "Jhagas's Space",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
          integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}