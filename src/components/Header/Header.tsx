import { useHideOnScroll } from "../../hooks/useHideOnScroll";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const hidden = useHideOnScroll("[data-hide-nav-after]");

  return (
    <header
      className={`sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm transition-transform duration-300 ease-in-out ${
        hidden ? "translate-y-[-150%]" : "translate-y-0"
      }`}
    >
      <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 md:flex md:items-center md:justify-between md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
        <div className="px-4 md:px-0 w-full flex justify-between items-center min-h-11.5">
          <Logo />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
