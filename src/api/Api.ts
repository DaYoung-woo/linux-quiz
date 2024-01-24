import { collection, doc, getDocs, setDoc } from "firebase/firestore";
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

// 카테고리 리스트
export const categoryListApi = async () => {
  const snapshot = await getDocs(collection(fdb, "category_list"));
  console.log(snapshot);
  if (!!snapshot) {
    const list = [];
    snapshot.forEach((doc) => list.push(doc.data()));
    return list;
  } else return [];
};

// 카테고리 저장
export const categorySaveApi = (param) => {
  return setDoc(doc(fdb, "category_list", param.id), param);
};
