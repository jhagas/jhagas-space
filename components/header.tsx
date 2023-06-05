import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [clicked, setClicked] = useState(false);

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
      className={`p-0 px-3 shadow-sm bg-white
      ${scrollPosition > 60 ? "shadow-slate-800/5" : "shadow-transparent"}
      transition-all bg-opacity-50 backdrop-blur-md rounded-b-xl duration-300 sm:px-2
      ${clicked ? "h-36" : "h-16"}
      md:px-5 max-w-5xl sticky top-0 z-10 mx-auto`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-lg md:text-xl flex gap-3 hover:bg-zinc-50 hover:text-[#F44369] transition-colors duration-500"
          >
            <BsFillRocketTakeoffFill size="22px" className="text-orange-500" />
            Jhagas's Space
          </Link>
        </div>
        <div className="navbar-end center">
          <div
            className=""
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              {clicked ? (
                <AiOutlineClose size="20px" />
              ) : (
                <HiOutlineBars3BottomRight size="24px" />
              )}
            </label>
          </div>
          <ul className="flex-row px-1 hidden lg:flex justify-center items-center gap-3 list-none">
            <li>
              <div>
                <Link
                  href="/about-me"
                  className="btn bg-[#F44369] border-0 hover:bg-[#3E3B92]"
                >
                  About me
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
            className="btn w-full bg-[#F44369] border-0 hover:bg-[#3E3B92] text-white"
          >
            Tentang Saya
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
