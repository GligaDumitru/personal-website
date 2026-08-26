import { useEffect, useState } from "react";

export const useHideOnScroll = (afterSelector?: string) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const afterElement = afterSelector
      ? document.querySelector(afterSelector)
      : null;

    let lastScrollY = window.scrollY;

    const getThreshold = () =>
      afterElement
        ? afterElement.getBoundingClientRect().bottom + window.scrollY
        : 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledDown = currentScrollY > lastScrollY;

      setHidden(scrolledDown && currentScrollY > getThreshold());
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [afterSelector]);

  return hidden;
};
