import { useMutation } from "@tanstack/react-query";
import type { IVerifyEmailResponse } from "../types/verify-email-response.interface";
import apiClient from "@/shared/lib/api-client";
import { useNavigate } from "react-router";
import { showSuccessAlert } from "@/shared/lib/alert";

interface MutationToken {
  token: string;
}

export const useVerifyEmailMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (token: MutationToken) => {
      return await apiClient.post<IVerifyEmailResponse>(
        `/auth/verification/verify`,
        token
      );
    },
    onSuccess: (data) => {
      showSuccessAlert(String(data.message), () => navigate("/signin"));
    },
  });
};
