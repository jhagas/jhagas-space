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
};

const PostPreview = ({ title, coverImage, date, tags, slug }: Props) => {
  return (
    <Link
      passHref
      href={`/posts/${slug}`}
      className="mx-auto w-full card lg:card-side bg-base-100 shadow-md max-w-4xl dark:bg-zinc-800"
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="mb-4">
          <DateFormatter dateString={date} />
        </div>
        <div className="badge bg-[#3E3B92] dark:text-white border-0">{tags}</div>
      </div>
      <div className="mb-3 lg:mb-0 lg:mr-4">
        <CoverImage title={title} src={coverImage} />
      </div>
    </Link>
  );
};

export default PostPreview;
