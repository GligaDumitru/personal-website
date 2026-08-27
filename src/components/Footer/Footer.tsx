import ThemeToggle from "../Header/ThemeToggle";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 sm:mt-14 py-6 border-t border-gray-200 dark:border-neutral-700">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <p className="text-xs text-gray-600 dark:text-neutral-400">
          © {year} Gliga Dumitru.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a
                className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
                href="#"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
                href="#"
              >
                Github
              </a>
            </li>
          </ul>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
