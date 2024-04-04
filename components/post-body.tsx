import markdownStyles from "./markdown-styles.module.css";
import "katex/dist/katex.min.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-0">
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
