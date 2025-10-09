import { useMutation } from "@tanstack/react-query";
import type { IPayloadResetPassword } from "../types/payload-reset-password.interface";
import apiClient from "@/shared/lib/api-client";
import type { IResetPasswordResponse } from "../types/reset-password-response.interface";
import { useNavigate } from "react-router";
import { showSuccessAlert } from "@/shared/lib/alert";

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: IPayloadResetPassword) => {
      return await apiClient.post<IResetPasswordResponse>(
        `/auth/password/reset`,
        {
          newPassword: data.newPassword,
          token: data.token,
        }
      );
    },
    onSuccess: (data) => {
      showSuccessAlert(String(data.message), () => navigate("/signin"));
    },
  });
};
