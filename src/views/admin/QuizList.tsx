import { Link } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { adminQuizListAtom } from "../../api/recoil";
import { ReactComponent as Plus } from "../../assets/img/plus.svg";
import { ReactComponent as Trashbin } from "../../assets/img/trashbin.svg";
import { useQuery } from "@tanstack/react-query";
import { categoryListApi } from "../../api/api";
import { useEffect, useState } from "react";

function Quiz() {
  const quizListLoadable = useRecoilValueLoadable(adminQuizListAtom);
  const [category, setCategory] = useState("");

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
  });

  useEffect(() => {
    if (data.length) setCategory(data[0].id);
  }, [data]);

  useEffect(() => {}, [category]);
  return (
    <div>
      <h1>문제 관리</h1>
      <div className="flex justify-between mt-5 mb-2">
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mr-4 border rounded-full px-2 py-1 w-40"
        >
          <option value="" disabled>
            카테고리
          </option>
          {status === "pending" && (
            <option value="loading">...로딩중입니다.</option>
          )}
          {status === "success" &&
            data.map(({ year, order, id }) => (
              <option value={id} key={id}>
                {year}년도 {order}회차
              </option>
            ))}
        </select>

        <Link to="/admin/quiz_form">
          <button className="flex items-center pl-7 pr-8 py-2 bg-indigo-500 rounded-md text-slate-50">
            <Plus fill="white" />
            <span className="lh-25">문제 추가</span>
          </button>
        </Link>
      </div>
      <ul className="quiz-list">
        {quizListLoadable.state === "loading"
          ? "Loading..."
          : quizListLoadable.contents.map(
              ({ title, year, order, quizNum, subject, index }) => (
                <Link to={`/admin/quiz_form?index=${index}`} key={index}>
                  <li className="bg  hover:bg-slate-50">
                    <div className="pl-3">
                      <span className=" text-gray-500">
                        {year}년도 {order}회차 {quizNum}번 {subject}과목
                      </span>
                      <p className="font-medium">
                        {title.length > 50
                          ? `${title.substring(0, 50)}...`
                          : title}
                      </p>
                    </div>
                    <Trashbin className="mr-2" height="16px" fill="#6B7280" />
                  </li>
                </Link>
              )
            )}
      </ul>
    </div>
  );
}

export default Quiz;
