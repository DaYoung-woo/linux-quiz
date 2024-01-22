import { atom, selector } from "recoil";
import { quizListApi } from "./api";

export const userEmailAtom = atom({
  key: "userEmailState",
  default: null,
});

export const quizListAtom = atom({
  key: "quizListState",
  default: selector({
    key: "CurrentUserID/Default",
    get: async () => {
      try {
        const snapshot = await quizListApi();
        if (snapshot.exists()) {
          const arr = [];
          Object.keys(snapshot.val()).forEach((year) => {
            Object.keys(snapshot.val()[year]).forEach((order) => {
              Object.keys(snapshot.val()[year][order]).forEach((quizNum) => {
                if (!!snapshot.val()[year][order][quizNum]) {
                  arr.push({
                    ...snapshot.val()[year][order][quizNum],
                    index: `${year}-${order}-${quizNum}`,
                  });
                }
              });
            });
          });
          return arr;
        } else return [];
      } catch (e) {
        return e;
      }
    },
  }),
});
