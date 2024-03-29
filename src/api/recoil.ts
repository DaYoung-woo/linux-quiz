import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
    if (!!quizList) return arr;
    else return [];
  },
  set: () => {},
});

export const userQuizListAtom = atom({
  key: "userQuizListAtom",
  default: [],
});

export const userPhotoAtom = atom({
  key: "userPhotoState",
  default: "",
});

// 사용자 이메일
export const userEmailAtom = atom({
  key: "userEmailState",
  default: null,
});

//  카테고리 리스트
export const categoryListAtom = atom({
  key: "categoryListAtom",
  default: [],
});

// 사용자 퀴즈 리스트
export const quizListAtom = atom({
  key: "quizListAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
