import { IProjectItem, IProjects } from "../../types";
import ProjectItem from "./ProjectItem";

const Projects = ({ title, items }: IProjects) => {
  return (
    <div id="projects" className="mt-10 sm:mt-14 scroll-mt-24">
      <h2 className="mb-3 font-medium text-gray-800 dark:text-neutral-200">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item: IProjectItem) => (
          <ProjectItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
