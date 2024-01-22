import { createBrowserRouter } from "react-router-dom";
import Error from "../views/Error";
import CategoryList from "../views/quiz/CategoryList";
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
        element: <CategoryList />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
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
        element: <AdminDashboard />,
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
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <Error />,
  },
]);

export default AppRouter;
