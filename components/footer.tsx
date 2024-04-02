const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 py-7 flex flex-col justify-center items-center text-sm font-semibold">
      <p>Copyright {year} - Jhagas Hana Winaya</p>
      <div className="flex flex-wrap gap-2 mx-auto">
        <a
          className="hover:underline text-[#3E3B92] dark:text-[#12c2e9]"
          href="https://www.linkedin.com/in/jhagas"
        >
          LinkedIn
        </a>
        <p>•</p>
        <a
          className="hover:underline text-[#3E3B92] dark:text-[#12c2e9]"
          href="https://www.github.com/jhagas"
        >
          GitHub
        </a>
        <p>•</p>
        <a
          className="hover:underline text-[#3E3B92] dark:text-[#12c2e9]"
          href="https://www.instagram.com/jhagashw"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
