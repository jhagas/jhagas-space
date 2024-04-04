import { MetadataRoute } from "next";
import { getAllPosts } from "../lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts(["date", "slug"]);

  const data = allPosts.map((d) => ({
    url: `https://www.jhagas.space/${d.slug}`,
    lastModified: new Date(d.date),
    changeFrequency: "weekly",
    priority: 0.8,
  })) as MetadataRoute.Sitemap;

  return [
    {
      url: "https://www.jhagas.space",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.jhagas.space/about-me",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...data,
  ];
}
