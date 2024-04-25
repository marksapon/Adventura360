import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LandingPage from "./landingPage/LandingPage";
import Module360 from "./module360/Module360";
import OSD from "./paperjs";
import Login from "./loginPage/login";

const AppRouter = () => {
  const [loginType, setLoginType] = useState();

  useEffect(() => {
    const cookieLoginType = Cookies.get("loginType");
    if (cookieLoginType) {
      setLoginType(cookieLoginType);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<Module360 loginType={loginType} />} />
        <Route path="/map/" element={<OSD />} />
        <Route path="/login/" element={<Login setLoginType={setLoginType} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
