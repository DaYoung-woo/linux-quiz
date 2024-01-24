import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import MainList from "../views/MainList";
import QuizList from "../views/QuizList";
import QuizForm from "../views/QuizForm";
import App from "../App";
import AdminLogin from "../views/admin/Login";
import AdminApp from "../views/admin/App";
import AdminQuizList from "../views/admin/QuizList";
import AdminQuizForm from "../views/admin/QuizForm";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <App />,
    children: [
      {
        index: true,
        element: <MainList />,
      },
      {
        path: "/quiz_list",
        element: <QuizList />,
      },
      {
        path: "/quiz_form",
        element: <QuizForm />,
      },
    ],
  },
  {
    path: "/admin",
    errorElement: <Error />,
    element: <AdminApp />,
    children: [
      {
        index: true,
        element: <AdminQuizList />,
      },
      {
        path: "quiz_form",
        element: <AdminQuizForm />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <Error />,
  },
]);

export default AppRouter;
