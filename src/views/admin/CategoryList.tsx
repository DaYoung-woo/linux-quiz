import { useState, useEffect } from "react";
import { ReactComponent as Plus } from "../../assets/img/plus.svg";
import { ReactComponent as Trashbin } from "../../assets/img/trashbin.svg";
import { useQuery } from "@tanstack/react-query";
import { categoryListApi, categorySaveApi } from "../../api/api";
import { useRecoilState } from "recoil";
import { categoryListAtom } from "../../api/recoil";
import AlertPopup from "../../components/common/AlertPopup";
function CategoryList() {
  const [btnDisabled, setDisabled] = useState(true);
  const [year, setYear] = useState("");
  const [order, setOrder] = useState("");
  const [categoryList, setCategoryList] = useRecoilState(categoryListAtom);
  const [addAlert, setAddAlert] = useState(false);

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
  });

  // year와 order 변경을 감지해 추가 버튼 diabled 컨트롤
  useEffect(() => {
    if (!!year && !!order) setDisabled(false);
    else setDisabled(true);
  }, [year, order]);

  useEffect(() => {
    if (data) setCategoryList(data);
  }, [data]);

  // 카테고리 추가
  const saveCategory = async () => {
    const param = {
      year,
      order,
      id: `${year}-${order}`,
    };
    await categorySaveApi(param);
    setAddAlert(true);
    setTimeout(() => setAddAlert(false), 2000);
    setCategoryList([...categoryList, param]);
  };

  // 저장 팝업 닫기
  const closeAddAlert = () => {
    setAddAlert(false);
  };

  return (
    <div>
      <h1>카테고리 관리</h1>
      <article className="flex items-center">
        <input
          type="number"
          className="mr-2 border rounded-full px-5 py-2 w-24"
          placeholder="년도"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select
          name="order"
          className="mr-4 border rounded-full px-5 py-2 w-24"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="" disabled>
            회차
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button
          className="flex ml-2 items-center pl-7 pr-8 py-2 bg-indigo-500 rounded-md text-slate-50 disabled:bg-slate-200 disabled:text-slate-400"
          disabled={btnDisabled}
          onClick={() => saveCategory()}
        >
          <Plus
            fill={btnDisabled ? "#94a3b8" : "#ffffff"}
            width="24px"
            height="24px"
            className="lh-25"
          />
          추가
        </button>
      </article>

      <div>
        {status === "pending" && (
          <div className="text-center mt-36">...loading</div>
        )}
        {status === "error" && (
          <div className="text-center mt-36">
            데이터를 가져오는데 실패했어요😭
          </div>
        )}
        {status === "success" && (
          <ul className="quiz-list pt-2">
            {!!categoryList &&
              categoryList.map(({ id, year, order }) => (
                <li className="hover:bg-slate-50 py-1" key={id}>
                  <div className="flex justify-between">
                    {year}년도 {order}회차
                  </div>
                  <Trashbin className="mr-2" height="16px" fill="#6B7280" />
                </li>
              ))}
            {!categoryList.length && (
              <div className="text-center mt-36">등록된 데이터가 없습니다</div>
            )}
          </ul>
        )}
      </div>
      <AlertPopup
        isOpen={addAlert}
        onRequestClose={closeAddAlert}
        title="카테고리를 추가했습니다."
        desc="2초 뒤 자동으로 닫힙니다."
      />
    </div>
  );
}

export default CategoryList;
