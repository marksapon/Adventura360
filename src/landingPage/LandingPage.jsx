import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";
import NavBar from "./components/NavBar";
import OurTech from "./components/OurTech";
import TechStack from "./components/TechStack";
import Showcase from "./components/Showcase";
import Introduction from "./components/Introduction";
import Developers from "./components/Developers";
import Devs from "./components/devs";

function LandingPage() {
  useEffect(() => {
    // Remove the cookie when the component is mounted
    Cookies.remove("loginType");
  }, []);

  return (
    <>
      <NavBar />
      <OurTech />
      <Introduction />
      <Showcase />
      <Devs />
    </>
  );
}

export default LandingPage;
