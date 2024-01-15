import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import googleLogin from "../../assets/img/googloLogin.svg";

function AdminLogin() {
  const firebaseConfig = {
    apiKey: "AIzaSyCPivEkcQA7PTYXfHsvW5mXyYXqjWsiglc",
    authDomain: "linux-quiz-9dec9.firebaseapp.com",
    storageBucket: "linux-quiz-9dec9.appspot.com",
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
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      // ...
    });
  return (
    <div className="h-full flex w-72 m-auto">
      <img src={googleLogin} alt="googleLogin" onClick={login} />
    </div>
  );
}

export default AdminLogin;
