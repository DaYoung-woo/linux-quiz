import { useEffect } from "react";
import { categoryListApi } from "../api/api";
import { useRecoilValueLoadable } from "recoil";
import { userQuizListSelector } from "../api/recoil";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { Link } from "react-router-dom";

function MainList() {
  const quizListLoadable = useRecoilValueLoadable(userQuizListSelector);

  useEffect(() => {
    categoryListApi();
  }, []);
  return (
    <div className="px-4 mt-2">
      {quizListLoadable.state === "loading"
        ? "Loading..."
        : quizListLoadable.contents.map(({ year, child }) => (
            <div className="mb-2" key={year}>
              <h4 className="py-2 font-semibold">{year}년</h4>
              {child.map(({ order }) => (
                <Link
                  key={`${year}-${order}`}
                  to={`/quiz_list?year=${year}&order=${order}`}
                >
                  <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between items-center font-medium rounded-md">
                    {order}회차
                    <ArrowRight />
                  </div>
                </Link>
              ))}
            </div>
          ))}
    </div>
  );
}

export default MainList;
