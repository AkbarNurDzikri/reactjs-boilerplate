import { useMutation } from "@tanstack/react-query";
import type { ISignUpSchema } from "../schemas/signup.schema";
import apiClient from "@/shared/lib/api-client";
import type { ISignUpResponse } from "../types/signup-response.interface";
import { useNavigate } from "react-router";
import { showSuccessAlert } from "@/shared/lib/alert";

export const useSignUpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ISignUpSchema) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...requiredFields } = data;
      return await apiClient.post<ISignUpResponse>(
        `/auth/register`,
        requiredFields
      );
    },
    onSuccess: (data, variables) => {
      const email = variables.email;

      showSuccessAlert(String(data.message), () =>
        navigate(`/resend-verification?email=${email}`)
      );
    },
  });
};
