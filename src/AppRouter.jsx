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
import Login from "./loginPage/login";
import Adventura360 from "./module360/Adventura360";

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
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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
              <Adventura360 loginType={loginType} BACKEND_URL={BACKEND_URL} />
            </PrivateRoute>
          }
        />
        <Route
          path="/login/"
          element={
            <Login setLoginType={setLoginType} BACKEND_URL={BACKEND_URL} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
