import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import PostTitle from "./post-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  tags: string;
};

const PostHeader = ({ title, coverImage, date, tags }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="pt-10 pb-10 md:pb-12 md:pt-20 px-5 max-w-4xl">
        <PostTitle>{title}</PostTitle>
        <div className="text-xs sm:text-sm text-center mt-3">
          <p className="font-semibold text-[#475467] dark:text-slate-300 inline">
            <DateFormatter dateString={date} /> •{" "}
          </p>
          <p className="font-black text-[#1D2939] dark:text-blue-300 inline">
            {tags}
          </p>
        </div>
      </div>
      <div className="mx-3 mb-4 md:mb-8 sm:mx-0 max-w-5xl">
        <CoverImage src={coverImage} />
      </div>
    </div>
  );
};

export default PostHeader;
