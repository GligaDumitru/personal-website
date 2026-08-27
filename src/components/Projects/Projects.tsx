import { IProjectItem, IProjects } from "../../types";
import ProjectCard from "./ProjectCard";

const Projects = ({ title, items }: IProjects) => {
  return (
    <div id="projects" className="mt-10 sm:mt-14 scroll-mt-24">
      <h2 className="mb-6 text-base font-semibold tracking-[-0.01em] text-gray-900 dark:text-neutral-50">
        {title}
      </h2>
      <div className="flex flex-col gap-14">
        {items.map((item: IProjectItem) => (
          <ProjectCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
