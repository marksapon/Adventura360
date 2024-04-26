import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import LandingPage from "./landingPage/LandingPage";
import Module360 from "./module360/Module360";
import OSD from "./paperjs";
import Login from "./loginPage/login";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginType = Cookies.get("loginType");

  useEffect(() => {
    if (!loginType) {
      sessionStorage.setItem("redirectPath", location.pathname);
      navigate("/login/");
    }
  }, [loginType, navigate]);

  return loginType ? children : null;
};

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
        <Route
          path="/app/*"
          element={
            <PrivateRoute>
              <Module360 loginType={loginType} />
            </PrivateRoute>
          }
        />
        <Route path="/map/" element={<OSD />} />
        <Route path="/login/" element={<Login setLoginType={setLoginType} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
