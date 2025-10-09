import { SignUpPage } from "@/domains/auth/signup";
import type { RouteObject } from "react-router";

export const signupRoute: RouteObject = {
  path: "/signup",
  Component: SignUpPage,
};
