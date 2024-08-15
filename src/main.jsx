import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter";
import { Analytics } from "@vercel/analytics/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <>
    <AppRouter />
    <Analytics />
  </>,

  //   </React.StrictMode>,
);
