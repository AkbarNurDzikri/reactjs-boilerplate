import { createBrowserRouter } from "react-router";
import { homeRoute } from "./public/home.route";
import { forgotPasswordRoute } from "./public/auth/forgot-password.route";
import { resendVerificationRoute } from "./public/auth/resend-verification.route";
import { resetPasswordRoute } from "./public/auth/reset-password.route";
import { signinRoute } from "./public/auth/signin.route";
import { signupRoute } from "./public/auth/signup.route";
import { verificationEmailRoute } from "./public/auth/verification-email.route";
import { dashboardRoute } from "./private/dashboard.route";
import { userRoute } from "./private/user.route";
import { roleRoute } from "./private/role.route";
import { NotFoundPage } from "@/shared/components/not-found-page";

export const mainRouter = createBrowserRouter([
  homeRoute,
  forgotPasswordRoute,
  resendVerificationRoute,
  resetPasswordRoute,
  signinRoute,
  signupRoute,
  verificationEmailRoute,
  dashboardRoute,
  userRoute,
  roleRoute,
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
