import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { quizListApi } from "../api/api";
import { userQuizListAtom } from "../api/recoil";
import { useSetRecoilState } from "recoil";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { useEffect, useState } from "react";

function QuizList() {
  const setUserQuizList = useSetRecoilState(userQuizListAtom);
  const [paramObj, setParamObj] = useState({ year: ",", order: "" });
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const order = searchParams.get("order");

  useEffect(() => {
    setParamObj({ year, order });
  }, []);

  const { isLoading, data } = useQuery({
    queryKey: ["fetchQuizList", paramObj],
    queryFn: async () => {
      const snapshot = await quizListApi(paramObj?.year, paramObj.order, "");
      if (snapshot.exists()) {
        const list = snapshot
          .val()
          .filter((el) => !!el)
          .sort();
        setUserQuizList(list);
        return list;
      } else {
        return [];
      }
    },
  });

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="px-4 mt-2">
      <h4 className="py-2 font-semibold">{year}년</h4>

      {data.map((el) => (
        <Link
          key={el.quizNum}
          to={`/quiz_form?year=${year}&order=${order}&quizNum=${el.quizNum}`}
        >
          <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between items-center  rounded-md">
            {el.quizNum}번
            <ArrowRight />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default QuizList;
