import { atom, selector } from "recoil";
import { quizListApi } from "./api";
export const quizListState = atom({
  key: "quizListState",
  default: [],
});

export const quizListSelector = selector({
  key: "quizListQuery",
  get: async () => {
    try {
      const snapshot = await quizListApi();
      if (snapshot.exists()) {
        return Object.keys(snapshot.val()).map((el) => snapshot.val()[el]);
      } else return [];
    } catch (e) {
      return e;
    }
  },
});
