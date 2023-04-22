# Jhagas's Space - My Personal Blog

A statically generated blog example using Next.js, Markdown, and TypeScript. In this blog, i want you to explore my journey through the fascinating world of science and physics.

[https://jhagas.space/](https://jhagas.space/)

## Technical Details

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source. The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

To create the blog posts we use [`unified`](https://github.com/unifiedjs/unified) and some of its pluhin to convert the Markdown files (GitHub Flavored Markdown) into an HTML string, and then send it down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page. For styling, this blog uses TailwindCSS V3 and daisyUI

Clone this repository and make changes as you want

```bash
git clone https://github.com/jhagas/jhagas-space/ && npm install
```
