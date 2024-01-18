import { useNavigate } from "react-router-dom";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../../api/Firebase";

import googleLogin from "../../assets/img/googloLogin.svg";

function AdminLogin() {
  const navigate = useNavigate();
  const login = () => signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((res) => {
      if (res) navigate("/admin/dashboard");
    })
    .catch(() => {
      alert("권한이 없습니다.");
    });

  return (
    <div className="h-full flex w-72 m-auto">
      <img src={googleLogin} alt="googleLogin" onClick={login} />
    </div>
  );
}

export default AdminLogin;
