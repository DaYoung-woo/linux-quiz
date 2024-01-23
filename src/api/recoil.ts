import { atom, selector } from "recoil";
import { quizListApi } from "./api";

export const userEmailAtom = atom({
  key: "userEmailState",
  default: null,
});

export const quizListAtom = atom({
  key: "quizListAtom",
  default: selector({
    key: "quizListSelector",
    get: async () => {
      try {
        const snapshot = await quizListApi("", "", "");
        if (snapshot.exists()) {
          return snapshot.val();
        } else return [];
      } catch (e) {
        return e;
      }
    },
    set: () => {},
  }),
});

export const userQuizListSelector = selector({
  key: "userQuizListSelector",
  get: function ({ get }) {
    const quizList = get(quizListAtom);
    const arr = Object.keys(quizList).map((year) => ({
      year,
      child: quizList[year]
        .filter((el) => !!el)
        .map((child) => child.filter((test) => !!test)[0]),
    }));
    console.log(arr);

    if (!!quizList) return arr;
    else return [];
  },
  set: () => {},
});

export const adminQuizListAtom = selector({
  key: "adminQuizList",
  get: ({ get }) => {
    const quizList = get(quizListAtom);
    const arr = [];
    Object.keys(quizList).forEach((year) => {
      Object.keys(quizList[year]).forEach((order) => {
        Object.keys(quizList[year][order]).forEach((quizNum) => {
          if (!!quizList[year][order][quizNum]) {
            arr.push({
              ...quizList[year][order][quizNum],
              index: `${year}-${order}-${quizNum}`,
            });
          }
        });
      });
    });
    return arr;
  },
  set: () => {},
});

export const userQuizListAtom = atom({
  key: "userQuizListAtom",
  default: [],
});
