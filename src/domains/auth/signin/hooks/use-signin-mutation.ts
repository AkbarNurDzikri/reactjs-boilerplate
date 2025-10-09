import { useMutation } from "@tanstack/react-query";
import type { ISignInSchema } from "../schemas/signin.schema";
import apiClient from "@/shared/lib/api-client";
import type { ISignInResponse } from "../types/signin-response.interface";
import { useNavigate } from "react-router";
import { showSuccessAlert } from "@/shared/lib/alert";

export const useSignInMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ISignInSchema) => {
      return await apiClient.post<ISignInResponse>(`/auth/login`, data);
    },
    onSuccess: (data) => {
      showSuccessAlert(String(data.message), () => navigate("/dashboard"));
    },
  });
};
