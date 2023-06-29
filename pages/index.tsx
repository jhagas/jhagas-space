import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import { getAllPosts } from "../lib/api";
import Post from "../interfaces/post";
import Header from "../components/header";
import { BreadcrumbJsonLd } from "next-seo";
import Footer from '../components/footer'

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Tentang Saya",
            item: "/about-me",
          },
        ]}
      />
      <div className="min-h-screen overflow-x-clip dark:bg-zinc-800">
        <Header />
        <Container>
          <Intro />
        </Container>
        <MoreStories posts={allPosts} />
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "desc",
    "tags",
  ]);

  return {
    props: { allPosts },
  };
};
