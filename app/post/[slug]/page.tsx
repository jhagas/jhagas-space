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
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { h } from "hastscript";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import Image from "next/image";

function addCopyButton() {
  return {
    pre(node) {
      const button = h(
        "button",
        {
          class: "copy",
          "data-code": this.source,
          onclick: `
          navigator.clipboard.writeText(this.dataset.code);
          this.classList.add('copied');
          setTimeout(() => this.classList.remove('copied'), 3000)
        `,
        },
        [h("span", { class: "ready" }), h("span", { class: "success" })]
      );

      node.children.push(button);
    },
  };
}

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

  const { result } = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: {
        light: "min-light",
        dark: "min-dark",
      },
      keepBackground: false,
      tokensMap: {
        fn: "entity.name.function",
        var: "variable.parameter",
        obj: "variable.other.object",
        key: "keyword",
      },
      transformers: [addCopyButton()],
    })
    .use(rehypeReact, {
      Fragment: prod.Fragment,
      jsx: prod.jsx,
      jsxs: prod.jsxs,
      components: {
        p({ node, ...rest }) {
          return <p className="my-6 text-justify break-words" {...rest} />;
        },
        img({ node, ...rest }) {
          return (
            <Image
              src={rest.src || ""}
              alt={rest.alt || ""}
              height="400"
              width="500"
              className="rounded-lg my-10 w-full max-w-2xl mx-auto dark:bg-white"
            />
          );
        },
        blockquote({ node, ...rest }) {
          if (Array.isArray(rest.children) && rest.children.length > 1) {
            return (
              <blockquote className="pl-8 pr-8 py-8 my-3 rounded-lg font-semibold border border-l-[10px] border-l-[#f44369] dark:border-l-[#f44369] border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
                {rest.children[1].props.children}
              </blockquote>
            );
          }
          return (
            <blockquote
              className="pl-8 pr-8 py-2 my-3 rounded-lg font-semibold border border-l-[10px] border-l-[#f44369] dark:border-l-[#f44369] border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
              {...rest}
            />
          );
        },
        h2({ node, ...rest }) {
          return (
            <h2
              className="bg-gradient-to-tl from-[#F44369] to-[#3E3B92] dark:to-[#16BFFD] text-3xl mt-12 mb-4 leading-snug font-bold text-transparent bg-clip-text max-w-fit"
              {...rest}
            />
          );
        },
        h3({ node, ...rest }) {
          return (
            <h3
              className="text-2xl mt-8 mb-4 leading-snug font-bold"
              {...rest}
            />
          );
        },
        h4({ node, ...rest }) {
          return <h4 className="font-bold" {...rest} />;
        },
        h5({ node, ...rest }) {
          return <h5 className="font-bold" {...rest} />;
        },
        h6({ node, ...rest }) {
          return <h6 className="font-bold" {...rest} />;
        },
        a({ node, ...rest }) {
          return (
            <a
              className="hover:underline transition-colors text-[#F44369] hover:text-[#3E3B92] dark:hover:text-[#7c79d7]"
              {...rest}
            ></a>
          );
        },
        li({ node, ...rest }) {
          return <li className="pl-2 text-[0.95rem] mt-2" {...rest} />;
        },
        ul({ node, ...rest }) {
          return <ul className="list-disc ml-10 my-3" {...rest} />;
        },
        ol({ node, ...rest }) {
          return <ol className="list-decimal ml-10 my-3" {...rest} />;
        },
        table({ node, ...rest }) {
          return (
            <div className="overflow-x-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
              <table
                className="table text-[0.95rem] max-w-full dark:bg-zinc-800"
                {...rest}
              />
            </div>
          );
        },
        tr({ node, ...rest }) {
          return (
            <tr
              className="!text-sm dark:!bg-zinc-800 dark:!border-zinc-700/50 !border-zinc-300"
              {...rest}
            />
          );
        },
        th({ node, ...rest }) {
          return (
            <th
              className="dark:bg-zinc-950 first:static bg-zinc-100 text-[#3E3B92] dark:text-zinc-100"
              {...rest}
            />
          );
        },
      },
    })
    .process(post.content);

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
          <div className="max-w-4xl mx-auto px-5 md:px-0">
            <div className="markdown leading-relaxed">{result}</div>
          </div>
        </article>
        <Comment slug={post.slug} key={post.slug} />
      </Container>
      <MoreStories posts={morePosts} name="Artikel Serupa" minimal={true} />
      <Footer />
    </>
  );
}
