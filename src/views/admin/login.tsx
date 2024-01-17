import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { ApiContext } from "../../context/ApiContext";
import googleLogin from "../../assets/img/googloLogin.svg";

function AdminLogin() {
  const { provider, auth } = useContext(ApiContext);

  const login = () =>
    signInWithRedirect(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        setShow(!show);
      });

  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      navigate("/admin/quiz");
    }
  });

  const [show, setShow] = useState(false);
  return (
    <div>
      {show && (
        <div className="h-full flex w-72 m-auto">
          <img src={googleLogin} alt="googleLogin" onClick={login} />
        </div>
      )}
    </div>
  );
}

export default AdminLogin;
