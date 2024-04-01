import PostPreview from "./post-preview";
import type Post from "../interfaces/post";

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
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            tags={post.tags}
            minimal={minimal}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
