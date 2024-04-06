"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { IoMdCheckboxOutline } from "react-icons/io";

export const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    if (!isCopied) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 pl-1 pr-5 pt-[0.54rem]">
      <label
        className={`swap swap-rotate transition-colors hover:text-zinc-700 hover:dark:text-zinc-50 border bg-zinc-50 dark:bg-zinc-900/10 hover:dark:bg-zinc-900/90 border-zinc-300 dark:border-zinc-700/70 hover:dark:border-zinc-700 hover:bg-zinc-200/80 p-1 rounded-md ${
          isCopied
            ? "text-zinc-700 dark:text-zinc-50"
            : "text-zinc-400 dark:text-zinc-600"
        }`}
      >
        <input
          type="checkbox"
          checked={isCopied}
          disabled={isCopied}
          onChange={copy}
        />
        <div className="swap-on flex">
          <IoMdCheckboxOutline size={20} />
        </div>
        <div className="swap-off">
          <IoCopyOutline size={20} />
        </div>
      </label>
    </div>
  );
};
