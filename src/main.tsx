import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { mainRouter } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/lib/query-client";
import { ModalContainer } from "./shared/components/modal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={mainRouter} />
      <ModalContainer />
    </QueryClientProvider>
  </StrictMode>
);
