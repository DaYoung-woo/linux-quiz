import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import googleLogin from "../../assets/img/googloLogin.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AdminLogin() {
  const firebaseConfig = {
    apiKey: "AIzaSyCPivEkcQA7PTYXfHsvW5mXyYXqjWsiglc",
    authDomain: "linux-quiz-9dec9.firebaseapp.com",
    storageBucket: "linux-quiz-9dec9a.appspot.com",
    messagingSenderId: "141017420789",
    appId: "1:141017420789:web:ba3239850c3ad2c09f46bc",
    measurementId: "G-NZP9JJ3RFL",
  };

  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

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
