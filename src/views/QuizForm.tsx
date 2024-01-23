import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizListApi } from "../api/api";
import { useState } from "react";

function QuizForm() {
  const [answer, setAnswer] = useState(null);
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year");
  const order = searchParams.get("order");
  const quizNum = searchParams.get("quizNum");

  const { isLoading, data } = useQuery({
    queryKey: ["fetchQuizList", year, order, quizNum],
    queryFn: async () => {
      const snapshot = await quizListApi(year, order, quizNum);
      if (snapshot.exists()) {
        const item = snapshot.val();
        return item;
      } else {
        return null;
      }
    },
  });

  return isLoading ? (
    <div>loading...</div>
  ) : (
    data !== null && (
      <div className="m-4 mt-8">
        <h3 className="font-medium">{data.title}</h3>
        <div className="pt-6 pb-4">
          <button
            className={`border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md w-full ${
              answer === 1 && "border-slate-500"
            }`}
            onClick={() => setAnswer(1)}
          >
            {data.distractor1}
          </button>
          <button
            className={`border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md w-full ${
              answer === 2 && "border-slate-500"
            }`}
            onClick={() => setAnswer(2)}
          >
            {data.distractor2}
          </button>
          <button
            className={`border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md w-full ${
              answer === 3 && "border-slate-500"
            }`}
            onClick={() => setAnswer(3)}
          >
            {data.distractor3}
          </button>
          <button
            className={`border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md w-full ${
              answer === 4 && "border-slate-500"
            }`}
            onClick={() => setAnswer(4)}
          >
            {data.distractor4}
          </button>
        </div>

        <button
          disabled={!answer}
          className="w-full text-center py-2 bg-indigo-500 rounded-md text-slate-50 disabled:bg-slate-200 disabled:text-slate-400"
        >
          SUBMIT
        </button>
      </div>
    )
  );
}

export default QuizForm;
