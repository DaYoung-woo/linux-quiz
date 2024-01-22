import { atom, selector } from "recoil";
import { quizListApi } from "./api";

export const userEmailAtom = atom({
  key: "userEmailState",
  default: "",
});

export const quizListAtom = atom({
  key: "quizListState",
  default: selector({
    key: "CurrentUserID/Default",
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
  }),
});
