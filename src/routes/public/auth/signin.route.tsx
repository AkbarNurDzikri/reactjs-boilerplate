import { SignInPage } from "@/domains/auth/signin";
import type { ISignInResponse } from "@/domains/auth/signin/types/signin-response.interface";
import { userContext } from "@/shared/contexts/user-context";
import { showErrorAlert } from "@/shared/lib/alert";
import apiClient from "@/shared/lib/api-client";
import { redirect, type RouteObject } from "react-router";

export const signinRoute: RouteObject = {
  path: "/signin",
  action: async ({ request, context }) => {
    const formData = request.formData();
    const email = (await formData).get("email");
    const password = (await formData).get("password");

    try {
      const res = await apiClient.post<ISignInResponse>(`/auth/login`, {
        email,
        password,
      });

      if (res.success) {
        context.set(userContext, res.data?.user);
        return redirect("/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) showErrorAlert(err.message);
    }
  },
  Component: SignInPage,
};
