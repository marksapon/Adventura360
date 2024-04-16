import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Module360 from "./module360/Module360";
import OSD from "./paperjs";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={<Module360 />} />
        <Route path="/map/" element={<OSD />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
