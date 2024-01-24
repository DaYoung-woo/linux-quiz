import { collection, getDocs } from "firebase/firestore";
import { fdb, rdb } from "../utils/firebase";
import { ref, set, get, child } from "firebase/database";

export const addQuizApi = (param) => {
  const { year, order, quizNum } = param;
  return set(ref(rdb, `quiz_list/${year}/${order}/${quizNum}`), param);
};

export const quizListApi = (year, order, quizNum) => {
  return get(
    child(
      ref(rdb),
      `quiz_list${!!year ? `/${year}` : ""}${!!order ? `/${order}` : ""}${
        !!quizNum ? `/${quizNum}` : ""
      }`
    )
  );
};

export const testApi = () => {
  return getDocs(collection(fdb, "quiz_list"));
};
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
