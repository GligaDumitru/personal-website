import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IProjectShot } from "../../../../types";
import ThemedImage from "../ThemedImage";

interface LightboxProps {
  images: IProjectShot[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const FOCUSABLE_SELECTOR = "button, [href], [tabindex]:not([tabindex='-1'])";

const Lightbox = ({ images, index, onClose, onNavigate }: LightboxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const image = images[index];

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    containerRef.current?.focus();

    const raf = requestAnimationFrame(() => setVisible(true));

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const goPrev = () => onNavigate((index - 1 + images.length) % images.length);
    const goNext = () => onNavigate((index + 1) % images.length);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        goNext();
        return;
      }
      if (event.key === "Tab") {
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length, index, onClose, onNavigate]);

  return createPortal(
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt}
      tabIndex={-1}
      onClick={onClose}
      className={`fixed inset-0 z-[60] flex cursor-zoom-out flex-col items-center justify-center gap-3.5 bg-[rgba(9,9,11,0.86)] p-4 backdrop-blur-[4px] outline-none transition-opacity duration-[180ms] sm:p-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center gap-2 sm:gap-2.5"
      >
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          aria-label="Previous screenshot"
          className="shrink-0 rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 py-2 text-sm text-neutral-50 transition-colors duration-150 hover:bg-white/[0.14] sm:px-[13px] sm:py-[9px] sm:text-[15px]"
        >
          ←
        </button>

        <ThemedImage
          src={image.src}
          srcDark={image.srcDark}
          alt={image.alt}
          className="h-auto max-h-[78vh] w-auto max-w-[calc(100vw-8.5rem)] rounded-xl border border-white/[0.12] bg-white object-contain sm:max-w-[min(1200px,calc(100vw-11rem))]"
        />

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % images.length)}
          aria-label="Next screenshot"
          className="shrink-0 rounded-lg border border-white/[0.16] bg-white/[0.06] px-2.5 py-2 text-sm text-neutral-50 transition-colors duration-150 hover:bg-white/[0.14] sm:px-[13px] sm:py-[9px] sm:text-[15px]"
        >
          →
        </button>
      </div>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex items-center gap-3"
      >
        <div className="text-[13px] text-zinc-200">{image.caption}</div>
        <div className="text-xs text-zinc-400">
          {index + 1} / {images.length}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-white/[0.16] px-[11px] py-[5px] text-xs text-zinc-400 transition-colors duration-150 hover:text-neutral-50"
        >
          Close · Esc
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;
