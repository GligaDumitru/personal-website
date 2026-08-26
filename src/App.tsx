import Container from "./components/Container";
import Header from "./components/Header";
import Profile, { ProfileProps } from "./components/Profile";

import data from "../data.json";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import { IEducation, IProjects, ITimelineItem } from "./types";

const App = () => {
  const profile = data.profile as ProfileProps;
  const timeline = data.timeline as ITimelineItem[];
  const education = data.education as IEducation;
  const projects = data.projects as IProjects;

  return (
    <div className="dark:bg-neutral-900 w-full min-h-screen">
      <Header />
      <Container>
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
