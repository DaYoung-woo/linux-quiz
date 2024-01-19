import { Link } from "react-router-dom";
import { ReactComponent as QuizAdd } from "../../../assets/img/quiz_add.svg";
import { quizListSelector } from "../../../api/recoil";
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
function Quiz() {
  const quizList = useRecoilValue(quizListSelector);

  return (
    <div>
      <h1>문제 관리</h1>
      <div className="flex justify-between mt-5 mb-2">
        <input
          type="text"
          className="bg-slate-50 rounded-full border px-5 active:border-stone-100"
          placeholder="검색"
        />
        <Link to="/admin/quiz_form">
          <button className="flex items-center px-8 py-2 bg-indigo-500 rounded-md text-slate-50">
            <QuizAdd className="mr-2" />
            문제 추가
          </button>
        </Link>
      </div>
      {
        <ul className="quiz-list">
          {quizList ? (
            quizList.map(({ title, year, order, quizNum, subject }) => (
              <li className="bg  hover:bg-slate-50" key={title}>
                <input type="checkbox" />
                <div className="pl-3">
                  <p className="font-medium">
                    {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                  </p>
                  <span className="text-gray-500">
                    {year}년도 {order}회차 {quizNum}번 {subject}과목
                  </span>
                </div>
              </li>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </ul>
      }
      {/* <ul className="quiz-list">
        {
          (quizList.map(({ title, year, order, quizNum, subject }) => (
            <li className="bg  hover:bg-slate-50" key={title}>
              <input type="checkbox" />
              <div className="pl-3">
                <p className="font-medium">
                  {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                </p>
                <span className="text-gray-500">
                  {year}년도 {order}회차 {quizNum}번 {subject}과목
                </span>
              </div>
            </li>
          ))) :  (<div>Loading...</div>)}
      </ul> */}
    </div>
  );
}

export default Quiz;
