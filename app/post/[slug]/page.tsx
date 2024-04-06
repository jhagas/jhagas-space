import "katex/dist/katex.min.css";
import "./body.css";
import Container from "../../../components/container";
import Header from "../../../components/header";
import MoreStories from "../../../components/more-stories";
import Footer from "../../../components/footer";
import { getPostBySlug, getAllPosts, getSimilarPosts } from "../../../lib/api";
import PostHeader from "./post-header";
import Comment from "./comment-comp";
import HandleUp from "./movehandle";
import { Metadata } from "next";
import { Article } from "schema-dts";
import Body from "./post-body";

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "tags",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "desc",
  ]);

  return {
    title: `${post.title} | Jhagas's Space`,
    description: post.desc,
    authors: post.author,
    category: "article",
    openGraph: {
      title: post.title,
      description: post.desc,
      type: "website",
      locale: "id_ID",
      url: `https://www.jhagas.space/posts/${post.slug}`,
      siteName: "Jhagas's Space",
      images: [
        {
          url: `https://www.jhagas.space${post.ogImage.url}`,
          width: 1200,
          height: 630,
          alt: `Ilustrasi artikel ${post.title}`,
        },
      ],
    },
  };
}

export default async function Post({ params }) {
  const postData = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "tags",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "desc",
  ]);
  const morePosts = getSimilarPosts(
    ["title", "date", "slug", "author", "coverImage", "desc", "tags"],
    postData.tags,
    postData.slug
  );

  const post = {
    ...postData,
  };

  const jsonLd: Article = {
    "@type": "BlogPosting",
    url: `https://www.jhagas.space/posts/${post.slug}`,
    image: [`https://www.jhagas.space${post.ogImage.url}`],
    datePublished: post.date,
    dateCreated: post.date,
    dateModified: post.date,
    author: post.author,
    description: post.desc,
    name: post.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Container>
        <article className="mb-16">
          <HandleUp />
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            tags={post.tags}
          />
          <Body content={post.content} />
        </article>
        <Comment slug={post.slug} key={post.slug} />
      </Container>
      <MoreStories posts={morePosts} name="Artikel Serupa" minimal={true} />
      <Footer />
    </>
  );
}
