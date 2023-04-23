import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Jhagas's Space",
  description:
    "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science and physics",
  openGraph: {
    title: "Jhagas's Space, My Personal Blog",
    description:
      "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science and physics",
    type: "website",
    locale: "id_ID",
    url: "https://www.jhagas.space/",
    siteName: "Jhagas's Space",
    images: [
      {
        url: "https://www.jhagas.space/assets/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Jhagas's Space with description",
      },
    ],
  },
  themeColor: "#000",
};

export default config;
