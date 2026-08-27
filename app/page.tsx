import Container from "../src/components/Container";
import Header from "../src/components/Header";
import Profile, { ProfileProps } from "../src/components/Profile";
import Education from "../src/components/Education";
import Footer from "../src/components/Footer";
import Projects from "../src/components/Projects";
import Skills from "../src/components/Skills";
import TableOfContents from "../src/components/TableOfContents";
import WorkExperience from "../src/components/WorkExperience";
import data from "../data.json";
import { IEducation, IProjects, ITimelineItem, ITocItem } from "../src/types";
import { slugify } from "../src/utils/slugify";

export default function Home() {
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
    <>
      <Header />
      <Container sidebar={<TableOfContents items={toc} />}>
        <Profile {...profile} />
        <Skills />
        <Education {...education} />
        <Projects {...projects} />
        <WorkExperience timeline={timeline} />
        <Footer />
      </Container>
    </>
  );
}
