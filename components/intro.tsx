"use client";

import Typewriter from "typewriter-effect";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center justify-center mt-16 mb-16 md:mb-12">
      <div className="flex flex-col items-center text-center w-full">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-tight text-center bg-gradient-to-tl from-[#F44369] to-[#3E3B92] dark:to-[#16BFFD] text-transparent bg-clip-text">
          <noscript>Physics, Engineering, Coding and Technology, IoT</noscript>
          <Typewriter
            options={{
              strings: [
                "Natural Phenomena",
                "Science and Engineering",
                "Open Source Technology",
                "Internet of Things",
                "Computational Physics",
                "Renewable Energy",
                "Wild Thought",
                "Education",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h2 className="mt-3 max-w-lg px-2">
          Exploring Jhagas's Space, My Journey Through the Fascinating World of
          Science and Physics
        </h2>
      </div>
    </section>
  );
};

export default Intro;
