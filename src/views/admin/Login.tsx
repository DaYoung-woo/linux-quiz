import { Navigate } from "react-router-dom";
import { signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

import googleLogin from "../../assets/img/googloLogin.svg";
import { userEmailAtom } from "../../api/recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function AdminLogin() {
  const login = () => signInWithRedirect(auth, provider);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email === process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT) {
        setUserEmail(userInfo.email);
      }
    });
  }, [setUserEmail]);

  return (
    <>
      {userEmail === process.env.REACT_APP_FIREBASE_ADMIN_ACCOUNT ? (
        <Navigate to="/admin/quiz" replace />
      ) : (
        <div className="h-full flex w-72 m-auto">
          <img src={googleLogin} alt="googleLogin" onClick={login} />
        </div>
      )}
    </>
  );
}

export default AdminLogin;
