import { ListOfRole } from "@/domains/role";
import { authLoader } from "@/loaders/auth.loader";
import { authMiddleware } from "@/middlewares/auth-middleware";
import { DashboardLayout } from "@/shared/components/dashboard-layout";
import { hydrateFallback } from "@/shared/utils/hydrate-fallback";
import type { RouteObject } from "react-router";

export const roleRoute: RouteObject = {
  path: "/roles",
  middleware: [authMiddleware],
  loader: authLoader,
  HydrateFallback: hydrateFallback,
  Component: DashboardLayout,
  children: [
    {
      index: true,
      Component: ListOfRole,
    },
  ],
};
