import { ResetPasswordPage } from "@/domains/auth/reset-password";
import type { RouteObject } from "react-router";

export const resetPasswordRoute: RouteObject = {
  path: "/reset-password",
  Component: ResetPasswordPage,
};
