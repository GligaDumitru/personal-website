import Container from "./components/Container";
import Header from "./components/Header";
import Profile, { ProfileProps } from "./components/Profile";

import data from "../data.json";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import { IEducation, ITimelineItem } from "./types";
import Education from "./components/Education";
import Footer from "./components/Footer";

const App = () => {
  const profile = data.profile as ProfileProps;
  const timeline = data.timeline as ITimelineItem[];
  const education = data.education as IEducation;

  return (
    <div className="dark:bg-neutral-900 w-full h-screen">
      <Header />
      <Container>
        <Profile {...profile} />
        <Skills />
        <Education {...education} />
        <WorkExperience timeline={timeline} />
        <Footer />
      </Container>
    </div>
  );
};

export default App;
