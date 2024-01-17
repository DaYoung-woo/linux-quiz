import { Outlet } from "react-router-dom";
import logo from "../../assets/img/logo.svg";
import logout from "../../assets/img/logout.svg";
function App() {
  const photoURL = localStorage.getItem("photoURL");

  return (
    <div className={`admin-app mx-auto `}>
      <div className="admin-app-body">
        <nav>
          <ul>
            <li className="flex justify-center">
              <img src={logo} alt="logo" className="w-16 basic-button" />
            </li>
            <li>
              <a href="#">문제 관리</a>
            </li>
            <li>
              <a href="#">로그 관리</a>
            </li>
          </ul>
        </nav>
        <main>
          <header className="h-16 ">
            <img src={logout} alt="logout" className="w-6 mr-2" />
            <img src={photoURL} alt="logo" className="w-8 rounded-full mr-4" />
          </header>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
