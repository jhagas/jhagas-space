import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { BiUpArrow } from "react-icons/bi";
import { ArticleJsonLd, NextSeo } from "next-seo";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  const title = `${post.title} | Jhagas's Space`;
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  function Seo() {
    return (
      <>
        <ArticleJsonLd
          type="BlogPosting"
          url={`/${post.slug}`}
          title={post.title}
          images={[post.ogImage.url]}
          datePublished={post.date}
          dateModified={post.date}
          authorName="Jhagas Hana Winaya"
          description={post.desc}
        />
        <NextSeo
          title={title}
          description={post.desc}
          canonical="https://jhagas.space/"
          openGraph={{
            title: title,
            description: post.desc,
            type: "website",
            locale: "id_ID",
            url: `https://jhagas.space/`,
            siteName: "Jhagas's Space",
            images: [
              {
                url: post.ogImage.url,
                width: 1200,
                height: 630,
                alt: `Ilustrasi gambar artikel ${post.title}`,
              },
            ],
          }}
        />
      </>
    );
  }

  const handleMove = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // here it goes
  };

  return (
    <>
      <Seo />
      <Layout preview={preview}>
        <Header />
        <Container>
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-32">
                <div
                  onClick={handleMove}
                  className="cursor-pointer fixed right-5 bottom-5 bg-[#3E3B92] transition-colors hover:bg-[#F44369] rounded-full h-14 w-14 text-white flex justify-center items-center"
                >
                  <BiUpArrow size="20px" />
                </div>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  tags={post.tags}
                />
                <PostBody content={post.content} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
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
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}