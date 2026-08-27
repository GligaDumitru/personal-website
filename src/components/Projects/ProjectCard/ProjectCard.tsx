import { useState } from "react";
import { IProjectItem, IProjectShot } from "../../../types";
import { slugify } from "../../../utils/slugify";
import Lightbox from "./Lightbox";
import ThemedImage from "./ThemedImage";

const VISIBLE_SHOTS = 3;

const ProjectCard = ({
  year,
  role,
  title,
  description,
  liveUrl,
  repoUrl,
  displayUrl,
  stack,
  hero,
  shots,
  notes,
  flow,
  flowFooter,
}: IProjectItem) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visibleShots = (shots ?? []).slice(0, VISIBLE_SHOTS);
  const gallery: IProjectShot[] = [hero, ...(shots ?? [])];
  const hasOverflow = gallery.length > VISIBLE_SHOTS + 1;
  const overflowCount = gallery.length - VISIBLE_SHOTS;

  return (
    <div id={slugify(title)} className="flex flex-col gap-6 scroll-mt-24">
      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-2.5 py-2 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="min-w-0 flex-1 truncate rounded-md border border-gray-200 bg-white px-[9px] py-1 text-[11.5px] text-gray-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-zinc-400">
            {displayUrl}
          </div>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-none rounded-md border border-gray-200 bg-white px-[9px] py-1 text-[11.5px] text-gray-500 transition-colors duration-150 hover:text-blue-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-zinc-400"
          >
            New tab ↗
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label={`View ${hero.alt} full size`}
          className="group relative block aspect-video w-full cursor-zoom-in bg-gray-50 dark:bg-neutral-900"
        >
          <ThemedImage
            className="absolute inset-0 size-full object-cover"
            src={hero.src}
            srcDark={hero.srcDark}
            alt={hero.alt}
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span className="rounded-lg border border-white/[0.14] bg-[rgba(17,24,39,0.88)] px-4 py-2 text-[13px] font-medium text-white backdrop-blur-[6px]">
              View full size
            </span>
          </span>
        </button>

        <div className="flex flex-col gap-[18px] border-t border-gray-200 p-5 dark:border-neutral-800">
          <div className="flex flex-col gap-1.5">
            <div className="text-xs text-gray-500 dark:text-zinc-400">
              {year} · {role}
            </div>
            <h3 className="text-[15px] font-semibold text-gray-900 dark:text-neutral-50">
              {title}
            </h3>
            <p className="text-pretty text-sm leading-[1.6] text-gray-500 dark:text-zinc-400">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-2.5 gap-x-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:items-start">
            {stack.map((group) => (
              <div className="contents" key={group.label}>
                <div className="text-[12.5px] text-gray-500 sm:pt-1 dark:text-zinc-400">
                  {group.label}
                </div>
                <div className="flex flex-wrap gap-[5px]">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-gray-200 px-2 py-[3px] text-xs text-gray-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-blue-600 bg-blue-600 px-[15px] py-[9px] text-[13px] font-medium text-white transition-colors duration-150 hover:border-blue-700 hover:bg-blue-700"
            >
              Live demo ↗
            </a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-gray-200 bg-white px-[15px] py-[9px] text-[13px] font-medium text-gray-900 transition-colors duration-150 hover:border-gray-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
            >
              Source ↗
            </a>
          </div>
        </div>

        {visibleShots.length > 0 && (
          <div className="grid grid-cols-2 gap-3 border-t border-gray-200 bg-gray-50 p-5 sm:grid-cols-3 dark:border-neutral-800 dark:bg-neutral-900">
            {visibleShots.map((shot, index) => {
              const isOverflowTile = hasOverflow && index === VISIBLE_SHOTS - 1;

              return (
                <div className="flex flex-col gap-[7px]" key={shot.src}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index + 1)}
                    aria-label={
                      isOverflowTile
                        ? `View all ${gallery.length} screenshots`
                        : `View ${shot.alt} full size`
                    }
                    className="group relative block h-[118px] w-full cursor-zoom-in overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-neutral-800"
                  >
                    <ThemedImage
                      className="absolute inset-0 size-full object-cover"
                      src={shot.src}
                      srcDark={shot.srcDark}
                      alt={shot.alt}
                    />
                    {isOverflowTile ? (
                      <span className="absolute inset-0 flex flex-col items-center justify-center gap-px bg-[rgba(9,9,11,0.66)]">
                        <span className="text-[19px] font-semibold tracking-[-0.01em] text-white">
                          +{overflowCount}
                        </span>
                        <span className="text-[11px] text-zinc-200">
                          view all screens
                        </span>
                      </span>
                    ) : (
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <span className="rounded-md border border-white/[0.14] bg-[rgba(17,24,39,0.88)] px-3 py-1.5 text-xs font-medium text-white backdrop-blur-[6px]">
                          View
                        </span>
                      </span>
                    )}
                  </button>
                  <div className="text-xs leading-[1.4] text-gray-500 dark:text-zinc-400">
                    {shot.caption}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>

      {notes && notes.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-50">
            What was hard
          </h3>
          <div className="flex flex-col gap-5 border-l border-gray-200 pl-5 dark:border-neutral-800">
            {notes.map((note) => (
              <div className="flex flex-col gap-1.5" key={note.title}>
                <div className="text-sm font-semibold text-gray-900 dark:text-neutral-50">
                  {note.title}
                </div>
                <p className="text-pretty text-sm leading-[1.6] text-gray-500 dark:text-zinc-400">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {flow && flow.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-neutral-50">
            How a write travels
          </h3>
          <div className="grid grid-cols-1 gap-y-3 gap-x-4 rounded-xl border border-gray-200 bg-white p-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-baseline dark:border-neutral-800 dark:bg-neutral-900">
            {flow.map((row) => (
              <div className="contents" key={row.left}>
                <div
                  className={`text-[13px] font-semibold ${
                    row.accent
                      ? "text-blue-600"
                      : "text-gray-900 dark:text-neutral-50"
                  }`}
                >
                  {row.left}
                </div>
                <div className="text-[13.5px] text-gray-500 dark:text-zinc-400">
                  {row.right}
                </div>
              </div>
            ))}

            {flowFooter && (
              <>
                <div className="col-span-full mt-1 border-t border-gray-200 dark:border-neutral-800" />
                <div className="text-[13px] font-semibold text-gray-500 dark:text-zinc-400">
                  {flowFooter.label}
                </div>
                <div className="text-[13.5px] text-gray-500 dark:text-zinc-400">
                  {flowFooter.note}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          images={gallery}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
};

export default ProjectCard;
