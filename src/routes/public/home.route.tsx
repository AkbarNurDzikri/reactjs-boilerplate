import { SignInPage } from "@/domains/auth/signin";
import type { RouteObject } from "react-router";

export const homeRoute: RouteObject = {
  path: "/",
  Component: SignInPage,
};
