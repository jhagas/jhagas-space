import Link from "next/link";
import { BsFillRocketTakeoffFill, BsMoon, BsSun } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import { SiLinkedin } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { Metadata } from "next";

const tech = [
  {
    name: "GitHub Profile",
    link: "https://github.com/jhagas",
    logo: IoLogoGithub,
  },
  {
    name: "LinkedIn Profile",
    link: "https://www.linkedin.com/in/jhagas",
    logo: SiLinkedin,
  },
  {
    name: "Instagram Account",
    link: "https://www.instagram.com/jhagashw",
    logo: FaInstagram,
  },
];

export const metadata: Metadata = {
  title:
    "Tentang Jhagas Hana Winaya | Jhagas's Space, Science & Technology Blog",
  description:
    "Sekilas tentang Jhagas Hana Winaya, penulis blog Jhagas's Space",
  openGraph: {
    type: "website",
    url: "https://www.jhagas.space/about-me",
    title:
      "Tentang Jhagas Hana Winaya | Jhagas's Space, Science & Technology Blog",
    description:
      "Sekilas tentang Jhagas Hana Winaya, penulis blog Jhagas's Space",
    siteName: "Jhagas's Space",
    locale: "id_ID",
  },
};

export default function About() {
  return (
    <>
      <div className="bg-zinc-50 dark:bg-zinc-900 px-4 h-screen transition-colors duration-300 dark:text-zinc-200">
        <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl min-w-min border border-zinc-300 dark:border-zinc-700">
          <Image
            src="/assets/profiles.jpeg"
            alt="Jhagas's Photo of Himself"
            width="200"
            height="200"
            className="rounded-full shadow-md mx-auto mb-3"
          />
          <div className="flex flex-row w-full justify-center items-center font-bold text-xl">
            <Link
              href="/"
              className="btn btn-ghost normal-case text-lg md:text-xl flex gap-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:text-[#F44369] dark:hover:text-[#ffc6d3]"
            >
              <BsFillRocketTakeoffFill
                size="22px"
                className="text-orange-500"
              />
              Jhagas's Space
            </Link>
          </div>
          <div className="mt-5">
            <span className="text-zinc-800 dark:text-zinc-200">
              <p className="text-center">
                Nama saya Jhagas Hana Winaya, saya adalah seorang mahasiswa
                Fisika yang punya pemikiran progresif, berorientasi pada masa
                depan dan nilai-nilai global. Punya ketertarikan dengan
                teknologi, Web-development, Blockchain, AI dan IoT
              </p>
            </span>
            <div className="text-zinc-700 dark:text-zinc-300 mt-8 block text-sm text-center">
              <p>Hubungi saya melalui</p>
              <div className="flex flex-row w-full justify-center items-center mt-3">
                {tech.map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      title={item.name}
                      className="relative mx-2 transition duration-200 focus:scale-125 hover:scale-125 hover:text-zinc-800 focus:text-zinc-800 dark:hover:text-[#ffc6d3] dark:focus:text-[#ffc6d3]"
                    >
                      <item.logo size="28px" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
