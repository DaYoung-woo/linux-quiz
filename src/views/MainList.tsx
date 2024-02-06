import { ReactComponent as ArrowRight } from "../assets/img/arrow_right.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { categoryListApi } from "../api/api";
import Loading from "../components/common/Loading";
function MainList() {
  // 카테고리 리스트 api 요청
  const { status, data: categoryList } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
    retry: false,
  });

  return (
    <div className="px-4 mt-2">
      {/* api 요청 상태 */}
      {status === "pending" && (
        <div className="user-no-list">
          <Loading />
        </div>
      )}

      {/* api 요청 실패 */}
      {status === "error" && (
        <div className="user-no-list">데이터를 가져오는데 실패했어요😭</div>
      )}

      {/* api 요청 성공 */}
      {status === "success" && (
        <div className="quiz-list pt-4">
          {!!categoryList &&
            [...new Set(categoryList.map((el) => el.year))].map((el) => (
              <div key={el} className="mb-8 shadow-sm bg-white p-4 ">
                <h4 className="mb-4 font-semibold ">{el}년도</h4>
                {categoryList
                  .filter((quiz) => quiz.year === el)
                  .map(({ id, year, order }) => (
                    <Link
                      to={`/quiz_list?category=${id}`}
                      key={`year${year}order${order}`}
                    >
                      <div className="flex px-4 py-2 items-center mt-1 justify-between bg-indigo-50 ">
                        <div>
                          {year}년도 {order}회차
                        </div>
                        <ArrowRight height="12px" width="8px" fill="#6366f1" />
                      </div>
                    </Link>
                  ))}
              </div>
            ))}
          {!categoryList.length && (
            <div className="text-center mt-36 user-quiz-form">
              등록된 데이터가 없습니다
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MainList;
