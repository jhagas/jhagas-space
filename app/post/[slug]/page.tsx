import Container from "../../../components/container";
import PostBody from "../../../components/post-body";
import Header from "../../../components/header";
import PostHeader from "../../../components/post-header";
import { getPostBySlug, getAllPosts, getSimilarPosts } from "../../../lib/api";
import markdownToHtml from "../../../lib/markdownToHtml";
import MoreStories from "../../../components/more-stories";
import Comment from "../../../components/comment-comp";
import HandleUp from "../../../components/movehandle";
import { Metadata } from "next";
import { Article } from "schema-dts";
import Footer from "../../../components/footer";

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

  const content = await markdownToHtml(postData.content || "");
  const post = {
    ...postData,
    content,
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
            author={post.author}
            tags={post.tags}
          />
          <PostBody content={post.content} />
        </article>
        <Comment slug={post.slug} key={post.slug} />
      </Container>
      <MoreStories posts={morePosts} name="Artikel Serupa" minimal={true} />
      <Footer />
    </>
  );
}
