import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillRocketTakeoffFill, BsMoon, BsSun } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import { DarkContext } from "../pages/_app";
import { useContext } from "react";

const Header = () => {
  const [clicked, setClicked] = useState(false);

  const { dark, setDark } = useContext(DarkContext);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => setScrollPosition(window.scrollY);
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`p-0 px-3 shadow-sm bg-white/50 dark:bg-zinc-800/50
      ${scrollPosition > 60 ? "shadow-slate-800/5" : "shadow-transparent"}
      transition-all backdrop-blur-md rounded-b-xl duration-300 sm:px-2 dark:text-slate-200
      ${clicked ? "h-36" : "h-16"}
      md:px-5 max-w-5xl sticky top-0 z-10 mx-auto`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-lg md:text-xl flex gap-3 hover:bg-zinc-300/30 dark:hover:bg-zinc-700/30 hover:text-[#F44369] dark:hover:text-[#ffc6d3]"
          >
            <BsFillRocketTakeoffFill size="22px" className="text-orange-500" />
            Jhagas's Space
          </Link>
        </div>
        <div className="navbar-end center">
          <div
            className="btn btn-ghost hover:bg-zinc-300/30 dark:hover:bg-zinc-700/30"
            onClick={() => setDark(!dark)}
          >
            {!dark ? <BsMoon size={18} /> : <BsSun size={20} />}
          </div>
          <div
            className="dark:text-white"
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden dark:hover:bg-zinc-700 "
            >
              {clicked ? (
                <AiOutlineClose size="20px" />
              ) : (
                <HiOutlineBars3BottomRight size="24px" />
              )}
            </label>
          </div>
          <ul className="flex-row m-0 px-1 hidden lg:flex justify-center items-center gap-3 list-none">
            <li>
              <div>
                <Link
                  href="/about-me"
                  className="btn bg-[#F44369] dark:bg-[#d8244b] text-white border-0 hover:bg-[#3E3B92] dark:hover:bg-[#ac1838]"
                >
                  Tentang Saya
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ul
        className={`flex m-0 flex-col gap-3 pt-2 pb-6 px-4 transition-all ease-out list-none duration-300 ${
          !clicked ? "opacity-0 -translate-y-36 -z-50" : ""
        }`}
      >
        <li>
          <Link
            href="/about-me"
            className="btn w-full bg-[#F44369] dark:bg-[#d8244b] text-white border-0 hover:bg-[#3E3B92] dark:hover:bg-[#ac1838]"
          >
            Tentang Saya
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
