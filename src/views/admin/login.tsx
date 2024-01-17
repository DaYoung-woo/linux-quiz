import { useNavigate } from "react-router-dom";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";

import googleLogin from "../../assets/img/googloLogin.svg";

function AdminLogin() {
  const navigate = useNavigate();
  const login = () =>
    signInWithRedirect(auth, provider).catch(() => {
      alert("에러가 발생했습니다");
    });

  return (
    <div className="h-full flex w-72 m-auto">
      <img src={googleLogin} alt="googleLogin" onClick={login} />
    </div>
  );
}

export default AdminLogin;
