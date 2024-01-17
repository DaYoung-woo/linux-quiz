function AdminQuiz() {
  const list = [
    {
      title:
        "다음 중 리눅스에서 사용되는 온라인 패키지 관리 도구로 거리가 먼 것은?",
      year: 2024,
      order: 1,
      quizNum: 1,
      subject: 1,
    },
  ];
  return (
    <div>
      <h1>문제 관리</h1>
      <div>
        <button className="mt-10 mb-2 text-right border p-2">문제 추가</button>
        <ul className="quiz-list">
          {list.map(({ title, year, order, quizNum, subject }) => (
            <li>
              <input type="checkbox" />
              <div className="pl-3">
                <p className="font-medium">
                  {title.length > 50 ? `${title.substring(0, 50)}...` : title}
                </p>
                <span className=" text-slate-600">
                  {year}년도 {order}회차 {quizNum}번
                </span>
              </div>
              {subject}과목
              <p className="text-right">2024-03-02</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminQuiz;
