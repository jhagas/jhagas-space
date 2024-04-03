import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";

const rehypeWrapTableWithDiv = () => (tree) => {
  // Find table element in the tree
  const indexes = [] as number[];
  const tables = tree.children.filter((node: any, index) => {
    if (node.type === "element" && node.tagName === "table") {
      indexes.push(index);
    }
    return node.type === "element" && node.tagName === "table";
  });

  if (tables.length === 0) return;

  for (let i = 0; i < tables.length; i++) {
    const index = indexes[i];
    const table = tables[i];

    // Create a new div element
    const div: any = {
      type: "element",
      tagName: "div",
      properties: {
        class: "div-table",
      },
      children: [table],
    };

    // Replace the table element with the new div element
    tree.children.splice(index, 1, div);
  }
};

const rehypePrettyCodeOptions = {
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
};

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex as any)
    .use(rehypePrettyCode, rehypePrettyCodeOptions as any)
    .use(rehypeWrapTableWithDiv as any)
    .use(rehypeStringify)
    .process(markdown);

  return result.value;
}
