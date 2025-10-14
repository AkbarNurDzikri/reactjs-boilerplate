import { ListOfUser } from "@/domains/user";
import { authLoader } from "@/loaders/auth.loader";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { hydrateFallback } from "@/shared/utils/hydrate-fallback";
import type { RouteObject } from "react-router";

export const userRoute: RouteObject = {
  path: "/users",
  middleware: [authMiddleware],
  loader: authLoader,
  HydrateFallback: hydrateFallback,
  Component: DashboardLayout,
  children: [
    {
      index: true,
      Component: ListOfUser,
    },
  ],
};
