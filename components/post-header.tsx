import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string;
};

const PostHeader = ({ title, coverImage, date, author, tags }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="pt-10 pb-10 md:pb-12 md:pt-20 px-5 max-w-4xl">
        <PostTitle>{title}</PostTitle>
        <div className="text-xs sm:text-sm text-center mt-3">
          <p className="font-semibold text-[#475467] inline">
            <DateFormatter dateString={date} /> •{" "}
          </p>
          <p className="font-black text-[#1D2939] inline">{tags}</p>
        </div>
      </div>
      <div className="mb-4 md:mb-8 sm:mx-0 max-w-5xl">
        <CoverImage title={title} src={coverImage} />
      </div>
    </div>
  );
};

export default PostHeader;
