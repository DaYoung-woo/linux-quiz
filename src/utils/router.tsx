import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import Quiz from "../views/Quiz";
import Bookmark from "../views/Bookmark";
import App from "../App";
import AdminLogin from "../views/admin/Login";
import AdminApp from "../views/admin/App";
import AdminQuiz from "../views/admin/quiz/Quiz";
import AdminQuizForm from "../views/admin/quiz/QuizForm";
import AdminDashBoard from "../views/admin/Dashboard";
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
    element: <AdminApp />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: "quiz",
        element: <AdminQuiz />,
      },
      {
        path: "dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "quiz_form",
        element: <AdminQuizForm />,
      },
    ],
  },
]);

export default AppRouter;
