import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  title: "Jhagas's Space, Science and Technology Blog",
  description:
    "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science, physics, engineering and bleeding edge technologies",
  canonical: "https://www.jhagas.space/",
  openGraph: {
    title: "Jhagas's Space, Science and Technology Blog",
    description:
      "Exploring Jhagas's Space, a personal blog, and my journey through the fascinating world of science, physics, engineeringa and bleeding edge technologies",
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
