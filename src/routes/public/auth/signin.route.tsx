import { SignInPage } from "@/domains/auth/signin";
import type { RouteObject } from "react-router";

export const signinRoute: RouteObject = {
  path: "/signin",
  Component: SignInPage,
};
