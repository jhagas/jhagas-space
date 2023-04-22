import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Post from "../interfaces/post";
import Header from "../components/header";
import { BreadcrumbJsonLd } from "next-seo";

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
      <Layout>
        <Header />
        <Container>
          <Intro />
        </Container>
        <MoreStories posts={allPosts} />
      </Layout>
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
