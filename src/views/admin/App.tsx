import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../api/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/admin/frame/Header";
import Navi from "../../components/admin/frame/Navi";

function App() {
  const [user, setUser] = useState(null);
  const naviagte = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
      if (!userInfo) naviagte("/admin");
      if (userInfo && location.pathname === "/admin")
        naviagte("/admin/dashboard");
    });
  }, []);

  return (
    <>
      {user && (
        <div className={`admin-app mx-auto `}>
          <div className="admin-app-body">
            <Navi />
            <main>
              <Header />
              <div className="main-scroll-area">
                <div className="main-content">
                  <Outlet />
                </div>
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
