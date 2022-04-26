import React from "react";
import ReactDom from "react-dom/client";
import { Thing } from "@qxuken/pomodoro-ui";
import  "./index.css";

export let App = () => (
  <div>
    <Thing />
  </div>
);

let root = ReactDom.createRoot(document.getElementById("app"));
root.render(<App />);
