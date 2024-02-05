import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  quizSaveApi,
  categoryListApi,
  imgSave,
  quizDetailApi,
} from "../../api/api";
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
  const quizNums = Array.from({ length: 80 }, (_, index) =>
    String(index + 1).length === 1 ? `0${String(index + 1)}` : String(index + 1)
  );

  // url 파라미터
  const [searchParams] = useSearchParams();

  const [addAlert, setAddAlert] = useState(false);
  const [formData, setFormData] = useState({ ...defaultQuiz });
  const [btnDisabled, setDisabled] = useState(true);
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigate();
  const category = searchParams.get("category");
  const quizNum = searchParams.get("quizNum");

  // 카테고리 리스트 api 요청
  const { status, data } = useQuery({
    queryKey: ["fetchCategoryList"],
    queryFn: () => categoryListApi(),
  });

  // 문제 조회 api 요청
  const { data: quizData } = useQuery({
    queryKey: ["fetchQuiz", category, quizNum],
    queryFn: () => quizDetailApi(category, quizNum),
    enabled: !!category && !!quizNum,
  });

  // 문제 조회 후 formData 세팅
  useEffect(() => {
    if (!!quizData && !!quizData[quizNum])
      setFormData({ ...quizData[quizNum] });
    setDisabled(false);
  }, [quizData, quizNum]);

  // 모달 닫고 메인 화면 이동
  const closeAddAlert = () => {
    setAddAlert(false);
    navigation("/admin/quiz_list");
  };

  const getFile = (e) => {
    // 업로드 된 file
    const files = e.target.files;
    const theFile = files[0];

    setAttachmentName(theFile.name);
    // FileReader 생성
    const reader = new FileReader();

    // file 업로드가 완료되면 실행
    reader.onloadend = (finishedEvent) => {
      // 업로드한 이미지 URL 저장
      const result = (finishedEvent.currentTarget as FileReader)?.result;
      setAttachment(result);
    };
    // 파일 정보를 읽기
    reader.readAsDataURL(theFile);
    setPhoto(theFile);
  };

  // 저장 버튼 클릭
  const submitForm = (e) => {
    e.preventDefault();
    addQuiz();
  };

  // 저장 api 요청
  const addQuiz = async () => {
    const id = `${formData.category}-${formData.quizNum}`;
    const param = {
      ...formData,
      id,
      year: formData.category.split("-")[0],
      order: formData.category.split("-")[1],
      photo: "",
      desc: formData.desc.replace(/\n/g, "<br/>"),
    };
    try {
      // 파일 업로드
      if (attachment) {
        await imgSave(attachmentName, photo);
        param.photo = attachmentName;
      }
      await quizSaveApi(param);
      setAddAlert(true);
      setTimeout(() => closeAddAlert(), 2000);
    } catch (e) {
      console.log(e);
      alert("퀴즈 파일 업로드에 문제가 발생했어요😭");
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
    console.log(newFormData);
    setFormData(newFormData);

    const valid = Object.keys(newFormData)
      .filter((el) => el !== "id")
      .find((el) => !newFormData[el]);
    setDisabled(!!valid);
  };

  // 이미지 삭제
  const onClearAttachment = () => {
    setAttachment(null);
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

          {!attachment && (
            <label htmlFor="upload-image" className="mt-3">
              <div className="border border-slate-200 w-40 mt-3 h-40 text-center flex items-center justify-center">
                문제
                <br />
                이미지 업로드
              </div>
            </label>
          )}

          <input
            type="file"
            hidden
            name="upload-image"
            id="upload-image"
            accept=".jpg, .jpeg, .png, .svg, image/*;capture=camera"
            onChange={(e) => getFile(e)}
          />

          {attachment && (
            <div className="flex mt-4 items-center">
              <img src={attachment} alt="" className="border p-4" />
              <button
                onClick={onClearAttachment}
                className="bg-indigo-500 rounded-md text-slate-50 h-10 px-4 ml-10"
              >
                이미지 삭제
              </button>
            </div>
          )}

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
