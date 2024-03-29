import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { quizListApi } from "../api/api";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";

import Loading from "../components/common/Loading";
import { useSetRecoilState } from "recoil";
import { quizListAtom } from "../api/recoil";
function QuizList() {
  //url param
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const setQuizList = useSetRecoilState(quizListAtom);

  // 문제 조회 api 요청
  const { status, data: quizList } = useQuery({
    queryKey: ["fetchQuizList", category],
    queryFn: () => getQuizList(),
    enabled: !!category,
  });

  async function getQuizList() {
    const res = await quizListApi(category);
    setQuizList(res);
    return res;
  }

  function renderCategoryHeader() {
    const [year, round] = category.split("-");
    return `${year}년 ${round}회차`;
  }

  function renderQuizItem(el) {
    const quizNum = Object.keys(el)[0];
    const { title, quizNum: quizNumber } = el[quizNum];

    return (
      <Link
        key={quizNumber}
        to={`/quiz_form?category=${category}&quizNum=${quizNum}`}
      >
        <div className=" px-4 py-2 my-1 flex justify-between items-center bg-white shadow-sm">
          <div className="w-11/12">
            <span className="font-medium text-indigo-500">{quizNumber}번</span>
            <p className="w-full text-ellipsis overflow-hidden whitespace-nowrap">
              {title}
            </p>
          </div>
          <ArrowRight fill="rgb(99, 102, 241)" height="12px" width="8px" />
        </div>
      </Link>
    );
  }

  if (status === "pending")
    return (
      <div className="user-no-list">
        <Loading />
      </div>
    );

  if (status === "success") {
    if (!quizList.length)
      return <div className="user-no-list">등록된 문제가 없습니다.</div>;

    return (
      <div className="px-4 my-4">
        <h4 className="py-2 font-semibold ">{renderCategoryHeader()}</h4>
        {quizList.map((el) => renderQuizItem(el))}
      </div>
    );
  }
}

export default QuizList;
