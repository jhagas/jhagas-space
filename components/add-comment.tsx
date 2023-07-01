import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

type params = {
  slug: string;
  max: number;
  pagination: number;
  forcer: boolean;
  setPage: Dispatch<SetStateAction<number>>;
  setForcer: Dispatch<SetStateAction<boolean>>;
};

export default function AddComment({
  slug,
  max,
  pagination,
  setPage,
  forcer,
  setForcer,
}: params) {
  const [newComment, setNewComment] = useState({ name: "", comment: "", slug });
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewComment((values) => ({ ...values, [name]: value }));
  };

  async function sendComment() {
    setLoading(true);
    const response = await fetch("/api/add-comment", {
      method: "POST",
      body: JSON.stringify(newComment),
    });

    let maxi = max;
    maxi++;

    const newMax = Math.ceil(maxi / pagination);
    setPage(newMax);
    setLoading(false);
    setForcer(!forcer);
    setNewComment({ name: "", comment: "", slug });
  }

  const check =
    newComment.comment.length < 5 || newComment.name.length < 4 || loading || !checkbox;

  return (
    <div className="mb-5 pt-4 pb-3 px-6 mx-4 rounded-3xl bg-zinc-100 dark:bg-zinc-800 shadow-sm">
      <p className="mt-3 text-center font-extrabold text-[#3E3B92] dark:text-[#12c2e9] mb-2 text-lg">
        Tambahkan Komentar
      </p>
      <div className="form-control w-full mb-4 px-5">
        <label className="label py-2 px-4">
          <span className="label-text text-zinc-700 dark:text-zinc-200">
            Nama Anda
          </span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Tuliskan nama anda..."
          className="comment"
          value={newComment.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-control w-full px-5">
        <label className="label py-2 px-4">
          <span className="label-text text-zinc-700 dark:text-zinc-200">
            Komentar
          </span>
        </label>
        <input
          type="text"
          name="comment"
          placeholder="Tuliskan komentar anda..."
          className="comment"
          value={newComment.comment}
          onChange={handleChange}
        />
      </div>
      <div className="form-control px-5 mt-4">
        <label className="label cursor-pointer">
          <input
            type="checkbox"
            className="checkbox mr-3 checkbox-success"
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
          <span className="label-text text-zinc-700 dark:text-zinc-200">
            Dengan mencentang ini anda telah mengetahui bahwa komentar tidak
            bisa diedit kembali
          </span>
        </label>
      </div>
      <div className="px-5 my-5">
        <div
          onClick={sendComment}
          className={`btn w-full bg-[#F44369] dark:bg-[#d8244b] text-white border-0 hover:bg-[#3E3B92] dark:hover:bg-[#ac1838] ${
            check && "send-disabled"
          }`}
        >
          Kirim Komentar
        </div>
      </div>
    </div>
  );
}
