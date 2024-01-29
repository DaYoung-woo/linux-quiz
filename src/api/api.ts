import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../utils/firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

// 카테고리 리스트
export const categoryListApi = async () => {
  const docQuery = query(
    collection(db, "category_list"),
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
  return setDoc(doc(db, "category_list", param.id), param);
};

// 문제 이미지 저장
export const imgSave = (name, attachment) => {
  const fileRef = ref(storage, `images/${name}`); // 파일 참조 생성
  return uploadBytesResumable(fileRef, attachment);
};

// 문제 저장
export const quizSaveApi = (param) => {
  const { category, quizNum } = param;
  const payload = {};
  payload[quizNum] = param;
  return setDoc(doc(db, category, quizNum), payload);
};

// 문제 리스트
export const quizListApi = async (category) => {
  const snapshot = await getDocs(collection(db, category));
  if (!!snapshot) {
    const list = [];
    snapshot.forEach((doc) => list.push(doc.data()));
    return list;
  } else return [];
};

// 문제 이미지 로드
export const quizImgApi = async (id) => {
  return getDownloadURL(ref(storage, `images/${id}`));
};

// 문제 삭제
export const deleteQuizAip = async (category, quizNum) => {
  return deleteDoc(doc(db, category, quizNum));
};

// 문제 상세
export const quizDetailApi = async (category, quizNum) => {
  const snapshot = await getDoc(doc(db, category, quizNum));
  if (snapshot.exists()) {
    return snapshot.data();
  } else return {};
};
