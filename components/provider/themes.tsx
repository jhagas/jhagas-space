"use client";

import { useDark } from "./dark";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const css = `
#nprogress {
  position: relative;
  z-index: 9999999;
}
.nprogress-custom-parent {
  pointer-events: none;
  overflow: hidden;
  position: relative;
}
.nprogress-custom-parent #nprogress .bar {
  position: fixed;
  background: #F44369;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
}
`;

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark] = useDark();

  return (
    <main className={`${dark ? "dark" : ""}`}>
      <div id="nprogress-custom-parent"></div>
      <ProgressBar
        height="3px"
        style={css}
        stopDelay={200}
        options={{ showSpinner: false, parent: "#nprogress-custom-parent" }}
      />
      <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-slate-100 min-h-screen overflow-x-clip">
        {children}
      </div>
    </main>
  );
}
