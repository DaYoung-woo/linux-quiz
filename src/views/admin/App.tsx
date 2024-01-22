import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "../../components/admin/frame/Header";
import Navi from "../../components/admin/frame/Navi";
import { userEmailAtom } from "../../api/recoil";
import { useRecoilState } from "recoil";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email === process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT) {
        setUserEmail(userInfo.email);
      } else {
        setUserEmail("");
      }
    });
  }, [setUserEmail]);

  return (
    <>
      {userEmail !== process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT &&
      userEmail !== null ? (
        <Navigate to="/admin/login" replace />
      ) : (
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
    </>
  );
}

export default App;
