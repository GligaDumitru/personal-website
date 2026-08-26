import { MouseEvent, useEffect, useState } from "react";
import { ITocItem } from "../../types";

const flattenIds = (items: ITocItem[]): string[] =>
  items.flatMap((item) => [
    item.id,
    ...(item.children ? flattenIds(item.children) : []),
  ]);

const findParentId = (items: ITocItem[], id: string): string | null => {
  for (const item of items) {
    if (item.children?.some((child) => child.id === id)) return item.id;
  }
  return null;
};

const TableOfContents = ({ items }: { items: ITocItem[] }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = flattenIds(items)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const OFFSET = 96;

    const updateActive = () => {
      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top - OFFSET <= 0) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [items]);

  const activeParentId = activeId ? findParentId(items, activeId) : null;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", `#${id}`);
  };

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block fixed top-24 right-8 w-48"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-neutral-600">
        On this page
      </p>
      <ul className="space-y-3">
        {items.map((item) => {
          const isActive = item.id === activeId || item.id === activeParentId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, item.id)}
                className={`block text-sm transition-colors ${
                  isActive
                    ? "font-medium text-gray-800 dark:text-neutral-200"
                    : "text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                }`}
              >
                {item.label}
              </a>
              {item.children && (
                <ul className="mt-1.5 space-y-1.5 border-s border-gray-200 dark:border-neutral-700 ps-3">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        onClick={(event) => handleClick(event, child.id)}
                        className={`block text-sm transition-colors ${
                          child.id === activeId
                            ? "text-gray-800 dark:text-neutral-200"
                            : "text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200"
                        }`}
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
