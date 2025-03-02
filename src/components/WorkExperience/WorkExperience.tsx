import { IWorkExperience } from "../../types";
import Timeline from "../Timeline";

const WorkExperience = ({ timeline }: IWorkExperience) => {
  return (
    <div className="mt-10 sm:mt-14">
      <h2 className="mb-5 font-medium text-gray-800 dark:text-neutral-200">
        Work experience
      </h2>
      <Timeline timeline={timeline} />
    </div>
  );
};

export default WorkExperience;
