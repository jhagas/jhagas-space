import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import matlab from 'highlight.js/lib/languages/matlab'


export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeHighlight, {languages: {matlab}})
    .use(rehypeStringify)
    .process(markdown);

  return result.value;
}
