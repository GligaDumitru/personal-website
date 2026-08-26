import { IProjectItem } from "../../../types";

const assetUrl = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;

const ProjectItem = ({
  title,
  description,
  image,
  tags,
  url,
}: IProjectItem) => {
  return (
    <a
      className="group block relative overflow-hidden rounded-lg border border-gray-200 dark:border-neutral-700"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative overflow-hidden">
        <img
          className="w-full aspect-video object-cover bg-gray-100 dark:bg-neutral-800"
          src={assetUrl(image)}
          alt={title}
        />
        <div className="absolute bottom-1 end-1 opacity-0 group-hover:opacity-100 transition">
          <div className="flex items-center gap-x-1 py-1 px-2 bg-white border border-gray-200 text-gray-800 rounded-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
            <svg
              className="shrink-0 size-3"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <span className="text-xs">View</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
          {title}
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default ProjectItem;
