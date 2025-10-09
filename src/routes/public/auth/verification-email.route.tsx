import { VerificationEmailPage } from "@/domains/auth/verification-email";
import type { RouteObject } from "react-router";

export const verificationEmailRoute: RouteObject = {
  path: "/verification",
  Component: VerificationEmailPage,
};
