import { useMutation } from "@tanstack/react-query";
import type { IForgotPasswordSchema } from "../schemas/forgot-password.schema";
import apiClient from "@/shared/lib/api-client";
import type { IForgotPasswordResponse } from "../types/forgot-password-response.interface";
import { showSuccessAlert } from "@/shared/lib/alert";

export const useForgotPasswordMutation = () =>
  useMutation({
    mutationFn: async (data: IForgotPasswordSchema) => {
      return await apiClient.post<IForgotPasswordResponse>(
        `/auth/password/forgot`,
        data
      );
    },
    onSuccess: (data) => {
      showSuccessAlert(String(data.message));
    },
  });
