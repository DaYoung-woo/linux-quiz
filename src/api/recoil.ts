import { atom, selector } from "recoil";
import { quizListApi } from "./api";

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
// export const quizListSelector = selector({
//   key: "quizListQuery",
//   get: async () => {
//     try {
//       const snapshot = await quizListApi();
//       if (snapshot.exists()) {
//         return Object.keys(snapshot.val()).map((el) => snapshot.val()[el]);
//       } else return [];
//     } catch (e) {
//       return e;
//     }
//   },
//   set: ({ set }, newValue) => {
//     console.log(newValue);
//     set(quizListAtom, newValue);
//   },
// });
