"use client";

import { useDark } from "./dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark] = useDark();

  return (
    <main className={`${dark ? "dark" : ""}`}>
      <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-slate-100 min-h-screen overflow-x-clip">
        {children}
      </div>
    </main>
  );
}
