import Container from "./components/Container";
import Header from "./components/Header";
import Profile, { ProfileProps } from "./components/Profile";

import data from "../data.json";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import TableOfContents from "./components/TableOfContents";
import WorkExperience from "./components/WorkExperience";
import { IEducation, IProjects, ITimelineItem, ITocItem } from "./types";
import { slugify } from "./utils/slugify";

const App = () => {
  const profile = data.profile as ProfileProps;
  const timeline = data.timeline as ITimelineItem[];
  const education = data.education as IEducation;
  const projects = data.projects as IProjects;

  const toc: ITocItem[] = [
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    {
      id: "projects",
      label: "Projects",
      children: projects.items.map((item) => ({
        id: slugify(item.title),
        label: item.title,
      })),
    },
    {
      id: "work-experience",
      label: "Work Experience",
      children: timeline.map((item) => ({
        id: slugify(`${item.jobTitle}-${item.employer}`),
        label: `${item.jobTitle} @ ${item.employer}`,
      })),
    },
  ];

  return (
    <div className="dark:bg-neutral-900 w-full min-h-screen">
      <Header />
      <Container sidebar={<TableOfContents items={toc} />}>
        <Profile {...profile} />
        <Skills />
        <Education {...education} />
        <Projects {...projects} />
        <WorkExperience timeline={timeline} />
        <Footer />
      </Container>
    </div>
  );
};

export default App;
