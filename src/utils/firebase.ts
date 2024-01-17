import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCPivEkcQA7PTYXfHsvW5mXyYXqjWsiglc",
  authDomain: "linux-quiz-9dec9.firebaseapp.com",
  storageBucket: "linux-quiz-9dec9a.appspot.com",
  messagingSenderId: "141017420789",
  appId: "1:141017420789:web:ba3239850c3ad2c09f46bc",
  measurementId: "G-NZP9JJ3RFL",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const user = auth.currentUser;

export const logOut = function () {
  return signOut(auth);
};
