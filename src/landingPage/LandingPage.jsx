import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./App.css";
import NavBar from "./components/NavBar";
import OurTech from "./components/OurTech";
import Feature from "./components/Feature";
import Introduction from "./components/Introduction";
import Devs from "./components/devs";
import Explore from "./components/Explore";

function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Remove the cookie when the component is mounted
    Cookies.remove("loginType");
  }, []);

  useEffect(() => {
    // Added Preloader
    console.log("Page is Loading");
    const loadEvent = () => {
      console.log("Executing Function");
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    };

    if (document.readyState === "complete") {
      loadEvent();
    } else {
      window.addEventListener("load", loadEvent);
    }

    return () => {
      window.removeEventListener("load", loadEvent);
    };
  }, []);

  // Disable scrolling when page is loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoaded]);

  return (
    <div className="no-scrollbar">
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex h-svh w-full flex-col items-center justify-center bg-cvsu text-2xl">
          <span className="absolute bottom-1/4 text-center font-bebas text-4xl tracking-widest text-white">
            Loading
          </span>

          <img src="/assets/Landing Page/loading.gif" alt="splash" />
        </div>
      )}
      <NavBar />
      <OurTech />
      <Introduction />
      <Feature />
      <Explore />
      <Devs />
    </div>
  );
}

export default LandingPage;
