import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { quizListApi } from "../api/api";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";

function QuizList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // 문제 조회 api 요청
  const { status, data: quizList } = useQuery({
    queryKey: ["fetchQuizList", category],
    queryFn: () => quizListApi(category),
    enabled: !!category,
  });

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
        <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between items-center rounded-md">
          <div>
            <span className="text-gray-500">{quizNumber}번</span>
            <p className="font-medium">{title}</p>
          </div>
          <ArrowRight />
        </div>
      </Link>
    );
  }

  if (status === "pending") return <div>...loading</div>;

  if (status === "success") {
    if (!quizList.length) return <div>등록된 문제가 없습니다.</div>;

    return (
      <div className="px-4 mt-2">
        <h4 className="py-2 font-semibold">{renderCategoryHeader()}</h4>
        {quizList.map(renderQuizItem)}
      </div>
    );
  }
}

export default QuizList;
