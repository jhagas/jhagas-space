import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import ThemeProvider from "../components/provider/themes";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jhagas.space"),
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
    <html lang="id" className={inter.className}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
