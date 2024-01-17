import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

export const ApiContext = createContext({ app, provider, auth });

export const ApiProvider = ({ children }) => {
  return (
    <ApiContext.Provider value={{ app, provider, auth }}>
      {children}
    </ApiContext.Provider>
  );
};
