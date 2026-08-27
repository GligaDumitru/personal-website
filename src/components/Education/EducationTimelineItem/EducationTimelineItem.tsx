import { IEducationItem } from "../../../types";
import { slugify } from "../../../utils/slugify";
import { assetUrl } from "../../../utils/assetUrl";
import { GraduationCapIcon } from "../../../icons";

const EducationTimelineItem = ({
  startDate,
  endDate,
  institution,
  title,
  logo,
}: IEducationItem) => {
  return (
    <div
      id={slugify(title)}
      className="group relative flex gap-x-5 scroll-mt-24"
    >
      <div className="relative group-last:after:hidden after:absolute after:top-8 after:bottom-2 after:start-3 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-6 flex justify-center items-center">
          <GraduationCapIcon className="shrink-0 size-6 text-gray-600 dark:text-neutral-400" />
        </div>
      </div>

      <div className="grow pb-8 group-last:pb-0 flex items-start gap-x-3">
        {logo && (
          <div className="size-12 shrink-0 rounded-md border border-gray-200 bg-white p-1.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <img
              className="size-full object-contain"
              src={assetUrl(logo)}
              alt={`${institution} logo`}
            />
          </div>
        )}
        <div>
          <h3 className="mb-1 text-xs text-gray-600 dark:text-neutral-400">
            {startDate} - {endDate}
          </h3>
          <p className="font-semibold text-sm text-gray-800 dark:text-neutral-200">
            {title}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            {institution}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationTimelineItem;
