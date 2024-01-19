import { db } from "./Firebase";
import { ref, set } from "firebase/database";

export const addQuizApi = (param) => {
  const { year, order, quizNum } = param;
  return set(ref(db, `quiz_list/${year}-${order}-${quizNum}`), param);
};
