import apiClient from "@/shared/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import type { IResendVerificationResponse } from "../types/resend-verification-response.interface";
import { showSuccessAlert } from "@/shared/lib/alert";

interface MutateEmail {
  email: string;
}

export const useResendEmailMutation = () =>
  useMutation({
    mutationFn: async (email: MutateEmail) => {
      return await apiClient.post<IResendVerificationResponse>(
        `/auth/verification/resend`,
        email
      );
    },
    onSuccess: (data) => {
      showSuccessAlert(String(data.message));
    },
  });
