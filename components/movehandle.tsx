"use client";

import { BiUpArrow } from "react-icons/bi";

export default function HandleUp() {
  const handleMove = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // here it goes
  };

  return (
    <div
      onClick={handleMove}
      className="z-50 cursor-pointer fixed right-5 bottom-5 bg-[#3E3B92] transition-colors hover:bg-[#F44369] rounded-full h-14 w-14 text-white flex justify-center items-center"
    >
      <BiUpArrow size="20px" />
    </div>
  );
}
