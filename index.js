import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
import CssBaseline from "@mui/material/CssBaseline";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <CssBaseline />
    <App />
  </>
);
