import React, { useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";
import NavBar from "./components/NavBar";
import OurTech from "./components/OurTech";
import Feature from "./components/Feature";
import Introduction from "./components/Introduction";
import Devs from "./components/devs";
import Explore from "./components/Explore";

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
      <Feature />
      <Explore />
      <Devs />
    </>
  );
}

export default LandingPage;
