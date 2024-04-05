import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-tight text-center bg-gradient-to-tl from-[#F44369] to-[#3E3B92] dark:to-[#16BFFD] text-transparent bg-clip-text">
      {children}
    </h1>
  );
};

export default PostTitle;
