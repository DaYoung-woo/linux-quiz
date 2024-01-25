import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import AppRouter from "./utils/router";
import "./index.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5분 동안 캐시로 저장
      staleTime: 1000 * 60, // 1분 이내에는 캐시된 결과를 사용
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={AppRouter} />
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>
);
