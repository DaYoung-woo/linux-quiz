import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fdb, rdb } from "../utils/firebase";
import { ref, set, get, child } from "firebase/database";

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

// 문제 저장
export const quizSaveApi = (param) => {
  const { category, quizNum } = param;
  const payload = {};
  payload[quizNum] = param;
  return setDoc(doc(fdb, category, quizNum), payload);
};

// 문제 리스트
export const quizListApiTest = async (category) => {
  const snapshot = await getDocs(collection(fdb, category));
  if (!!snapshot) {
    const list = [];
    snapshot.forEach((doc) => list.push(doc.data()));
    console.log(list);
    return list;
  } else return [];
};
