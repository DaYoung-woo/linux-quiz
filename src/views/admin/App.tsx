import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/admin/frame/Header";
import Navi from "../../components/admin/frame/Navi";

function App() {
  const [user, setUser] = useState({ email: "iamwooda0@gmail.com" });
  const naviagte = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (
        userInfo?.email === "iamwooda0@gmail.com" &&
        location.pathname.includes("/admin")
      ) {
        if (location.pathname === "/admin") {
          setUser(userInfo);
          naviagte("/admin/dashboard");
        }
      } else {
        if (location.pathname !== "/admin") {
          alert("권한이 없습니다.");
          naviagte("/admin");
        }
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {user?.email === "iamwooda0@gmail.com" && (
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

      {user?.email !== "iamwooda0@gmail.com" && <Outlet />}
    </>
  );
}

export default App;
