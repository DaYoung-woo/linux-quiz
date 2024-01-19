import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import Quiz from "../views/Quiz";
import Bookmark from "../views/Bookmark";
import App from "../App";
import AdminLogin from "../views/admin/Login";
import AdminApp from "../views/admin/App";
import AdminDashboard from "../views/admin/dashboard/Dashboard";
import AdminQuizList from "../views/admin/quiz/QuizList";
import AdminQuizForm from "../views/admin/quiz/QuizForm";
import AdminUserList from "../views/admin/user/UserList";

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
        element: <AdminQuizList />,
      },
      {
        path: "quiz_form",
        element: <AdminQuizForm />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user",
        element: <AdminUserList />,
      },
    ],
  },
]);

export default AppRouter;
