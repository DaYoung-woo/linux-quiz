import { useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { userQuizListSelector } from "../api/recoil";
import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { categoryListApi } from "../api/api";
import { useEffect, useState } from "react";

function MainList() {
  const [categoryList, setCategoryList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [orderObj, setOrderObj] = useState({});

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => getCategoryList(),
    retry: false,
  });

  const getCategoryList = async () => {
    try {
      const list = await categoryListApi();
      setYearList([...new Set(list.map((el) => el.year))]);
      setCategoryList(list);
    } catch (e) {
      console.log(e);
    }

    return [];
  };

  return (
    <div className="px-4 mt-2">
      {status === "pending" && (
        <div className="text-center mt-36">...loading</div>
      )}
      {status === "error" && (
        <div className="text-center mt-36">
          데이터를 가져오는데 실패했어요😭
        </div>
      )}
      {status === "success" && (
        <div className="quiz-list pt-2">
          {!!categoryList &&
            yearList.map((el) => (
              <>
                <h4 className="mt-4 mb-2">{el}</h4>
                {categoryList
                  .filter((quiz) => quiz.year === el)
                  .map(({ id, year, order }) => (
                    <div
                      className="flex hover:bg-slate-50  border px-4 py-2 items-center mt-1 justify-between"
                      key={id}
                    >
                      <div>
                        {year}년도 {order}회차
                      </div>
                      <ArrowRight height="16px" fill="#6B7280" />
                    </div>
                  ))}
              </>
            ))}
          {!categoryList.length && (
            <div className="text-center mt-36">등록된 데이터가 없습니다</div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainList;
