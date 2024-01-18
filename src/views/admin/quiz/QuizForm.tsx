function QuizForm() {
  return (
    <div className="quiz-form">
      <h1>문제 추가</h1>

      <form className="mt-5">
        <select name="year" required className="mr-4">
          <option value="" disabled selected>
            년도
          </option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <select name="year" required>
          <option value="" disabled selected>
            회차
          </option>
          <option value="2024">1</option>
          <option value="2023">2</option>
          <option value="2022">3</option>
        </select>
      </form>
    </div>
  );
}

export default QuizForm;
