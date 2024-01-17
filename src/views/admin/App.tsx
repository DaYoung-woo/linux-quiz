import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../../assets/img/logo.svg";
import Header from "../../components/admin/frame/Header";

function App() {
  const [user, setUser] = useState(null);
  const naviagte = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
      if (!userInfo) naviagte("/admin");
      if (userInfo && location.pathname === "/admin") naviagte("/admin/quiz");
    });
  }, []);

  return (
    <>
      {user && (
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
              <Header />
              <div className="main-content">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}

      {!user && <Outlet />}
    </>
  );
}

export default App;
