import { IEducation, IEducationItem } from "../../types";
import EducationItem from "./EducationItem";

const Education = ({ title, items }: IEducation) => {
  return (
    <div className="mt-10 sm:mt-14">
      <h2 className="mb-3 font-medium text-gray-800 dark:text-neutral-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item: IEducationItem) => (
          <EducationItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Education;
