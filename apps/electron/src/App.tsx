import React from "react";
import ReactDom from "react-dom/client";
import { Thing } from "@pomodorqo/ui";

export let App = () => (
  <div>
    <Thing />
  </div>
);

let root = ReactDom.createRoot(document.getElementById("app"));
root.render(<App />);
