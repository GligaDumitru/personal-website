import Container from "./components/Container";
import Header from "./components/Header";
import Profile, { ProfileProps } from "./components/Profile";

import data from "../data.json";
import Skills from "./components/Skills";
const App = () => {
  const profile = data.profile as ProfileProps;

  return (
    <div className="dark:bg-neutral-900 w-full h-screen">
      <Header />
      <Container>
        <Profile {...profile} />
        <Skills />
      </Container>
    </div>
  );
};

export default App;
