import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";
import type Author from "../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  tags: string;
  author: Author;
  slug: string;
  minimal: boolean;
  priority: boolean;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  tags,
  slug,
  minimal,
  priority,
}: Props) => {
  return (
    <Link
      passHref
      href={`/post/${slug}`}
      className="mx-auto w-full card lg:card-side border border-zinc-300 dark:border-zinc-700 max-w-4xl bg-white dark:bg-zinc-800"
    >
      <div className="card-body pb-1 lg:pb-6">
        <h2 className={`card-title ${minimal && "mb-1 text-base lg:text-xl"}`}>
          {title}
        </h2>
        <div className={`mb-2 ${minimal && "hidden lg:block"}`}>
          <DateFormatter dateString={date} />
        </div>
        <div
          className={`badge bg-[#3E3B92] text-white border-0 ${
            minimal && "text-xs lg:text-sm"
          }`}
        >
          {tags}
        </div>
      </div>
      <div className="m-4 sm:m-8 lg:mr-4 lg:max-w-[20rem] lg:min-w-[20rem]">
        <CoverImage
          src={coverImage}
          alt={`Article Image (${title})`}
          priority={priority}
        />
      </div>
    </Link>
  );
};

export default PostPreview;
