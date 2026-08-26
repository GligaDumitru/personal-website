import { useTheme } from "../context/ThemeProvider";

const Header = () => {
  const { mode, setMode } = useTheme();

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 md:flex md:items-center md:justify-between md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 w-full flex justify-between items-center min-h-11.5">
          <a
            className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80 dark:text-neutral-200"
            href="/"
            aria-label="Gliga"
          >
            Dumitru.
          </a>
          <button
            onClick={() => {
              const value = mode === "light" ? "dark" : "light";
              setMode(mode === "light" ? "dark" : "light");

              localStorage.theme = value;
            }}
            className="cursor-pointer p-2 border text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-neutral-700 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 border-gray-200 rounded-full"
          >
            {mode === "light" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            )}

            {mode === "dark" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
