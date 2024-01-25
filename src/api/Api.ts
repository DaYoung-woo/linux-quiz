import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { fdb, rdb } from "../utils/firebase";

// 카테고리 리스트
export const categoryListApi = async () => {
  const docQuery = query(
    collection(fdb, "category_list"),
    orderBy("year", "desc")
  );
  try {
    const snapshot = await getDocs(docQuery);
    if (!!snapshot) {
      const list = [];
      snapshot.forEach((doc) => list.push(doc.data()));
      console.log(list);
      return list;
    } else return [];
  } catch (e) {
    console.log(e);
  }
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
export const quizListApi = async (category) => {
  const snapshot = await getDocs(collection(fdb, category));
  if (!!snapshot) {
    const list = [];
    snapshot.forEach((doc) => list.push(doc.data()));
    return list;
  } else return [];
};
