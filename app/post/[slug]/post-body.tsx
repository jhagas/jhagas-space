import { h } from "hastscript";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime";
import Image from "next/image";
import { CopyButton } from "./copy-button";

function addCopyButton() {
  return {
    pre(node) {
      node.properties.rawcode = this.source;
    },
  };
}

export default async function Body({ content }: { content: string }) {
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
        pre({ ...rest }: any) {
          if (rest.children.type === "code") {
            const code = rest.rawcode;
            delete rest.rawcode;
            return (
              <pre className="relative flex" {...rest}>
                <code {...rest.children.props} className="w-full">
                  {rest.children.props.children}
                </code>
                <CopyButton text={code} />
              </pre>
            );
          }
          return <pre {...rest} />;
        },
        p({ ...rest }) {
          return <p className="my-6 text-justify break-words" {...rest} />;
        },
        img({ ...rest }) {
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
        blockquote({ ...rest }) {
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
        h2({ ...rest }) {
          return (
            <h2
              className="bg-gradient-to-tl from-[#F44369] to-[#3E3B92] dark:to-[#16BFFD] text-3xl mt-12 mb-4 leading-snug font-bold text-transparent bg-clip-text max-w-fit"
              {...rest}
            />
          );
        },
        h3({ ...rest }) {
          return (
            <h3
              className="text-2xl mt-8 mb-4 leading-snug font-bold"
              {...rest}
            />
          );
        },
        h4({ ...rest }) {
          return <h4 className="font-bold" {...rest} />;
        },
        h5({ ...rest }) {
          return <h5 className="font-bold" {...rest} />;
        },
        h6({ ...rest }) {
          return <h6 className="font-bold" {...rest} />;
        },
        a({ ...rest }) {
          return (
            <a
              className="hover:underline transition-colors text-[#F44369] hover:text-[#3E3B92] dark:hover:text-[#7c79d7]"
              {...rest}
            ></a>
          );
        },
        li({ ...rest }) {
          return <li className="pl-2 text-[0.95rem] mt-2" {...rest} />;
        },
        ul({ ...rest }) {
          return <ul className="list-disc ml-10 my-3" {...rest} />;
        },
        ol({ ...rest }) {
          return <ol className="list-decimal ml-10 my-3" {...rest} />;
        },
        table({ ...rest }) {
          return (
            <div className="overflow-x-auto rounded-lg border border-zinc-300 dark:border-zinc-700">
              <table
                className="table text-[0.95rem] max-w-full dark:bg-zinc-800"
                {...rest}
              />
            </div>
          );
        },
        tr({ ...rest }) {
          return (
            <tr
              className="!text-sm dark:!bg-zinc-800 dark:!border-zinc-700/50 !border-zinc-300"
              {...rest}
            />
          );
        },
        th({ ...rest }) {
          return (
            <th
              className="dark:bg-zinc-950 first:static bg-zinc-100 text-[#3E3B92] dark:text-zinc-100"
              {...rest}
            />
          );
        },
      },
    })
    .process(content);

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-0">
      <div className="markdown leading-relaxed">{result}</div>
    </div>
  );
}
