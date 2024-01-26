import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizListApi } from "../api/api";
import { useState } from "react";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { ReactComponent as ArrowLeft } from "../assets/img/arrow_left.svg";

function QuizForm() {
  const [answer, setAnswer] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const quizNum = searchParams.get("quizNum");

  // 문제 조회 api 요청
  const { status, data: quizList } = useQuery({
    queryKey: ["fetchQuizList", category],
    queryFn: () => quizListApi(category),
    enabled: !!category,
  });

  const submitQuiz = () => {
    setSubmit(true);
  };

  const chnageAnswer = (index) => {
    if (!submit) setAnswer(index);
  };

  // 4지 선다
  const distractorBtn = (quiz, index) => {
    return (
      <button
        className={`border 
          ${
            submit &&
            index === Number(quiz[Object.keys(quiz)[0]].answer) &&
            "border-blue-500"
          } 
          ${
            submit &&
            index !== Number(quiz[Object.keys(quiz)[0]].answer) &&
            answer === index &&
            "border-red-500"
          } 
          ${answer === index && !submit && "border-slate-500 "}
          px-3 py-2 my-1 flex justify-between w-full bg-white`}
        onClick={() => chnageAnswer(index)}
      >
        {quiz[Object.keys(quiz)[0]][`distractor${index}`]}
      </button>
    );
  };

  // submit 버튼
  const submitBtn = () => {
    return (
      <button
        disabled={!answer}
        className="w-full text-center py-2 bg-indigo-500 rounded-md text-slate-50 disabled:bg-slate-200 disabled:text-slate-400"
        onClick={() => submitQuiz()}
      >
        SUBMIT
      </button>
    );
  };

  // Next 버튼
  const nextBtn = () => {
    return (
      <Link to="">
        <button
          disabled={!answer}
          className="w-full text-center py-2 bg-indigo-500 border rounded-md text-slate-50"
        >
          NEXT
        </button>
      </Link>
    );
  };

  // 정답 해설 컴포넌트
  const showDesc = (quiz) => {
    if (!submit) return "";
    else
      return (
        <div className="my-8 p-4 bg-white mx-10">
          <p className="mb-2 font-medium text-indigo-500">
            정답 {quiz.answer}번
          </p>
          {quiz.desc}
        </div>
      );
  };

  if (status === "pending") return <div>...loading</div>;

  if (status === "success") {
    if (!quizList.length) return <div>등록된 문제가 없습니다.</div>;
    return (
      <div>
        {quizList
          .filter((el) => Object.keys(el)[0] === quizNum)
          .map((quiz) => (
            <div className="mb-4 mt-8" key={quiz[Object.keys(quiz)[0]].title}>
              <div className="user-quiz-form">
                <div className="flex items-center">
                  <ArrowLeft width="100%" fill="#6B7280" />
                </div>
                <article>
                  <h3 className="font-medium ">
                    {quiz[Object.keys(quiz)[0]].title}
                  </h3>
                  <div className="pt-6 pb-1">{distractorBtn(quiz, 1)}</div>
                  <div className="pb-1">{distractorBtn(quiz, 2)}</div>
                  <div className="pb-1">{distractorBtn(quiz, 3)}</div>
                  <div className="pb-1 mb-5">{distractorBtn(quiz, 4)}</div>

                  {!submit && submitBtn()}
                  {submit && nextBtn()}
                </article>
                <div className="flex items-center">
                  <ArrowRight fill="#6B7280" width="100%" className="" />
                </div>
              </div>
              {showDesc(quiz[Object.keys(quiz)[0]])}
            </div>
          ))}
      </div>
    );
  }
}

export default QuizForm;
