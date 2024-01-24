import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../../components/frame/admin/Header";
import Navi from "../../components/frame/admin/Navi";
import { userEmailAtom } from "../../api/recoil";
import { useRecoilState } from "recoil";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  const adminId = process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT;
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email === adminId) {
        setUserEmail(userInfo.email);
      } else {
        setUserEmail("");
      }
    });
  }, [setUserEmail]);

  return (
    <>
      {userEmail !== adminId && userEmail !== null ? (
        <Navigate to="/admin/login" replace />
      ) : (
        <>
          {location.pathname === "/admin" && (
            <Navigate to="/admin/quiz_list" replace />
          )}
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
        </>
      )}
    </>
  );
}

export default App;
