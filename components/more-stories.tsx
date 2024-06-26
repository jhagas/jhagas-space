import PostPreview from "./post-preview";
import Author from "../interfaces/author";

type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  desc: string;
  tags: string;
};

type Props = {
  posts: Post[];
  name: string;
  minimal: boolean;
};

const MoreStories = ({ posts, name, minimal }: Props) => {
  return (
    <section>
      <div className="flex flex-col gap-5 bg-zinc-50 dark:bg-zinc-900 px-3 py-9">
        <div className="mx-auto">
          <p className="font-semibold text-xl">
            {posts.length === 0 ? `Tidak Ada ${name}` : name}
          </p>
        </div>
        {posts.map((post, index) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            tags={post.tags}
            minimal={minimal}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
