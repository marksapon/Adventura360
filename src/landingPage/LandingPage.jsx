import "./App.css";
import NavBar from "./components/NavBar";
import OurTech from "./components/OurTech";
import TechStack from "./components/TechStack";
import Showcase from "./components/Showcase";
import Introduction from "./components/Introduction";
import Developers from "./components/Developers";

function LandingPage() {
  return (
    <>
      <NavBar />
      <OurTech />
      <Introduction />
      <TechStack />
      <Showcase />
      <Developers />
    </>
  );
}

export default LandingPage;
