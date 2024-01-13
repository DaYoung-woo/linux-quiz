import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import AppRouter from "./utils/router.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);
