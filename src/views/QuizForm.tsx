import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizImgApi, quizDetailApi } from "../api/api";
import { useState } from "react";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { ReactComponent as ArrowLeft } from "../assets/img/arrow_left.svg";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import Loading from "../components/common/Loading";
import { useRecoilValue } from "recoil";
import { quizListAtom } from "../api/recoil";

function QuizForm() {
  const [answer, setAnswer] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const quizNum = searchParams.get("quizNum");
  const quizList = useRecoilValue(quizListAtom);

  // 문제 조회 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchQuizDetail", category, quizNum],
    queryFn: () => getQuizDetail(),
  });

  // 문제 조회 api 응답 처리
  const getQuizDetail = async () => {
    try {
      const item = await quizDetailApi(category, quizNum);
      return item[quizNum] || [];
    } catch (e) {
      alert("퀴즈를 불러오는데 실패했어요");
    }
  };

  // 문제 사진 api 요청
  const { data: img } = useQuery({
    queryKey: ["fetchQuizPhoto", category, quizNum],
    queryFn: () => getImg(),
    enabled: !!data?.photo,
  });

  // 이미지 로드 api 응답 처리
  const getImg = async () => {
    try {
      const url = await quizImgApi(data.photo);
      return url;
    } catch (e) {
      alert("퀴즈 문제 이미지를 불러오는데 실패했어요");
    }
  };

  // 정답 선택
  const chnageAnswer = (index) => {
    if (!submit) setAnswer(index);
  };

  // 정답 확인
  const submitQuiz = () => {
    setSubmit(true);
  };

  // 4지 선다
  const distractorBtn = (distractor, index) => {
    return (
      <button
        className={`border 
          ${submit && index === Number(data.answer) && "border-blue-500"} 
          ${
            submit &&
            index !== Number(data.answer) &&
            answer === index &&
            "border-red-500"
          } 
          ${answer === index && !submit && "border-slate-500 "}
          px-3 py-2 my-1 flex justify-between w-full bg-white`}
        onClick={() => chnageAnswer(index)}
      >
        {distractor}
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
  const showDesc = () => {
    if (!submit) return "";
    else
      return (
        <div className="my-8 p-4 bg-white mx-10 whitespace-pre-wrap">
          <p className="mb-2 font-medium text-indigo-500">
            정답 {data.answer}번
          </p>
          {data.desc.replaceAll("<br/>", "\r \n \n")}
        </div>
      );
  };

  if (status === "pending")
    return (
      <div className="user-no-list">
        <Loading />
      </div>
    );

  if (status === "success") {
    if (!data)
      return <div className="user-quiz-form">등록된 문제가 없습니다.</div>;
    return (
      <div>
        <div className="pb-4 pt-8" key={data.title}>
          <div className="user-quiz-form">
            <div className="flex items-center justify-center">
              {!!quizList.filter((el) => el[Number(quizNum) - 1]).length && (
                <Link
                  to={`/quiz_form?category=${category}&quizNum=${
                    Number(quizNum) - 1
                  }`}
                  replace
                >
                  <ArrowLeft width="100%" fill="#6B7280" />
                </Link>
              )}
            </div>
            <article>
              <h3 className="font-medium ">
                {data.quizNum}. {data.title}
              </h3>

              {!img && data.photo && <Skeleton height="128px" />}
              {img && data.photo && (
                <img src={img} alt="quizImg" className="w-96 h-32" />
              )}
              <div className="pt-6 pb-1">
                {distractorBtn(data.distractor1, 1)}
              </div>
              <div className="pb-1">{distractorBtn(data.distractor2, 2)}</div>
              <div className="pb-1">{distractorBtn(data.distractor3, 3)}</div>
              <div className="pb-1 mb-5">
                {distractorBtn(data.distractor4, 4)}
              </div>
              {!submit && submitBtn()}
              {submit && nextBtn()}
            </article>
            <div className="flex items-center justify-center">
              {!!quizList.filter((el) => el[Number(quizNum) + 1]).length && (
                <Link
                  to={`/quiz_form?category=${category}&quizNum=${
                    Number(quizNum) + 1
                  }`}
                  replace
                >
                  <ArrowRight height="12px" width="8px" fill="#6B7280" />
                </Link>
              )}
            </div>
          </div>
          {showDesc()}
        </div>
      </div>
    );
  }
}

export default QuizForm;
