import Link from "next/link";
import { BsFillRocketTakeoffFill, BsMoon, BsSun } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import { SiLinkedin } from "react-icons/si";
import { CiMail } from "react-icons/ci";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { DarkContext } from "./_app";
import { useContext } from "react";

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
    name: "Contact on Email",
    link: "mailto:jhagas@e.email",
    logo: CiMail,
  },
];

function Seo() {
  return (
    <NextSeo
      title="Tentang Jhagas Hana Winaya | Jhagas's Space, Science & Technology Blog"
      description="Sekilas tentang Jhagas Hana Winaya, penulis blog Jhagas's Space"
      canonical="https://www.jhagas.space/about-me"
      openGraph={{
        profile: {
          firstName: "Jhagas",
          lastName: "Winaya",
          gender: "male",
        },
        title:
          "Tentang Jhagas Hana Winaya | Jhagas's Space, Science & Technology Blog",
        description:
          "Sekilas tentang Jhagas Hana Winaya, penulis blog Jhagas's Space",
        type: "website",
        locale: "id_ID",
        url: "https://www.jhagas.space/about-me",
        siteName: "Jhagas's Space",
        images: [
          {
            url: "https://www.jhagas.space/assets/aboutog.png",
            width: 1200,
            height: 630,
            alt: "Jhagas's Space, Tentang Saya",
          },
        ],
      }}
    />
  );
}

export default function About() {
  const { dark, setDark } = useContext(DarkContext);
  return (
    <>
      <Seo />
      <div className="bg-zinc-50 dark:bg-zinc-900 px-4 h-screen transition-colors duration-300">
        <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl min-w-min shadow-md">
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
            <div
              className="btn btn-ghost dark:hover:bg-zinc-700"
              onClick={() => setDark(!dark)}
            >
              {!dark ? <BsMoon size={18} /> : <BsSun size={20} />}
            </div>
          </div>
          <div className="mt-5">
            <span className="text-gray-800 dark:text-slate-200">
              <p className="text-center">
                Nama saya Jhagas Hana Winaya, saya adalah seorang mahasiswa
                Fisika dan Gen Z yang punya pemikiran progresif, berorientasi
                pada nilai-nilai global. Ahli koding + pencurry meme handal.
                Punya ketertarikan dengan teknologi bleeding-edge, IoT dan juga
                Embedded Computer (Mikrokontroler)
              </p>
            </span>
            <div className="text-gray-600 dark:text-zinc-400 mt-8 block text-sm text-center">
              <p>Hubungi saya melalui</p>
              <div className="flex flex-row w-full justify-center items-center mt-4">
                {tech.map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      title={item.name}
                      className="relative mx-2 transition duration-200 focus:scale-125 hover:scale-125 hover:text-slate-800 focus:text-slate-800"
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
