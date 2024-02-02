import * as React from "react";
import ReactDOM from "react-dom/client";
import { Game } from "./Game";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
