"use client";

import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import AddComment from "./add-comment";
import CommentType from "../../../interfaces/comment";

const DateFormatter = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "EEEE, d LLLL yyyy, HH:MM z", { locale: id })}
    </time>
  );
};

type params = {
  slug: string;
};

export default function Comment({ slug }: params) {
  const [page, setPage] = useState(1);
  const [commentsNow, setCommentsNow] = useState({} as CommentType);
  const [loading, setLoading] = useState(true);
  const [forcer, setForcer] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch(
        `/api/comments/${slug}?pagination=${page - 1}`
      );
      const data = await response.json();
      setCommentsNow(data);
      setLoading(false);
    }
    getData();
  }, [page, forcer]);

  return (
    <div className="mb-10 max-w-4xl mx-auto">
      <div className="divider"></div>
      {loading && (
        <div className="flex justify-center mb-3">
          <span className="loading loading-ring loading-lg mx-auto"></span>
        </div>
      )}
      <h2 className="font-semibold text-xl text-center mb-3">
        {!loading
          ? commentsNow.data.length != 0
            ? "Komentar Pada Artikel Ini"
            : "Belum Ada Komentar Pada Artikel Ini"
          : "Memuat Komentar..."}
      </h2>
      {!loading &&
        commentsNow.data.length > 0 &&
        commentsNow.data.map((comment, i) => (
          <div
            className="mb-5 pt-4 pb-3 px-6 mx-4 rounded-3xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700"
            key={i}
          >
            <div className="flex gap-3 items-center">
              <Avatar
                name={comment.name}
                maxInitials={1}
                size="40px"
                round={true}
              />
              <div>
                <p className="font-extrabold text-[#3E3B92] dark:text-[#12c2e9]">
                  {comment.name}
                </p>
                <div className="w-full">{comment.comment}</div>
              </div>
            </div>
            <time className="text-xs opacity-50">
              <DateFormatter dateString={comment.time} />
            </time>
          </div>
        ))}
      {Math.ceil(commentsNow.max / commentsNow.pagination) > 1 && (
        <div className="flex justify-center mb-5">
          <div className="flex rounded-2xl overflow-clip shadow-sm">
            <button
              className={`btn bg-zinc-100 border-0 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 rounded-r-none ${
                loading ? "btn-disabled" : "text-[#3E3B92] dark:text-[#12c2e9]"
              }`}
              onClick={() => page > 1 && setPage(page - 1)}
            >
              «
            </button>
            <button className="bg-zinc-100 dark:bg-zinc-800 px-5">
              Halaman {page} /{" "}
              {Math.ceil(commentsNow.max / commentsNow.pagination)}
            </button>
            <button
              className={`btn bg-zinc-100 border-0 hover:bg-zinc-300 dark:bg-zinc-800 hover:dark:bg-zinc-700 rounded-l-none ${
                loading ? "btn-disabled" : "text-[#3E3B92] dark:text-[#12c2e9]"
              }`}
              onClick={() =>
                page < Math.ceil(commentsNow.max / commentsNow.pagination) &&
                setPage(page + 1)
              }
            >
              »
            </button>
          </div>
        </div>
      )}
      <div className="divider"></div>
      <AddComment
        slug={slug}
        max={commentsNow.max}
        pagination={commentsNow.pagination}
        setPage={setPage}
        forcer={forcer}
        setForcer={setForcer}
      />
    </div>
  );
}
