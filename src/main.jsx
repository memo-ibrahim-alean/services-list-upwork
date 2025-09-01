import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter.jsx";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);