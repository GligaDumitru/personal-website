import { IEducation, IEducationItem } from "../../types";
import EducationTimelineItem from "./EducationTimelineItem";

const Education = ({ title, items }: IEducation) => {
  return (
    <div id="education" className="mt-10 sm:mt-14 scroll-mt-24">
      <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
        {title}
      </h2>
      <div>
        {items.map((item: IEducationItem) => (
          <EducationTimelineItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Education;
