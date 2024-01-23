import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { quizListApi } from "../api/api";

function QuizForm() {
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
      <div className="m-4">
        <h3 className="font-medium">{data.title}</h3>
        <div className="py-4">
          <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md">
            {data.distractor1}
          </div>
          <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md">
            {data.distractor2}
          </div>
          <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md">
            {data.distractor3}
          </div>
          <div className="border border-slate-200 px-3 py-2 my-1 flex justify-between rounded-md">
            {data.distractor4}
          </div>
        </div>

        <button className="w-full text-center py-2 bg-indigo-500 rounded-md text-slate-50 disabled:bg-slate-200 disabled:text-slate-400">
          SUBMIT
        </button>
      </div>
    )
  );
}

export default QuizForm;
