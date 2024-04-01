import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";

import rehypeShikiFromHighlighter from "@shikijs/rehype/core";

import { getHighlighterCore } from "shiki/core";

const highlighter = await getHighlighterCore({
  themes: [
    import("shiki/themes/min-dark.mjs"),
    import("shiki/themes/min-light.mjs"),
  ],
  langs: [
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/matlab.mjs"),
    import("shiki/langs/cpp.mjs"),
  ],
  loadWasm: import("shiki/wasm"),
});

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeShikiFromHighlighter as any, highlighter, {
      themes: {
        light: "min-light",
        dark: "min-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.value;
}
