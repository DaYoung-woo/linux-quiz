import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../../components/frame/admin/Header";
import Navi from "../../components/frame/admin/Navi";
import { userEmailAtom, userPhotoAtom } from "../../api/recoil";
import { useRecoilState, useSetRecoilState } from "recoil";
import { auth } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  const setUserPhoto = useSetRecoilState(userPhotoAtom);
  const adminId = process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT;
  const location = useLocation();
  onAuthStateChanged(auth, (userInfo) => {
    if (userInfo?.email === adminId) {
      setUserEmail(userInfo?.email);
      setUserPhoto(userInfo.photoURL);
    } else {
      setUserEmail("");
    }
  });

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
