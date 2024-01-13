import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error.tsx";
import Quiz from "../views/Quiz.tsx";
import Bookmark from "../views/Bookmark.tsx";
import App from "../App";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <App />,
    children: [
      {
        index: true,
        element: <Quiz />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
    ],
  },
]);

export default AppRouter;
