import { useNavigate, Navigate } from "react-router-dom";
import {
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

import googleLogin from "../../assets/img/googloLogin.svg";
import { userEmailAtom } from "../../api/recoil";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function AdminLogin() {
  const navigate = useNavigate();
  const login = () => signInWithRedirect(auth, provider);
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo?.email === "iamwooda0@gmail.com") {
        setUserEmail(userInfo.email);
      }
    });
  }, []);

  return (
    <>
      {userEmail === "iamwooda0@gmail.com" ? (
        <Navigate to="/admin/dashboard" replace />
      ) : (
        <div className="h-full flex w-72 m-auto">
          <img src={googleLogin} alt="googleLogin" onClick={login} />
        </div>
      )}
    </>
  );
}

export default AdminLogin;
