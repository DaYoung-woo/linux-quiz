function QuizForm() {
  const getFile = (e) => {
    console.log(e);
  };

  return (
    <div className="quiz-form">
      <h1>문제 추가</h1>

      <form className="mt-5">
        <div className="flex justify-between items-center">
          <article>
            <select
              name="year"
              required
              className="mr-4 border rounded-full px-2 py-1"
            >
              <option value="" disabled selected>
                년도
              </option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            <select
              name="year"
              required
              className="mr-4 border rounded-full px-2 py-1"
            >
              <option value="" disabled selected>
                회차
              </option>
              <option value="2024">1</option>
              <option value="2023">2</option>
              <option value="2022">3</option>
            </select>
            <select
              name="year"
              required
              className="mr-4 border rounded-full px-2 py-1"
            >
              <option value="" disabled selected>
                문제 번호
              </option>
              <option value="2024">1</option>
              <option value="2023">2</option>
              <option value="2022">3</option>
            </select>
          </article>
          <button className="flex items-center px-8 py-2 bg-indigo-500 rounded-md text-slate-50">
            문제 추가
          </button>
        </div>
        <div className="mt-6">
          <h4 className="mb-4">문제</h4>
          <input
            type="text"
            placeholder="문제"
            className="border px-4 py-2 w-full "
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
            className="border px-4 py-2 w-full mt-4"
          />
          <input
            type="text"
            placeholder="보기2"
            className="border px-4 py-2 w-full mt-4"
          />
          <input
            type="text"
            placeholder="보기3"
            className="border px-4 py-2 w-full mt-4"
          />
          <input
            type="text"
            placeholder="보기4"
            className="border px-4 py-2 w-full mt-4"
          />

          <h4 className="mt-6">해설</h4>
          <textarea
            placeholder="해설"
            className="border px-4 py-2 w-full mt-4"
            rows={10}
          />
        </div>
      </form>
    </div>
  );
}

export default QuizForm;
