import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

export async function addQuiz(param) {
  try {
    const res = await addDoc(collection(db, "users"), param);
    return res;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
