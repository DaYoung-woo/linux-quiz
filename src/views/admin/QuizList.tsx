import { Link } from "react-router-dom";
import { ReactComponent as Plus } from "../../assets/img/plus.svg";
import { ReactComponent as Trashbin } from "../../assets/img/trashbin.svg";
import { useQuery } from "@tanstack/react-query";
import { categoryListApi, quizListApi } from "../../api/api";
import { useEffect, useState } from "react";

function Quiz() {
  const [category, setCategory] = useState("");
  const [quizList, setQuizList] = useState([]);

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
  });

  const getQuizList = async () => {
    try {
      const list = await quizListApi(category);
      setQuizList(list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (status === "success" && data.length) {
      setCategory(data[0]?.id);
    }
  }, [status]);

  useEffect(() => {
    if (!!category) getQuizList();
  }, [category]);

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
        {quizList.map((el) => (
          <Link
            to={`/admin/quiz_form?category=${category}&quizNum=${
              Object.keys(el)[0]
            }`}
            key={Object.keys(el)[0]}
          >
            <li className="bg  hover:bg-slate-50">
              <div className="pl-3">
                <span className=" text-gray-500">
                  {category.split("-")[0]}년도 {category.split("-")[1]}회차{" "}
                  {Object.keys(el)[0]}번
                </span>
                <p className="font-medium">
                  {el[Object.keys(el)[0]].title.length > 50
                    ? `${el[Object.keys(el)[0]].title.substring(0, 50)}...`
                    : el[Object.keys(el)[0]].title}
                </p>
              </div>
              <Trashbin className="mr-2" height="16px" fill="#6B7280" />
            </li>
          </Link>
        ))}
        {!quizList.length && (
          <div className="text-center mt-36">등록된 데이터가 없습니다</div>
        )}
      </ul>
    </div>
  );
}

export default Quiz;
