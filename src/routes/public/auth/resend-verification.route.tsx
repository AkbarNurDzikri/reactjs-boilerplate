import { ResendVerificationPage } from "@/domains/auth/resend-verification";
import type { RouteObject } from "react-router";

export const resendVerificationRoute: RouteObject = {
  path: "/resend-verification",
  Component: ResendVerificationPage,
};
