import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import Quiz from "../views/Quiz";
import Bookmark from "../views/Bookmark";
import App from "../App";
import AdminLogin from "../views/admin/login";

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
  {
    path: "/admin",
    errorElement: <Error />,
    element: <App />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
]);

export default AppRouter;
