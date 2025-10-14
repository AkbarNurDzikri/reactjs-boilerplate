import { userContext } from "@/shared/contexts/user-context";
import apiClient from "@/shared/lib/api-client";
import type { IUserContext } from "@/shared/interfaces/user-context.interface";
import { redirect } from "react-router";
import { showErrorAlert } from "@/shared/lib/alert";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function authMiddleware({ context }: { context: any }) {
  try {
    const res = await apiClient.get<IUserContext>(`/auth/me`);

    if (!res.data) {
      throw redirect("/signin");
    }

    context.set(userContext, res.data);
  } catch (err: unknown) {
    if (err instanceof Error) {
      showErrorAlert(err.message);
    }
  }
}
