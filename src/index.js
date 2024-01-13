import React from "react";
import "./index.scss";
import { createRoot } from "react-dom/client";
import AppRouter from "./utils/router.tsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);
