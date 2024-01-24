import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizSaveApi, categoryListApi } from "../../api/api";
import { ReactComponent as Plus } from "../../assets/img/plus.svg";
import AlertPopup from "../../components/common/AlertPopup";
import { useQuery } from "@tanstack/react-query";

function QuizForm() {
  // 기본 객체
  const defaultQuiz = {
    category: "",
    quizNum: "",
    title: "",
    distractor1: "",
    distractor2: "",
    distractor3: "",
    distractor4: "",
    desc: "",
    answer: "",
  };
  // 문제 번호 생성
  const quizNums = Array.from({ length: 100 }, (_, index) => index + 1);
  const [addAlert, setAddAlert] = useState(false);
  const [formData, setFormData] = useState({ ...defaultQuiz, id: "" });
  const [btnDisabled, setDisabled] = useState(true);
  const navigation = useNavigate();

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
  });

  // 모달 닫고 메인 화면 이동
  const closeAddAlert = () => {
    setAddAlert(false);
    navigation("/admin/quiz_list");
  };

  const getFile = (e) => {
    console.log(e);
  };

  // 저장 버튼 클릭
  const submitForm = (e) => {
    e.preventDefault();
    addQuiz();
  };

  // 저장 api 요청
  const addQuiz = async () => {
    const param = {
      id: `${formData.category}${formData.quizNum}`,
      ...formData,
      year: formData.category.split("-")[0],
      order: formData.category.split("-")[1],
    };
    try {
      await quizSaveApi(param);
      setAddAlert(true);
      setTimeout(() => closeAddAlert(), 2000);
    } catch (e) {
      alert("문제가 발생했어요😭");
    }
  };

  // 폼 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "loading") return;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);

    const valid = Object.keys(newFormData)
      .filter((el) => el !== "id")
      .find((el) => !newFormData[el]);
    setDisabled(!!valid);
  };

  return (
    <div className="quiz-form">
      <h1>문제 추가</h1>

      <form className="mt-5">
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
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

        <select
          name="quizNum"
          value={formData.quizNum}
          onChange={handleChange}
          required
          className="mr-4 border rounded-full px-2 py-1 w-28"
        >
          <option value="" disabled>
            문제 번호
          </option>

          {quizNums.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>

        <div className="mt-6">
          <h4 className="mb-4">문제</h4>
          <input
            type="text"
            placeholder="문제"
            className="basic-input"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="file"
            hidden
            id="upload-image"
            accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
            onChange={(e) => getFile(e)}
          />

          <h4 className="pt-6">보기</h4>
          <input
            type="text"
            placeholder="보기1"
            className="basic-input mt-4"
            name="distractor1"
            value={formData.distractor1}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="보기2"
            className="basic-input mt-4"
            name="distractor2"
            value={formData.distractor2}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="보기3"
            className="basic-input mt-4"
            name="distractor3"
            value={formData.distractor3}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="보기4"
            className="basic-input mt-4"
            name="distractor4"
            value={formData.distractor4}
            onChange={handleChange}
          />

          <h4 className="mt-6 flex items-center">
            해설
            <select
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
              className="ml-2 mr-4 border rounded-full px-2 py-1"
            >
              <option value="" disabled>
                정답
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </h4>
          <textarea
            placeholder="해설"
            className="border px-4 py-2 w-full mt-4"
            rows={10}
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
          <div className="flex justify-end">
            <button
              className="mt-2 flex items-center pl-7 pr-8 py-2 bg-indigo-500 rounded-md text-slate-50 disabled:bg-slate-200 disabled:text-slate-400"
              onClick={(e) => submitForm(e)}
              disabled={btnDisabled}
            >
              <Plus
                fill={btnDisabled ? "#94a3b8" : "#ffffff"}
                width="24px"
                height="24px"
                className="mr-2 "
              />
              문제 등록
            </button>
          </div>
        </div>
      </form>
      <AlertPopup
        isOpen={addAlert}
        onRequestClose={closeAddAlert}
        title="문제를 성공적으로 저장했습니다."
        desc="2초 뒤 자동으로 닫힙니다."
      />
    </div>
  );
}

export default QuizForm;
