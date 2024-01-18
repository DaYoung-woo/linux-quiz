import { collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";

export const addQuizApi = (param) => {
  return addDoc(collection(db, "quizList"), param);
};
