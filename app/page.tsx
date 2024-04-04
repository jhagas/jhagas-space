import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import { getAllPosts } from "../lib/api";
import Header from "../components/header";
import Footer from "../components/footer";

export default async function Index() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "desc",
    "tags",
  ]);

  return (
    <div className="dark:bg-zinc-800">
      <Header />
      <Container>
        <Intro />
      </Container>
      <MoreStories posts={allPosts} name="Semua Artikel" minimal={false} />
      <Footer />
    </div>
  );
}
