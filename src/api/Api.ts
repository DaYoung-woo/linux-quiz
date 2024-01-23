import { db } from "../utils/firebase";
import { ref, set, get, child, query, orderByChild } from "firebase/database";

export const addQuizApi = (param) => {
  const { year, order, quizNum } = param;
  return set(ref(db, `quiz_list/${year}/${order}/${quizNum}`), param);
};

export const quizListApi = () => {
  return get(child(ref(db), `quiz_list`));
};

export const categoryListApi = () => {
  return query(ref(db, "quiz_list"), orderByChild("year"));
};
