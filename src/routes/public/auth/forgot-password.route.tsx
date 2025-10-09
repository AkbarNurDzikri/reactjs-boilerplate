import { ForgotPasswordPage } from "@/domains/auth/forgot-password";
import type { RouteObject } from "react-router";

export const forgotPasswordRoute: RouteObject = {
  path: "/forgot-password",
  Component: ForgotPasswordPage,
};
