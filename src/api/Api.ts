import { db } from "./Firebase";
import { ref, set } from "firebase/database";

export const addQuizApi = (param) => {
  return set(ref(db, "quiz_list/" + param.id), param);
};
